import { motion } from 'framer-motion';
import { Bot, Trash2, Send, Loader2, Volume2, Square, Mic, MicOff } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

type Message = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || `Error ${resp.status}`);
    return;
  }

  if (!resp.body) { onError('No response body'); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let idx: number;
    while ((idx = buf.indexOf('\n')) !== -1) {
      let line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.endsWith('\r')) line = line.slice(0, -1);
      if (line.startsWith(':') || line.trim() === '') continue;
      if (!line.startsWith('data: ')) continue;
      const json = line.slice(6).trim();
      if (json === '[DONE]') { streamDone = true; break; }
      try {
        const parsed = JSON.parse(json);
        const c = parsed.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {
        buf = line + '\n' + buf;
        break;
      }
    }
  }

  if (buf.trim()) {
    for (let raw of buf.split('\n')) {
      if (!raw) continue;
      if (raw.endsWith('\r')) raw = raw.slice(0, -1);
      if (!raw.startsWith('data: ')) continue;
      const json = raw.slice(6).trim();
      if (json === '[DONE]') continue;
      try {
        const parsed = JSON.parse(json);
        const c = parsed.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {}
    }
  }
  onDone();
}

const TTSButton = ({ text }: { text: string }) => {
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback(() => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }, [text, speaking]);

  useEffect(() => {
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  return (
    <button
      onClick={speak}
      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
        speaking
          ? 'bg-destructive/20 hover:bg-destructive/30'
          : 'bg-primary/10 hover:bg-primary/20'
      }`}
      title={speaking ? 'Stop' : 'Listen'}
    >
      {speaking ? (
        <Square className="w-3 h-3 text-destructive" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-primary" />
      )}
    </button>
  );
};

const ChatSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleListening = useCallback(() => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      toast({ title: 'Not supported', description: 'Speech recognition is not supported in this browser.', variant: 'destructive' });
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput((prev) => (prev ? prev + ' ' : '') + transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e: any) => {
      setIsListening(false);
      if (e.error !== 'no-speech' && e.error !== 'aborted') {
        toast({ title: 'Mic error', description: e.error, variant: 'destructive' });
      }
    };
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening, toast]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let soFar = '';
    const upsert = (chunk: string) => {
      soFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: soFar } : m));
        }
        return [...prev, { role: 'assistant', content: soFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsert,
        onDone: () => setIsLoading(false),
        onError: (err) => {
          toast({ title: 'Error', description: err, variant: 'destructive' });
          setIsLoading(false);
        },
      });
    } catch {
      toast({ title: 'Error', description: 'Failed to connect to AI', variant: 'destructive' });
      setIsLoading(false);
    }
  };

  return (
    <section id="chat" className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-foreground mb-4">
            {t('chat.title')} <span className="gradient-text">{t('chat.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('chat.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl shadow-lg overflow-hidden border border-border/50">
            {/* Header */}
            <div className="gradient-bg px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-primary-foreground" />
                <h3 className="text-lg font-semibold text-primary-foreground">{t('chat.assistantName')}</h3>
              </div>
              <button
                onClick={() => { setMessages([]); window.speechSynthesis.cancel(); }}
                className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-all hover:scale-110"
              >
                <Trash2 className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full gradient-accent-bg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted rounded-2xl rounded-tl-md p-4 max-w-lg">
                      <span className="text-sm font-semibold text-foreground">{t('chat.titleHighlight')}</span>
                      <p className="text-sm text-foreground leading-relaxed mt-2">{t('chat.greeting')}</p>
                      <div className="mt-3">
                        <TTSButton text={t('chat.greeting')} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((msg, i) =>
                msg.role === 'assistant' ? (
                  <div key={i} className="flex gap-3">
                    <div className="w-9 h-9 rounded-full gradient-accent-bg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-muted rounded-2xl rounded-tl-md p-4 max-w-lg">
                        <span className="text-sm font-semibold text-foreground">{t('chat.titleHighlight')}</span>
                        <p className="text-sm text-foreground leading-relaxed mt-2 whitespace-pre-wrap">{msg.content}</p>
                        <div className="flex gap-2 mt-3">
                          <TTSButton text={msg.content} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-3 justify-end">
                    <div className="flex-1 flex justify-end">
                      <div className="gradient-bg rounded-2xl rounded-tr-md p-4 max-w-lg">
                        <span className="text-sm font-semibold text-primary-foreground">{t('chat.you')}</span>
                        <p className="text-sm text-primary-foreground leading-relaxed mt-2">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                )
              )}

              {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full gradient-accent-bg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-md p-4">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background">
              <div className="flex items-end gap-3">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
                  }}
                  placeholder={t('chat.placeholder')}
                  rows={1}
                  className="flex-1 px-5 py-3 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-sm transition-all"
                />
                <button
                  onClick={send}
                  disabled={isLoading || !input.trim()}
                  className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center shadow-glow hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 text-primary-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatSection;

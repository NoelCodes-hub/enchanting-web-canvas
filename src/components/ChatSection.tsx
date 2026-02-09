import { motion } from 'framer-motion';
import { Bot, Trash2, Volume2, Download, Send } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ChatSection = () => {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');

  return (
    <section id="chat" className="section-padding bg-muted">
      <div className="container-custom">
        {/* Section Header */}
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('chat.subtitle')}
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl shadow-lg overflow-hidden border border-border/50">
            {/* Chat Header */}
            <div className="gradient-bg px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-primary-foreground" />
                <h3 className="text-lg font-semibold text-primary-foreground">
                  {t('chat.assistantName')}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {[Trash2, Volume2, Download].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Icon className="w-4 h-4 text-primary-foreground" />
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-6 space-y-4">
              {/* AI Message */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full gradient-accent-bg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <div className="bg-muted rounded-2xl rounded-tl-md p-4 max-w-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">{t('chat.titleHighlight')}</span>
                      <span className="text-xs text-muted-foreground">10:00 AM</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {t('chat.greeting')}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button className="w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                        <Volume2 className="w-3.5 h-3.5 text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Message Example */}
              <div className="flex gap-3 justify-end">
                <div className="flex-1 flex justify-end">
                  <div className="gradient-bg rounded-2xl rounded-tr-md p-4 max-w-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-primary-foreground">{t('chat.you')}</span>
                      <span className="text-xs text-primary-foreground/70">10:02 AM</span>
                    </div>
                    <p className="text-sm text-primary-foreground leading-relaxed">
                      {t('chat.userMessage')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border bg-background">
              <div className="flex items-end gap-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  rows={1}
                  className="flex-1 px-5 py-3 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-sm transition-all"
                />
                <button className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center shadow-glow hover:scale-105 transition-transform">
                  <Send className="w-5 h-5 text-primary-foreground" />
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

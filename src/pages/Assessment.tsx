import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ClipboardList, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Preference {
  id: number;
  category: string;
  title: string;
  description: string;
}

const preferences: Preference[] = [
  // Visual Accommodations
  { id: 1, category: 'Visual', title: 'Screen Reader Software', description: 'Software that reads screen content aloud for visually impaired users' },
  { id: 2, category: 'Visual', title: 'Screen Magnification', description: 'Tools to enlarge screen content for better readability' },
  { id: 3, category: 'Visual', title: 'High Contrast Display', description: 'Enhanced color contrast settings on all displays' },
  { id: 4, category: 'Visual', title: 'Large Print Materials', description: 'All documents provided in large print format' },
  { id: 5, category: 'Visual', title: 'Braille Display', description: 'Refreshable braille display device for reading digital content' },
  { id: 6, category: 'Visual', title: 'Voice-Activated Controls', description: 'Control computer functions using voice commands' },
  { id: 7, category: 'Visual', title: 'Alternative Text for Images', description: 'Descriptive text for all visual content in documents' },
  { id: 8, category: 'Visual', title: 'Adjustable Lighting', description: 'Customizable workspace lighting to reduce glare and strain' },

  // Hearing Accommodations
  { id: 9, category: 'Hearing', title: 'Captioning Services', description: 'Real-time captioning for meetings and presentations' },
  { id: 10, category: 'Hearing', title: 'Sign Language Interpreter', description: 'Professional interpreter for meetings and events' },
  { id: 11, category: 'Hearing', title: 'Visual Alert Systems', description: 'Flashing lights or visual signals for alarms and notifications' },
  { id: 12, category: 'Hearing', title: 'Amplified Phone System', description: 'Phone system with volume amplification capabilities' },
  { id: 13, category: 'Hearing', title: 'Written Communication Priority', description: 'Preference for email/chat over phone calls' },
  { id: 14, category: 'Hearing', title: 'Hearing Loop System', description: 'Induction loop in meeting rooms for hearing aid users' },
  { id: 15, category: 'Hearing', title: 'Video Relay Services', description: 'Video-based relay for phone communication' },
  { id: 16, category: 'Hearing', title: 'Noise-Cancelling Environment', description: 'Quiet workspace with sound dampening features' },

  // Mobility Accommodations
  { id: 17, category: 'Mobility', title: 'Wheelchair Accessible Workspace', description: 'Fully accessible desk and workspace layout' },
  { id: 18, category: 'Mobility', title: 'Ergonomic Workstation', description: 'Adjustable desk, chair, and equipment positioning' },
  { id: 19, category: 'Mobility', title: 'Voice-to-Text Software', description: 'Dictation software for those with limited hand mobility' },
  { id: 20, category: 'Mobility', title: 'Accessible Parking', description: 'Reserved parking close to building entrance' },
  { id: 21, category: 'Mobility', title: 'Elevator Access', description: 'Guaranteed elevator access to all work areas' },
  { id: 22, category: 'Mobility', title: 'Remote Work Options', description: 'Flexible work-from-home arrangements' },
  { id: 23, category: 'Mobility', title: 'Adaptive Equipment', description: 'Specialized keyboards, mice, or input devices' },
  { id: 24, category: 'Mobility', title: 'Rest Area Access', description: 'Access to a quiet rest area during the workday' },

  // Cognitive Accommodations
  { id: 25, category: 'Cognitive', title: 'Task Simplification', description: 'Breaking complex tasks into manageable steps' },
  { id: 26, category: 'Cognitive', title: 'Written Instructions', description: 'All verbal instructions provided in writing' },
  { id: 27, category: 'Cognitive', title: 'Memory Aids', description: 'Checklists, reminders, and organizational tools' },
  { id: 28, category: 'Cognitive', title: 'Extended Time for Tasks', description: 'Additional time allowed for task completion' },
  { id: 29, category: 'Cognitive', title: 'Structured Daily Routine', description: 'Consistent daily schedule and predictable workflow' },
  { id: 30, category: 'Cognitive', title: 'Mentor/Job Coach', description: 'Assigned workplace mentor for guidance and support' },
  { id: 31, category: 'Cognitive', title: 'Reduced Distractions', description: 'Workspace designed to minimize distractions' },
  { id: 32, category: 'Cognitive', title: 'Visual Schedules', description: 'Color-coded visual aids for tasks and schedules' },

  // Neurodiversity Accommodations
  { id: 33, category: 'Neurodiversity', title: 'Sensory-Friendly Space', description: 'Quiet area with controlled sensory input' },
  { id: 34, category: 'Neurodiversity', title: 'Flexible Break Schedule', description: 'Freedom to take breaks as needed for regulation' },
  { id: 35, category: 'Neurodiversity', title: 'Noise-Cancelling Headphones', description: 'Provided noise-cancelling headphones for focus' },
  { id: 36, category: 'Neurodiversity', title: 'Clear Communication Style', description: 'Direct, literal communication without ambiguity' },
  { id: 37, category: 'Neurodiversity', title: 'Fidget Tools', description: 'Access to fidget tools and stress-relief items' },
  { id: 38, category: 'Neurodiversity', title: 'Social Interaction Support', description: 'Guidelines for social expectations in the workplace' },
  { id: 39, category: 'Neurodiversity', title: 'Advance Notice of Changes', description: 'Prior notification of schedule or routine changes' },
  { id: 40, category: 'Neurodiversity', title: 'Interest-Based Tasks', description: 'Task assignments aligned with areas of strong interest' },
];

const categories = ['All', 'Visual', 'Hearing', 'Mobility', 'Cognitive', 'Neurodiversity'];

const Assessment = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [jobRole, setJobRole] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const filtered = activeCategory === 'All'
    ? preferences
    : preferences.filter((p) => p.category === activeCategory);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (selected.length === 0) {
      toast({ title: 'Please select at least one accommodation', variant: 'destructive' });
      return;
    }

    setLoading(true);
    setResult('');

    const selectedPrefs = preferences.filter((p) => selected.includes(p.id));
    const prefsText = selectedPrefs.map((p) => `- ${p.title}: ${p.description}`).join('\n');

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'user',
                content: `I work as a "${jobRole || 'general employee'}". Based on the following accommodation preferences I selected, provide a comprehensive personalized workplace accommodation plan. Group your recommendations by category, explain how each accommodation helps, and suggest any additional accommodations I might benefit from.\n\nSelected accommodations:\n${prefsText}`,
              },
            ],
          }),
        }
      );

      if (!resp.ok) throw new Error('Failed to get recommendations');

      const reader = resp.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buf = '';
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buf.indexOf('\n')) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;
          const json = line.slice(6).trim();
          if (json === '[DONE]') break;
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) {
              fullText += c;
              setResult(fullText);
            }
          } catch {}
        }
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <ClipboardList className="w-7 h-7 text-primary-foreground" />
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold text-primary-foreground">
                Accommodation Assessment
              </h1>
              <p className="text-sm text-primary-foreground/70">
                Select your workplace accommodation needs
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Job Role Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">Your Job Role (optional)</label>
          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g. Software Developer, Teacher, Accountant..."
            className="w-full px-5 py-3 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'gradient-bg text-primary-foreground shadow-glow'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="self-center text-sm text-muted-foreground ml-2">
            {selected.length} selected
          </span>
        </div>

        {/* Preferences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {filtered.map((pref) => {
            const isSelected = selected.includes(pref.id);
            return (
              <motion.button
                key={pref.id}
                onClick={() => toggle(pref.id)}
                whileTap={{ scale: 0.97 }}
                className={`relative text-left p-4 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium gradient-accent-bg text-accent-foreground mb-2">
                  {pref.category}
                </span>
                <h3 className="text-sm font-semibold text-foreground mb-1">{pref.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pref.description}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Submit */}
        <div className="text-center mb-8">
          <Button
            onClick={handleSubmit}
            size="lg"
            disabled={loading || selected.length === 0}
            className="min-w-[200px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Get Recommendations ({selected.length})
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl border border-border/50 shadow-lg p-6 sm:p-8"
          >
            <h2 className="text-xl font-display font-bold text-foreground mb-4">
              Your Personalized Accommodation Plan
            </h2>
            <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
              {result}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Assessment;

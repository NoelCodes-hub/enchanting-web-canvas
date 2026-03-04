import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Plus, Trash2, Clock, Users, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Training {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  facilitator: string;
  location: string;
  capacity: number;
  enrolled: number;
  category: string;
  description: string;
  completed: boolean;
}

const defaultTrainings: Training[] = [
  { id: '1', title: 'Disability Awareness Fundamentals', date: '2026-03-15', time: '09:00', duration: '2 hours', facilitator: 'Dr. Sarah Moyo', location: 'Conference Room A / Virtual', capacity: 30, enrolled: 18, category: 'Awareness', description: 'An introduction to disability types, appropriate language, and inclusive communication.', completed: false },
  { id: '2', title: 'Accommodation Request Procedures', date: '2026-03-22', time: '14:00', duration: '1.5 hours', facilitator: 'HR Team', location: 'Training Lab B', capacity: 25, enrolled: 25, category: 'Process', description: 'Step-by-step guide for managers on handling accommodation requests effectively.', completed: false },
  { id: '3', title: 'Assistive Technology Overview', date: '2026-04-05', time: '10:00', duration: '3 hours', facilitator: 'Tech Accessibility Team', location: 'IT Training Room / Virtual', capacity: 20, enrolled: 12, category: 'Technology', description: 'Hands-on session covering screen readers, magnifiers, voice control, and adaptive devices.', completed: false },
  { id: '4', title: 'Unconscious Bias & Disability', date: '2026-04-12', time: '11:00', duration: '2 hours', facilitator: 'Diversity & Inclusion Office', location: 'Virtual Only', capacity: 50, enrolled: 34, category: 'Awareness', description: 'Exploring unconscious biases related to disability and strategies to overcome them.', completed: false },
  { id: '5', title: 'Creating Accessible Documents', date: '2026-04-19', time: '13:00', duration: '1.5 hours', facilitator: 'Communications Team', location: 'Training Lab A', capacity: 20, enrolled: 8, category: 'Technology', description: 'Learn to create accessible PDFs, Word documents, presentations, and emails.', completed: false },
  { id: '6', title: 'Mental Health First Aid', date: '2026-05-03', time: '09:00', duration: '4 hours', facilitator: 'Certified MH Trainer', location: 'Conference Room B', capacity: 15, enrolled: 15, category: 'Wellness', description: 'Certification course in recognizing and responding to mental health challenges in the workplace.', completed: false },
];

const categories = ['All', 'Awareness', 'Process', 'Technology', 'Wellness'];

const TrainingScheduler = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trainings, setTrainings] = useState<Training[]>(defaultTrainings);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTraining, setNewTraining] = useState({
    title: '', date: '', time: '09:00', duration: '2 hours', facilitator: '', location: '', capacity: '20', category: 'Awareness', description: '',
  });

  const filtered = activeCategory === 'All' ? trainings : trainings.filter(t => t.category === activeCategory);

  const addTraining = () => {
    if (!newTraining.title || !newTraining.date) {
      toast({ title: 'Please fill in title and date', variant: 'destructive' });
      return;
    }
    setTrainings(prev => [...prev, {
      id: Date.now().toString(),
      ...newTraining,
      capacity: Number(newTraining.capacity),
      enrolled: 0,
      completed: false,
    }]);
    setNewTraining({ title: '', date: '', time: '09:00', duration: '2 hours', facilitator: '', location: '', capacity: '20', category: 'Awareness', description: '' });
    setShowAddForm(false);
    toast({ title: 'Training session scheduled!' });
  };

  const toggleEnroll = (id: string) => {
    setTrainings(prev => prev.map(t => {
      if (t.id !== id) return t;
      if (t.enrolled >= t.capacity) {
        toast({ title: 'This session is full', variant: 'destructive' });
        return t;
      }
      toast({ title: 'Enrolled successfully!' });
      return { ...t, enrolled: t.enrolled + 1 };
    }));
  };

  const toggleComplete = (id: string) => {
    setTrainings(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTraining = (id: string) => setTrainings(prev => prev.filter(t => t.id !== id));

  const inputClass = "px-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <CalendarDays className="w-7 h-7 text-primary-foreground" />
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold text-primary-foreground">Training Scheduler</h1>
              <p className="text-sm text-primary-foreground/70">Plan and schedule disability awareness training</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Sessions', val: trainings.length },
            { label: 'Upcoming', val: trainings.filter(t => !t.completed).length },
            { label: 'Completed', val: trainings.filter(t => t.completed).length },
            { label: 'Total Enrolled', val: trainings.reduce((s, t) => s + t.enrolled, 0) },
          ].map(c => (
            <div key={c.label} className="bg-card rounded-2xl border border-border/50 p-4 text-center shadow-sm">
              <p className="text-2xl font-display font-bold text-primary">{c.val}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Filter + Add */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'gradient-bg text-primary-foreground shadow-glow' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
              {cat}
            </button>
          ))}
          <Button size="sm" variant="outline" onClick={() => setShowAddForm(!showAddForm)} className="ml-auto">
            <Plus className="w-4 h-4 mr-1" /> Schedule Training
          </Button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-card rounded-2xl border border-border/50 p-5 mb-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <input value={newTraining.title} onChange={e => setNewTraining(p => ({ ...p, title: e.target.value }))} placeholder="Training title *" className={inputClass} />
              <input type="date" value={newTraining.date} onChange={e => setNewTraining(p => ({ ...p, date: e.target.value }))} className={inputClass} />
              <input type="time" value={newTraining.time} onChange={e => setNewTraining(p => ({ ...p, time: e.target.value }))} className={inputClass} />
              <input value={newTraining.facilitator} onChange={e => setNewTraining(p => ({ ...p, facilitator: e.target.value }))} placeholder="Facilitator" className={inputClass} />
              <input value={newTraining.location} onChange={e => setNewTraining(p => ({ ...p, location: e.target.value }))} placeholder="Location" className={inputClass} />
              <input type="number" value={newTraining.capacity} onChange={e => setNewTraining(p => ({ ...p, capacity: e.target.value }))} placeholder="Capacity" className={inputClass} />
              <select value={newTraining.category} onChange={e => setNewTraining(p => ({ ...p, category: e.target.value }))} className={inputClass}>
                {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input value={newTraining.description} onChange={e => setNewTraining(p => ({ ...p, description: e.target.value }))} placeholder="Description" className={`${inputClass} sm:col-span-2`} />
            </div>
            <div className="mt-3 flex justify-end">
              <Button size="sm" onClick={addTraining}>Schedule</Button>
            </div>
          </motion.div>
        )}

        {/* Training Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`bg-card rounded-2xl border border-border/50 p-5 shadow-sm group ${t.completed ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium gradient-accent-bg text-accent-foreground mb-2">{t.category}</span>
                  <h3 className={`font-semibold text-foreground ${t.completed ? 'line-through' : ''}`}>{t.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
                </div>
                <button onClick={() => removeTraining(t.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-3">
                <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {t.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {t.time} ({t.duration})</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {t.location}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {t.enrolled}/{t.capacity}</span>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" onClick={() => toggleComplete(t.id)}>
                  <Check className="w-4 h-4 mr-1" /> {t.completed ? 'Undo' : 'Complete'}
                </Button>
                {!t.completed && t.enrolled < t.capacity && (
                  <Button size="sm" onClick={() => toggleEnroll(t.id)}>Enroll</Button>
                )}
                {t.enrolled >= t.capacity && !t.completed && (
                  <span className="self-center text-xs font-medium text-destructive">Full</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingScheduler;

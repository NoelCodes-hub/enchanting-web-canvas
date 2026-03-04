import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, TrendingUp, Users, Target, PieChart, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MetricEntry {
  id: string;
  name: string;
  value: number;
  target: number;
  category: string;
}

const defaultMetrics: MetricEntry[] = [
  { id: '1', name: 'Employees with Disclosed Disabilities', value: 12, target: 20, category: 'Workforce' },
  { id: '2', name: 'Accessible Workstations', value: 18, target: 25, category: 'Infrastructure' },
  { id: '3', name: 'Accommodation Requests Fulfilled', value: 85, target: 100, category: 'Accommodations' },
  { id: '4', name: 'Disability Awareness Trainings Completed', value: 4, target: 12, category: 'Training' },
  { id: '5', name: 'Inclusive Policies Implemented', value: 7, target: 10, category: 'Policy' },
  { id: '6', name: 'Employee Satisfaction Score (%)', value: 78, target: 90, category: 'Satisfaction' },
  { id: '7', name: 'Assistive Technology Licenses', value: 15, target: 20, category: 'Infrastructure' },
  { id: '8', name: 'Mentorship Pairings Active', value: 6, target: 15, category: 'Workforce' },
];

const categories = ['All', 'Workforce', 'Infrastructure', 'Accommodations', 'Training', 'Policy', 'Satisfaction'];

const InclusionMetrics = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<MetricEntry[]>(defaultMetrics);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMetric, setNewMetric] = useState({ name: '', value: '', target: '', category: 'Workforce' });

  const filtered = activeCategory === 'All' ? metrics : metrics.filter(m => m.category === activeCategory);

  const overallScore = metrics.length > 0
    ? Math.round(metrics.reduce((sum, m) => sum + (m.value / m.target) * 100, 0) / metrics.length)
    : 0;

  const addMetric = () => {
    if (!newMetric.name || !newMetric.value || !newMetric.target) return;
    setMetrics(prev => [...prev, {
      id: Date.now().toString(),
      name: newMetric.name,
      value: Number(newMetric.value),
      target: Number(newMetric.target),
      category: newMetric.category,
    }]);
    setNewMetric({ name: '', value: '', target: '', category: 'Workforce' });
    setShowAddForm(false);
  };

  const removeMetric = (id: string) => setMetrics(prev => prev.filter(m => m.id !== id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-primary-foreground" />
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold text-primary-foreground">Inclusion Metrics Dashboard</h1>
              <p className="text-sm text-primary-foreground/70">Track and measure your workplace inclusion efforts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Target, label: 'Overall Score', val: `${overallScore}%`, color: 'text-primary' },
            { icon: Users, label: 'Total Metrics', val: metrics.length.toString(), color: 'text-accent' },
            { icon: TrendingUp, label: 'On Target', val: metrics.filter(m => m.value >= m.target).length.toString(), color: 'text-green-600' },
            { icon: PieChart, label: 'Below Target', val: metrics.filter(m => m.value < m.target).length.toString(), color: 'text-destructive' },
          ].map((card) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <card.icon className={`w-5 h-5 ${card.color}`} />
                <span className="text-sm text-muted-foreground">{card.label}</span>
              </div>
              <p className={`text-3xl font-display font-bold ${card.color}`}>{card.val}</p>
            </motion.div>
          ))}
        </div>

        {/* Category Filter + Add */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'gradient-bg text-primary-foreground shadow-glow' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
              {cat}
            </button>
          ))}
          <Button size="sm" variant="outline" onClick={() => setShowAddForm(!showAddForm)} className="ml-auto">
            <Plus className="w-4 h-4 mr-1" /> Add Metric
          </Button>
        </div>

        {/* Add Metric Form */}
        {showAddForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-card rounded-2xl border border-border/50 p-5 mb-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <input value={newMetric.name} onChange={e => setNewMetric(p => ({ ...p, name: e.target.value }))} placeholder="Metric name" className="px-4 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="number" value={newMetric.value} onChange={e => setNewMetric(p => ({ ...p, value: e.target.value }))} placeholder="Current value" className="px-4 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="number" value={newMetric.target} onChange={e => setNewMetric(p => ({ ...p, target: e.target.value }))} placeholder="Target value" className="px-4 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <select value={newMetric.category} onChange={e => setNewMetric(p => ({ ...p, category: e.target.value }))} className="px-4 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="mt-3 flex justify-end">
              <Button size="sm" onClick={addMetric}>Save Metric</Button>
            </div>
          </motion.div>
        )}

        {/* Metrics List */}
        <div className="space-y-4">
          {filtered.map((metric, i) => {
            const pct = Math.min(Math.round((metric.value / metric.target) * 100), 100);
            const isOnTarget = metric.value >= metric.target;
            return (
              <motion.div key={metric.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{metric.name}</h3>
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium gradient-accent-bg text-accent-foreground mt-1">{metric.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${isOnTarget ? 'text-green-600' : 'text-destructive'}`}>
                      {metric.value} / {metric.target}
                    </span>
                    <button onClick={() => removeMetric(metric.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} className={`h-full rounded-full ${isOnTarget ? 'bg-green-500' : 'gradient-bg'}`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{pct}% of target</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InclusionMetrics;

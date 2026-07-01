import { motion } from 'framer-motion';
import { Search, Eye, Ear, Accessibility, Brain, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const KnowledgeBaseSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const articleDetails: Record<number, { overview: string; accommodations: string[]; tips: string[] }> = {
    1: {
      overview: 'Visual impairments range from low vision to total blindness. With the right assistive technology and workplace adjustments, visually impaired employees thrive in nearly every role.',
      accommodations: [
        'Screen reader software (NVDA, JAWS, VoiceOver)',
        'Screen magnification tools (ZoomText, built-in OS magnifiers)',
        'High-contrast displays and adjustable font sizes',
        'Braille displays and embossers',
        'Accessible document formats (tagged PDFs, semantic HTML)',
      ],
      tips: [
        'Ensure all digital content meets WCAG 2.1 AA standards',
        'Provide orientation and mobility training for the office',
        'Use descriptive alt text on every image and chart',
        'Keep walkways clear and consistently arranged',
      ],
    },
    2: {
      overview: 'Deaf and hard-of-hearing employees benefit most from clear communication channels and visual equivalents of audio information.',
      accommodations: [
        'Qualified sign language interpreters (ASL, BSL, local variants)',
        'Real-time captioning (CART) for meetings and events',
        'Video relay services and captioned phones',
        'Visual fire alarms and notification systems',
        'Noise-reducing workstations and FM/loop systems',
      ],
      tips: [
        'Always face the person when speaking',
        'Caption every internal and external video',
        'Share agendas and notes in writing before meetings',
        'Use chat tools alongside voice calls',
      ],
    },
    3: {
      overview: 'Mobility disabilities cover a wide range of conditions affecting movement. Physical and procedural adjustments unlock full participation.',
      accommodations: [
        'Step-free access, ramps, and automatic doors',
        'Height-adjustable desks and ergonomic seating',
        'Accessible restrooms within reasonable distance',
        'Reserved accessible parking close to entrances',
        'Remote and hybrid work options',
      ],
      tips: [
        'Audit your office annually against accessibility standards',
        'Keep aisles at least 36 inches wide',
        'Offer flexible scheduling for medical appointments',
        'Provide voice-control or alternative input devices',
      ],
    },
    4: {
      overview: 'Cognitive disabilities affect memory, attention, problem-solving, or processing speed. Structure and clarity make a major difference.',
      accommodations: [
        'Written instructions and visual checklists',
        'Task-management apps and reminder tools',
        'Quiet workspaces with minimal interruptions',
        'Extended deadlines or modified workloads where reasonable',
        'Job coaching and mentoring support',
      ],
      tips: [
        'Break large projects into clear, sequential steps',
        'Confirm understanding by asking the employee to summarize',
        'Use plain language and avoid idioms',
        'Schedule regular, predictable check-ins',
      ],
    },
    5: {
      overview: 'Neurodivergent employees — including autistic, ADHD, and dyslexic people — bring unique strengths when environments respect different ways of thinking.',
      accommodations: [
        'Sensory-friendly lighting and noise-cancelling headphones',
        'Flexible communication (written vs. verbal)',
        'Predictable routines with advance notice of changes',
        'Quiet rooms for sensory regulation',
        'Clear, literal task descriptions and expectations',
      ],
      tips: [
        'Avoid surprise meetings — share agendas ahead of time',
        'Allow stimming, movement, and fidget tools',
        'Focus on outcomes, not on social conformity',
        'Offer multiple ways to contribute (writing, recording, presenting)',
      ],
    },
    6: {
      overview: 'Universal Design creates environments and products usable by everyone, regardless of ability — reducing the need for individual accommodations.',
      accommodations: [
        'Step-free entrances used by all employees',
        'Captions on every video benefit everyone in noisy environments',
        'Adjustable furniture suits every body type',
        'Plain-language documents help all readers',
        'Multiple input methods (keyboard, mouse, voice, touch)',
      ],
      tips: [
        'Design for the edges and the middle benefits',
        'Involve disabled employees in the design process',
        'Test products with diverse users early and often',
        'Treat accessibility as a quality standard, not a checklist',
      ],
    },
  };


  const categories = [
    { id: 'all', label: t('knowledge.all') },
    { id: 'visual', label: t('knowledge.visual'), icon: Eye },
    { id: 'hearing', label: t('knowledge.hearing'), icon: Ear },
    { id: 'mobility', label: t('knowledge.mobility'), icon: Accessibility },
    { id: 'cognitive', label: t('knowledge.cognitive'), icon: Brain },
    { id: 'neurodiversity', label: t('knowledge.neurodiversity'), icon: Sparkles },
  ];

  const articles = [
    {
      id: 1,
      title: t('knowledge.article1.title'),
      description: t('knowledge.article1.desc'),
      category: 'visual',
      icon: Eye,
    },
    {
      id: 2,
      title: t('knowledge.article2.title'),
      description: t('knowledge.article2.desc'),
      category: 'hearing',
      icon: Ear,
    },
    {
      id: 3,
      title: t('knowledge.article3.title'),
      description: t('knowledge.article3.desc'),
      category: 'mobility',
      icon: Accessibility,
    },
    {
      id: 4,
      title: t('knowledge.article4.title'),
      description: t('knowledge.article4.desc'),
      category: 'cognitive',
      icon: Brain,
    },
    {
      id: 5,
      title: t('knowledge.article5.title'),
      description: t('knowledge.article5.desc'),
      category: 'neurodiversity',
      icon: Sparkles,
    },
    {
      id: 6,
      title: t('knowledge.article6.title'),
      description: t('knowledge.article6.desc'),
      category: 'all',
      icon: Accessibility,
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="knowledge" className="section-padding bg-card">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-card-foreground mb-4">
            {t('knowledge.title')} <span className="gradient-text">{t('knowledge.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('knowledge.subtitle')}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('knowledge.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'gradient-bg text-primary-foreground shadow-glow scale-105'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:-translate-y-0.5'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-3xl overflow-hidden shadow-md hover:shadow-card-hover border border-border/50 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Article Header with Gradient */}
              <div className="h-44 gradient-bg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary/20" />
                <article.icon className="w-16 h-16 text-primary-foreground relative z-10" />
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {article.description}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article.id)}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all cursor-pointer"
                >
                  {t('knowledge.readMore')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Article Detail Dialog */}
        <Dialog open={selectedArticle !== null} onOpenChange={(open) => !open && setSelectedArticle(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            {selectedArticle !== null && (() => {
              const article = articles.find((a) => a.id === selectedArticle)!;
              const details = articleDetails[selectedArticle];
              const Icon = article.icon;
              return (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <DialogTitle className="text-2xl font-display">{article.title}</DialogTitle>
                    </div>
                    <DialogDescription className="text-base leading-relaxed pt-2">
                      {details.overview}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-6">
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Recommended Accommodations</h4>
                      <ul className="space-y-2">
                        {details.accommodations.map((item, i) => (
                          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="text-primary font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Practical Tips</h4>
                      <ul className="space-y-2">
                        {details.tips.map((item, i) => (
                          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="text-primary font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              );
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default KnowledgeBaseSection;

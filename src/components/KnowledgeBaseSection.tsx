import { motion } from 'framer-motion';
import { Search, Eye, Ear, Accessibility, Brain, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const KnowledgeBaseSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                >
                  {t('knowledge.readMore')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBaseSection;

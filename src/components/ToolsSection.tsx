import { motion } from 'framer-motion';
import { ClipboardList, BarChart3, FileText, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage3 from '@/assets/hero-3.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const ToolsSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const tools = [
    {
      icon: ClipboardList,
      title: t('tools.assessment.title'),
      description: t('tools.assessment.desc'),
      link: '/assessment',
    },
    {
      icon: BarChart3,
      title: t('tools.metrics.title'),
      description: t('tools.metrics.desc'),
    },
    {
      icon: FileText,
      title: t('tools.templates.title'),
      description: t('tools.templates.desc'),
    },
    {
      icon: CalendarDays,
      title: t('tools.training.title'),
      description: t('tools.training.desc'),
    },
  ];

  return (
    <section id="tools" className="relative section-padding overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage3}
          alt="Woman in wheelchair smiling"
          className="w-full h-full object-cover object-center"
        />
        <div className="tools-bg-overlay" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-primary-foreground mb-4">
            {t('tools.title')}
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t('tools.subtitle')}
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full bg-card/95 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 border border-border/50 group">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-accent-bg flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform">
                  <tool.icon className="w-8 h-8 text-accent-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-bold text-card-foreground mb-3">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>

                <Button size="sm" className="w-full" onClick={() => tool.link ? navigate(tool.link) : undefined}>
                  {t('tools.useTool')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;

import { motion } from 'framer-motion';
import { Bot, Database, MessageSquare, Languages } from 'lucide-react';
import heroImage2 from '@/assets/hero-2.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Bot,
      title: t('features.ai.title'),
      description: t('features.ai.desc'),
    },
    {
      icon: Database,
      title: t('features.database.title'),
      description: t('features.database.desc'),
    },
    {
      icon: MessageSquare,
      title: t('features.chat.title'),
      description: t('features.chat.desc'),
    },
    {
      icon: Languages,
      title: t('features.language.title'),
      description: t('features.language.desc'),
    },
  ];

  return (
    <section id="features" className="relative section-padding overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage2}
          alt="Person with cane navigating"
          className="w-full h-full object-cover object-center"
        />
        <div className="feature-bg-overlay" />
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
            {t('features.title')}
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group h-full bg-card/95 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-lg hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500">
                {/* Gradient top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 gradient-bg rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl gradient-accent-bg flex items-center justify-center mb-6 shadow-glow">
                  <feature.icon className="w-8 h-8 text-accent-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-card-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

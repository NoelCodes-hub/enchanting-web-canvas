import { HandHeart, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Instagram, href: '#' },
];

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    platform: [
      { label: t('nav.features'), href: '#features' },
      { label: t('nav.knowledge'), href: '#knowledge' },
      { label: t('nav.chat'), href: '#chat' },
      { label: t('nav.tools'), href: '#tools' },
    ],
    resources: [
      { label: t('footer.documentation'), href: '#' },
      { label: t('footer.tutorials'), href: '#' },
      { label: t('footer.blog'), href: '#' },
      { label: t('footer.caseStudies'), href: '#' },
    ],
  };

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center">
                <HandHeart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-2xl font-display font-extrabold text-background">
                  PLUSME
                </span>
                <p className="text-xs text-background/60 -mt-1">{t('header.tagline')}</p>
              </div>
            </a>
            <p className="text-background/70 mb-6 max-w-sm leading-relaxed">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary hover:scale-110 flex items-center justify-center transition-all"
                >
                  <social.icon className="w-4 h-4 text-background" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-accent font-display font-bold mb-4">{t('footer.platform')}</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background hover:pl-1 transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-accent font-display font-bold mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background hover:pl-1 transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-accent font-display font-bold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="w-4 h-4" />
                <span>hello@plusme.ai</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>123 Inclusion Street,<br />Innovation City, IC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-background/20 text-center">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} PLUSME. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

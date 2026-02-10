import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, ChevronDown, Bot, HandHeart, Check, LogOut, User } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { language, setLanguage, t, languageNames } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.features'), href: '#features' },
    { label: t('nav.knowledge'), href: '#knowledge' },
    { label: t('nav.chat'), href: '#chat' },
    { label: t('nav.tools'), href: '#tools' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.lang-dropdown')) setIsLangDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect py-3 shadow-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
              <HandHeart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-extrabold gradient-text">PLUSME</span>
              <span className="text-xs text-muted-foreground -mt-1">{t('header.tagline')}</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 gradient-bg transition-all duration-300 group-hover:w-3/4 group-hover:left-[12.5%]" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative lang-dropdown">
              <button
                onClick={(e) => { e.stopPropagation(); setIsLangDropdownOpen(!isLangDropdownOpen); }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 cursor-pointer transition-colors"
              >
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{languageNames[language]}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-40 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    {(Object.keys(languageNames) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted transition-colors"
                      >
                        <span className={language === lang ? 'font-semibold text-primary' : 'text-foreground'}>
                          {languageNames[lang]}
                        </span>
                        {language === lang && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium truncate max-w-[120px]">{user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                  {t('header.login')}
                </Button>
                <Button size="sm" onClick={() => navigate('/auth')}>
                  {t('header.signup')}
                </Button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-border"
            >
              <nav className="flex flex-col gap-2 pt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </a>
                ))}

                <div className="px-4 py-2">
                  <p className="text-xs text-muted-foreground mb-2">Language</p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(languageNames) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { handleLanguageChange(lang); setIsMobileMenuOpen(false); }}
                        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                          language === lang
                            ? 'gradient-bg text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-4 px-4">
                  {user ? (
                    <Button variant="outline" className="flex-1" onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-1" /> Logout
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="flex-1" onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }}>
                        {t('header.login')}
                      </Button>
                      <Button className="flex-1" onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }}>
                        {t('header.signup')}
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;

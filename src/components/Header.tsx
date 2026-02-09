import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, ChevronDown, Bot, HandHeart } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Knowledge Base', href: '#knowledge' },
  { label: 'Chat', href: '#chat' },
  { label: 'Tools', href: '#tools' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect py-3 shadow-md' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
              <HandHeart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-extrabold gradient-text">
                PLUSME
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                AI Workplace Assistant
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
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

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 cursor-pointer transition-colors">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">English</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 cursor-pointer transition-colors">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Groq</span>
              <ChevronDown className="w-3 h-3" />
            </div>

            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
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
                <div className="flex gap-2 mt-4 px-4">
                  <Button variant="outline" className="flex-1">Log In</Button>
                  <Button className="flex-1">Sign Up</Button>
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

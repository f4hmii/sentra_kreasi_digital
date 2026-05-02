import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/sentrakreasi.png';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tentang Kami', href: '/tentang-kami' },
    { name: 'Artikel', href: '/artikel' },
    { name: 'Kegiatan', href: '/kegiatan' },
    { name: 'Repository', href: '/repository' },
    { name: 'Hubungi Kami', href: '/hubungi-kami' },
  ];

  return (
    <nav 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass py-2 border-b border-primary/20 shadow-lg' 
          : 'bg-white dark:bg-slate-900 py-3 border-b border-slate-200 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="Sentra Kreasi Logo" 
            className="h-16 md:h-20 w-auto transition-transform group-hover:scale-105"
            onError={(e) => {
              // Graceful handling if image hasn't been uploaded to public folder yet
              e.currentTarget.classList.add('opacity-50');
            }}
          />
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.href}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-slate-900 dark:text-white border-b-2 border-primary' : 'text-slate-700 dark:text-slate-300'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 glass rounded-lg text-primary hover:scale-110 transition-transform active:scale-95"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle side */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 glass rounded-lg text-primary"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="p-2 text-primary" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} className="text-slate-900 dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.href}
                  className={({ isActive }) => 
                    `text-lg font-medium hover:text-primary ${
                        isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-300'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

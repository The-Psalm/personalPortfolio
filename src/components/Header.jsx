import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { professionalScroll } from '../utils/smoothScroll';
import { useHeaderScroll } from '../contexts/ScrollContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolledPastHeader, shouldShowHeader, headerOpacity, scrollDirection } = useHeaderScroll();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = async (href) => {
    setIsMenuOpen(false);
    await professionalScroll(href, {
      duration: 1000,
      easing: 'easeInOutExpo'
    });
  };

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: shouldShowHeader ? 0 : -100,
          opacity: shouldShowHeader ? 1 : 0
        }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.3
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 scroll-optimized ${
          isScrolledPastHeader
            ? `bg-slate-900/${Math.round(headerOpacity * 100)} backdrop-blur-lg border-b border-purple-500/20 shadow-lg shadow-purple-500/10`
            : 'bg-transparent'
        }`}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Adebusuyi Samuel
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0,
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-2 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ x: 10 }}
                onClick={() => scrollToSection(item.href)}
                className="block text-gray-300 hover:text-white transition-colors duration-200 py-2"
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>
      </motion.header>
    </AnimatePresence>
  );
};

export default Header;

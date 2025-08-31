import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Github, Linkedin, Twitter, Instagram, MessageCircle } from 'lucide-react';


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/The-Psalm',
      label: 'GitHub'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/the.ps.a.l.m?igsh=Zm10dHA1Z3YyNDl3',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/2348024617212',
    },
  ];

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Frontend Development', href: '#services' },
        { name: 'Backend Development', href: '#services' },
        { name: 'Full-Stack Solutions', href: '#services' },
        { name: 'UI/UX Design', href: '#services' }
      ]
    },
    {
      title: 'Technologies',
      links: [
        { name: 'React & Next.js', href: '#skills' },
        { name: 'Python & Django', href: '#skills' },
        { name: 'TypeScript', href: '#skills' },
        { name: 'PostgreSQL', href: '#skills' }
      ]
    }
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-transparent">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 pt-20 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Footer Top */}
            <div className="grid lg:grid-cols-5 gap-8 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    Adebusuyi Samuel
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Passionate fullstack web developer crafting exceptional digital experiences 
                    with modern technologies. I'm Ready to bring your ideas to life.
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: "0 8px 20px rgba(139, 92, 246, 0.3)"
                        }}
                        className="flex items-center justify-center w-12 h-12 bg-slate-800/50 border border-gray-700/50 rounded-xl text-gray-400 hover:text-white hover:border-purple-500/50 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <social.icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer Links */}
              {footerLinks.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                >
                  <h4 className="text-white font-semibold mb-6 text-lg">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={link.name}>
                        <motion.button
                          onClick={() => scrollToSection(link.href)}
                          whileHover={{ x: 5 }}
                          className="text-gray-400 hover:text-white transition-colors duration-200 block"
                        >
                          {link.name}
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Scroll to Top Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-12"
            >
              <motion.button
                onClick={scrollToTop}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
                }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp size={20} />
              </motion.button>
            </motion.div>

            {/* Footer Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-t border-gray-700/50 pt-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                {/* Copyright */}
                <div className="flex items-center space-x-2 text-gray-400">
                  <span>© {currentYear} Adebusuyi Samuel.</span>
                 
                </div>

                {/* Status */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">
                    Available for freelance work
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

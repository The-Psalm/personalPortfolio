import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faPalette, faServer } from '@fortawesome/free-solid-svg-icons';
import ProfileImage from '../components/ProfileImage';
import TypewriterEffect from '../components/TypewriterEffect';
import { professionalScroll } from '../utils/smoothScroll';

const Hero = () => {
  const scrollToNext = async () => {
    await professionalScroll('#about', {
      duration: 1200,
      easing: 'easeInOutExpo'
    });
  };

  const scrollToContact = async () => {
    await professionalScroll('#contact', {
      duration: 1400,
      easing: 'easeInOutExpo'
    });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.2
      }
    }
  };

  const floatingIcons = [
    { icon: faCode, delay: 1.2, x: -20, y: -30 },
    { icon: faPalette, delay: 1.4, x: 20, y: -20 },
    { icon: faServer, delay: 1.6, x: 0, y: -40 }
  ];

  // Typewriter texts for different roles
  const developerRoles = [
    "Fullstack Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer"
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 scroll-optimized"
      style={{ willChange: 'transform' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [y, y - 10, y],
            x: [x, x + 5, x]
          }}
          transition={{
            duration: 0.6,
            delay,
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-400/30 hidden lg:block`}
          style={{ transform: `translate(calc(-50% + ${x * 8}px), calc(-50% + ${y * 4}px))` }}
        >
          <FontAwesomeIcon icon={icon} size="3x" />
        </motion.div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Profile Image */}
          <motion.div 
            className="order-2 lg:order-1 flex justify-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ProfileImage className="w-80 h-80 lg:w-96 lg:h-96" />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 order-1 lg:order-2 text-center lg:text-left"
          >
          {/* Greeting */}
          <motion.p
            variants={textVariants}
            className="text-lg md:text-xl text-gray-300 font-light font-[Delius]"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-[Delius]"
          >
            Adebusuyi Samuel
          </motion.h1>

          {/* Title with Typewriter Effect */}
          <motion.div
            variants={textVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold font-[Delius] text-white min-h-[3rem] md:min-h-[4rem] lg:min-h-[5rem] flex items-center justify-center lg:justify-start"
          >
            <TypewriterEffect
              texts={developerRoles}
              typeSpeed={120}
              deleteSpeed={60}
              delayBetweenTexts={2500}
              initialDelay={1200}
              className=""
              cursorClassName="text-purple-400 ml-1 text-3xl md:text-4xl lg:text-5xl font-light"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={textVariants}
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            Crafting exceptional digital experiences with cutting-edge technologies. 
            I transform ideas into powerful, scalable web applications that drive business growth 
            and deliver outstanding user experiences.
          </motion.p>

          {/* Tech Stack Preview */}
          <motion.div
            variants={textVariants}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {['React', 'TypeScript', 'Python', 'Django', 'PostgreSQL', 'Tailwind'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                className="px-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-full text-sm text-gray-300 hover:text-white hover:border-purple-400/50 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToNext()}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Explore My Work
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToContact()}
              className="px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-full font-semibold text-lg hover:bg-purple-400 hover:text-white transition-all duration-300"
            >
              Let's Connect
            </motion.button>
          </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;

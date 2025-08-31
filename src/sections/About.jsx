import React from 'react';
import { motion } from 'framer-motion';
import { LaptopMinimalCheck, Cpu, CalendarDays, Lightbulb } from 'lucide-react';
import { professionalScroll } from '../utils/smoothScroll';
import { useSectionAnimation } from '../contexts/ScrollContext';

const About = () => {
  const { ref, isVisible } = useSectionAnimation();

  const scrollToContact = async () => {
    await professionalScroll('#contact', {
      duration: 1200,
      easing: 'easeInOutExpo'
    });
  };

  const stats = [
    { icon: CalendarDays, number: '4+', label: 'Years of Experience', color: 'from-amber-400 to-orange-500' },
    { icon: Cpu, number: '20+', label: 'Tech Stacks Explored', color: 'from-green-400 to-emerald-500' },
    { icon: LaptopMinimalCheck, number: '1000+', label: 'Hours of Coding Practice', color: 'from-blue-400 to-cyan-500' },
    { icon: Lightbulb, number: '24/7', label: 'Creative Thinking', color: 'from-purple-400 to-pink-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
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

  const statVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      id="about" 
      className="py-20 relative overflow-hidden scroll-optimized"
      style={{ willChange: 'transform' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-[Delius] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-white font-[Delius] mb-6">
                Passionate About Creating Digital Excellence
              </h3>
              
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  I'm a dedicated fullstack web developer with a passion for creating innovative 
                  digital solutions that make a difference. My journey in web development started 
                  with curiosity and has evolved into a deep commitment to crafting exceptional 
                  user experiences.
                </p>
                
                <p>
                  With expertise spanning both frontend and backend technologies, I bring ideas 
                  to life through clean, efficient code and thoughtful design. I believe in the 
                  power of technology to solve real-world problems and drive business growth.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or mentoring aspiring developers. I'm always eager to 
                  take on new challenges and push the boundaries of what's possible.
                </p>
              </div>

              {/* Skills Highlight */}
              <div className="pt-6">
                <h4 className="text-xl font-semibold font-[Delius] text-white mb-4">What I Bring to the Table:</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Creative Problem Solving',
                    'Clean, Maintainable Code',
                    'User-Centered Design',
                    'Performance Optimization',
                    'API Development',
                    'Database Architecture',
                    'Responsive Design',
                    'Modern Frameworks'
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                      <span className="text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={statVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center group hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      delay: index * 0.2, 
                      type: "spring", 
                      stiffness: 200 
                    }}
                    className="text-3xl font-bold text-white mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  
                  <div className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToContact()}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Let's Work Together
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="ml-2"
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

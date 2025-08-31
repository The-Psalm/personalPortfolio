import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Palette, 
  Server, 
  Smartphone, 
  Search, 
  Zap,
  ArrowRight,
  CheckCircle 
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket,
  faShield,
  faCogs,
  faBolt
} from '@fortawesome/free-solid-svg-icons';
import { professionalScroll } from '../utils/smoothScroll';
import { useSectionAnimation } from '../contexts/ScrollContext';

const Services = () => {
  const { ref, isVisible } = useSectionAnimation();

  const scrollToContact = async () => {
    await professionalScroll('#contact', {
      duration: 1200,
      easing: 'easeInOutExpo'
    });
  };
  const services = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'Creating stunning, responsive user interfaces with modern frameworks and best practices.',
      features: [
        'React & Next.js Applications',
        'Responsive Web Design',
        'Interactive UI/UX',
        'Performance Optimization',
        'Cross-browser Compatibility'
      ],
      color: 'from-blue-400 to-cyan-500',
      gradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Building robust, scalable server-side applications and APIs that power your business.',
      features: [
        'RESTful API Development',
        'Database Design & Management',
        'Authentication & Security',
        'Third-party Integrations',
        'Cloud Deployment'
      ],
      color: 'from-green-400 to-emerald-500',
      gradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      icon: Zap,
      title: 'Full-Stack Solutions',
      description: 'End-to-end web application development from concept to deployment.',
      features: [
        'Complete Web Applications',
        'E-commerce Platforms',
        'Content Management Systems',
        'Progressive Web Apps',
        'Maintenance & Support'
      ],
      color: 'from-purple-400 to-pink-500',
      gradient: 'from-purple-500/10 to-pink-500/10'
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Ensuring your applications work perfectly across all devices and screen sizes.',
      features: [
        'Mobile-First Approach',
        'Tablet & Desktop Optimization',
        'Touch-Friendly Interfaces',
        'Fast Loading Times',
        'Modern CSS Techniques'
      ],
      color: 'from-orange-400 to-red-500',
      gradient: 'from-orange-500/10 to-red-500/10'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Crafting beautiful, intuitive interfaces that provide exceptional user experiences.',
      features: [
        'User Interface Design',
        'User Experience Research',
        'Prototyping & Wireframing',
        'Design Systems',
        'Accessibility Standards'
      ],
      color: 'from-pink-400 to-rose-500',
      gradient: 'from-pink-500/10 to-rose-500/10'
    },
    {
      icon: Search,
      title: 'Performance Optimization',
      description: 'Optimizing your applications for speed, SEO, and overall performance.',
      features: [
        'Speed Optimization',
        'SEO Implementation',
        'Code Splitting',
        'Image Optimization',
        'Performance Monitoring'
      ],
      color: 'from-indigo-400 to-blue-500',
      gradient: 'from-indigo-500/10 to-blue-500/10'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const serviceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-[Delius] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              What I Offer
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Comprehensive web development services to bring your ideas to life and grow your business
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          {/* Services Overview */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Left: Service Highlights */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-[Delius] font-semibold text-white mb-4">
                  What Makes Me Different
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I don't just write code—I craft digital experiences that drive results. 
                  Every project combines technical excellence with creative problem-solving.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Delivery Time', value: 'Fast', icon: faRocket, color: 'text-blue-400' },
                  { label: 'Code Quality', value: '100%', icon: faShield, color: 'text-green-400' },
                  { label: 'Maintenance', value: 'Ongoing', icon: faCogs, color: 'text-purple-400' },
                  { label: 'Support', value: '24/7', icon: faBolt, color: 'text-orange-400' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-slate-800/30 rounded-xl border border-gray-700/30"
                  >
                    <FontAwesomeIcon icon={item.icon} className={`text-2xl ${item.color} mb-2`} />
                    <div className="text-white font-semibold">{item.value}</div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Key Services */}
            <div className="space-y-6">
              {services.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4 p-6 bg-gradient-to-r from-slate-800/40 to-transparent rounded-2xl border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => scrollToContact()}
                >
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <service.icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold font-[Delius] text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                      {service.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {service.description}
                    </p>
                    <div className="flex items-center mt-3 text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors duration-300">
                      <span>Get Started</span>
                      <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* All Services Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-semibold font-[Delius] text-white mb-4">
                Complete Service Portfolio
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                From concept to deployment, I handle every aspect of web development
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.1)"
                  }}
                  className="bg-slate-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => scrollToContact()}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={18} className="text-white" />
                  </div>
                  
                  <h4 className="text-lg font-semibold font-[Delius] text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                    {service.title}
                  </h4>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-xs text-gray-400">
                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`}></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                    <span className="text-xs text-gray-500">Click to discuss</span>
                    <ArrowRight size={14} className="text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mt-20 bg-gradient-to-r from-slate-800/50 to-purple-900/20 rounded-3xl p-8 md:p-12 border border-purple-500/20">
          
            <div className="text-center mb-12">
              <h3 className="text-3xl font-semibold font-[Delius] text-white mb-4">
                My Development Process
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                A streamlined approach to deliver exceptional results on time and within budget
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Discovery',
                  description: 'Understanding your vision, goals, and requirements through detailed consultation.'
                },
                {
                  step: '02',
                  title: 'Planning',
                  description: 'Creating detailed project roadmap, wireframes, and technical specifications.'
                },
                {
                  step: '03',
                  title: 'Development',
                  description: 'Building your application using best practices and modern technologies.'
                },
                {
                  step: '04',
                  title: 'Launch',
                  description: 'Testing, deployment, and ongoing support to ensure perfect performance.'
                }
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 font-[Delius] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                      {process.step}
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                    )}
                  </div>
                  <h4 className="text-xl font-[Delius] font-semibold text-white mb-3">
                    {process.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {process.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-semibold font-[Delius] text-white mb-6">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help bring your vision to life with cutting-edge web development solutions.
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToContact()}
              className="inline-flex items-center font-[Delius] px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Get Started Today
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="ml-2"
              >
                <ArrowRight size={20} />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

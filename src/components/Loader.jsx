import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faRocket } from '@fortawesome/free-solid-svg-icons';

const Loader = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const loadingSteps = [
    { text: 'Initializing...', progress: 20 },
    { text: 'Loading Components...', progress: 40 },
    { text: 'Optimizing Performance...', progress: 65 },
    { text: 'Preparing Experience...', progress: 85 },
    { text: 'Almost Ready...', progress: 100 }
  ];

  useEffect(() => {
    const simulateLoading = async () => {
      // Check if fonts are loading
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          // Fonts loaded
        });
      }
      
      // Simulate realistic loading times with actual checks
      for (let i = 0; i < loadingSteps.length; i++) {
        setCurrentStep(i);
        
        // Animate progress bar smoothly
        const targetProgress = loadingSteps[i].progress;
        const startProgress = i === 0 ? 0 : loadingSteps[i - 1].progress;
        
        // Different timing for different steps
        const stepDelay = i === 0 ? 40 : i === loadingSteps.length - 1 ? 20 : 30;
        
        for (let progress = startProgress; progress <= targetProgress; progress += 2) {
          setLoadingProgress(progress);
          await new Promise(resolve => setTimeout(resolve, stepDelay));
        }
        
        // Wait a bit at each step, longer for important steps
        const waitTime = i === 1 ? 300 : i === 3 ? 400 : 200;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }

      // Ensure minimum loading time for smooth experience
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Start exit animation
      setIsVisible(false);
      
      // Complete loading after exit animation
      setTimeout(() => {
        // Remove loading class from body
        document.body.classList.remove('loading');
        if (onLoadComplete) onLoadComplete();
      }, 800);
    };

    simulateLoading();
  }, [onLoadComplete]);

  const containerVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hidden: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hidden: {
      opacity: 0,
      y: 20
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="visible"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center max-w-md mx-auto px-6">
            {/* Logo */}
            <motion.div
              variants={logoVariants}
              initial="visible"
              animate="pulse"
              className="mb-8"
            >
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rotate-45 opacity-20"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4">
                  <FontAwesomeIcon icon={faCode} className="text-2xl text-white" />
                </div>
                
                {/* Rotating Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-purple-500/30 rounded-2xl"
                />
              </div>
              
              <h1 className="text-2xl font-bold font-[Delius] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Adebusuyi Samuel
              </h1>
              <p className="text-gray-400 text-sm mt-1">Fullstack Developer</p>
            </motion.div>

            {/* Loading Progress */}
            <div className="mb-6">
              {/* Progress Bar */}
              <div className="relative w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                
                {/* Shine Effect */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-40, 320] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Progress Text */}
              <div className="flex justify-between items-center text-sm">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentStep}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-gray-300 font-medium"
                  >
                    {loadingSteps[currentStep]?.text}
                  </motion.span>
                </AnimatePresence>
                
                <span className="text-purple-400 font-mono font-semibold">
                  {loadingProgress}%
                </span>
              </div>
            </div>

            {/* Loading Animation */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Motivational Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-6 text-gray-500 text-xs"
            >
              Crafting exceptional digital experiences...
            </motion.div>
          </div>

          {/* Corner Decoration */}
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border border-purple-500/20 rounded-lg"
            />
          </div>
          
          <div className="absolute bottom-4 left-4">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border border-blue-500/20 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

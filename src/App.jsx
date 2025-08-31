import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Services from './sections/Services';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { ScrollProvider } from './contexts/ScrollContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  const pageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <Loader onLoadComplete={handleLoadComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen"
          >
            <ScrollProvider headerHeight={80}>
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-[Quicksand] scroll-container">
                <motion.div variants={sectionVariants}>
                  <Header />
                </motion.div>
                
                <main className="scroll-optimized">
                  <motion.div variants={sectionVariants}>
                    <Hero />
                  </motion.div>
                  <motion.div variants={sectionVariants}>
                    <About />
                  </motion.div>
                  <motion.div variants={sectionVariants}>
                    <Skills />
                  </motion.div>
                  <motion.div variants={sectionVariants}>
                    <Services />
                  </motion.div>
                  <motion.div variants={sectionVariants}>
                    <Contact />
                  </motion.div>
                </main>
                
                <motion.div variants={sectionVariants}>
                  <Footer />
                </motion.div>
              </div>
            </ScrollProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

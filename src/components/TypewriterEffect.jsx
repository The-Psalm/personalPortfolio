import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterEffect = ({ 
  texts = [], 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  delayBetweenTexts = 2000,
  initialDelay = 0,
  className = "",
  cursorClassName = ""
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;
    
    // Handle initial delay
    if (!hasStarted && initialDelay > 0) {
      const initialTimeout = setTimeout(() => {
        setHasStarted(true);
      }, initialDelay);
      return () => clearTimeout(initialTimeout);
    }
    
    if (!hasStarted && initialDelay > 0) return;
    setHasStarted(true);

    const currentFullText = texts[currentTextIndex];
    let timeout;

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        }, typeSpeed);
      } else {
        // Finished typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenTexts);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deleteSpeed);
      } else {
        // Finished deleting, move to next text
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, typeSpeed, deleteSpeed, delayBetweenTexts, hasStarted, initialDelay]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {currentText}
      <motion.span 
        className={`${cursorClassName}`}
        animate={{ 
          opacity: showCursor ? 1 : 0,
        }}
        transition={{ 
          duration: 0.1,
          ease: "linear"
        }}
      >
        |
      </motion.span>
    </span>
  );
};

export default TypewriterEffect;

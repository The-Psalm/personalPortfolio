import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholder = null, 
  fallback = null,
  onLoad = null,
  lazy = true,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inView, setInView] = useState(!lazy);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px', // Load image 50px before it comes into view
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 1.05,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const placeholderVariants = {
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    hidden: { 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  if (hasError && fallback) {
    return (
      <div className={`${className} flex items-center justify-center bg-slate-800/50`}>
        {fallback}
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Skeleton */}
      {!isLoaded && (
        <motion.div
          variants={placeholderVariants}
          initial="visible"
          animate={isLoaded ? "hidden" : "visible"}
          className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 bg-[length:200px_100%] animate-pulse"
        >
          {placeholder || (
            <div className="w-full h-full bg-slate-700/30 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          )}
        </motion.div>
      )}

      {/* Actual Image */}
      {inView && (
        <motion.img
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover ${isLoaded ? 'loaded' : ''}`}
          loading={lazy ? "lazy" : "eager"}
          style={{
            willChange: 'transform, opacity, filter'
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;

// Ultra-smooth scroll animation system with performance optimizations
// Designed for professional, buttery-smooth scroll experiences

// Advanced easing functions for different scroll feels
const easingFunctions = {
  // Smooth and natural - best for most use cases
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // More dramatic and professional
  easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  
  // Bouncy and engaging
  easeOutBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  
  // Ultra smooth - mimics Apple's scroll behavior
  easeInOutExpo: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
};

// Performance-optimized scroll manager
class SmoothScrollManager {
  constructor() {
    this.isScrolling = false;
    this.scrollQueue = [];
    this.observers = new Map();
    this.scrollCallbacks = new Set();
    this.lastScrollTime = 0;
    this.scrollDirection = null;
    this.headerOffset = 80;
    
    // Initialize performance monitoring
    this.setupPerformanceOptimizations();
    this.initializeScrollListener();
  }

  setupPerformanceOptimizations() {
    // Enable hardware acceleration for smooth scrolling
    if (typeof document !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'auto'; // We'll handle this manually
      
      // Add performance CSS if not already present
      if (!document.querySelector('#scroll-performance-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'scroll-performance-styles';
        styleSheet.textContent = `
          * {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
          
          html {
            scroll-behavior: auto !important;
          }
          
          body {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: none;
          }
          
          .scroll-optimized {
            will-change: transform;
            backface-visibility: hidden;
            perspective: 1000px;
            transform-style: preserve-3d;
          }
        `;
        document.head.appendChild(styleSheet);
      }
    }
  }

  initializeScrollListener() {
    if (typeof window === 'undefined') return;
    
    let ticking = false;
    
    const updateScrollInfo = () => {
      const currentScrollY = window.pageYOffset;
      const currentTime = performance.now();
      
      // Determine scroll direction
      this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
      this.lastScrollY = currentScrollY;
      this.lastScrollTime = currentTime;
      
      // Notify all scroll callbacks
      this.scrollCallbacks.forEach(callback => {
        try {
          callback({
            scrollY: currentScrollY,
            direction: this.scrollDirection,
            timestamp: currentTime
          });
        } catch (error) {
          console.warn('Scroll callback error:', error);
        }
      });
      
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollInfo);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    this.lastScrollY = window.pageYOffset;
  }

  // Ultra-smooth scroll to element with professional easing
  scrollTo(target, options = {}) {
    return new Promise((resolve) => {
      // Prevent multiple simultaneous scrolls
      if (this.isScrolling) {
        this.cancelCurrentScroll();
      }

      const config = {
        duration: 1000,
        easing: 'easeInOutCubic',
        offset: this.headerOffset,
        onComplete: null,
        onProgress: null,
        ...options
      };

      let element;
      if (typeof target === 'string') {
        element = document.querySelector(target);
        if (!element) {
          console.warn(`Element not found: ${target}`);
          resolve(false);
          return;
        }
      } else if (target instanceof Element) {
        element = target;
      } else {
        resolve(false);
        return;
      }

      const startPosition = window.pageYOffset;
      const elementRect = element.getBoundingClientRect();
      const targetPosition = Math.round(startPosition + elementRect.top - config.offset);
      const distance = targetPosition - startPosition;

      // If we're already at the target, resolve immediately
      if (Math.abs(distance) < 5) {
        resolve(true);
        return;
      }

      this.isScrolling = true;
      const startTime = performance.now();
      const easingFunction = easingFunctions[config.easing] || easingFunctions.easeInOutCubic;

      const animateScroll = (currentTime) => {
        if (!this.isScrolling) {
          resolve(false);
          return;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / config.duration, 1);
        const easedProgress = easingFunction(progress);
        
        const currentPosition = Math.round(startPosition + (distance * easedProgress));
        
        // Use transform for hardware acceleration when possible
        window.scrollTo({
          top: currentPosition,
          left: 0
        });

        // Call progress callback
        if (config.onProgress) {
          config.onProgress(progress, currentPosition);
        }

        if (progress < 1) {
          this.animationId = requestAnimationFrame(animateScroll);
        } else {
          this.isScrolling = false;
          if (config.onComplete) config.onComplete();
          resolve(true);
        }
      };

      this.animationId = requestAnimationFrame(animateScroll);
    });
  }

  // Cancel current scroll animation
  cancelCurrentScroll() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isScrolling = false;
  }

  // Add scroll listener with automatic cleanup
  addScrollListener(callback) {
    this.scrollCallbacks.add(callback);
    return () => this.scrollCallbacks.delete(callback);
  }

  // Enhanced Intersection Observer with performance optimizations
  createOptimizedObserver(callback, options = {}) {
    const config = {
      root: null,
      rootMargin: '-10% 0px -20% 0px', // More aggressive margins for better performance
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1], // Multiple thresholds for smoother animations
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      // Batch process entries for better performance
      const updates = [];
      
      entries.forEach(entry => {
        updates.push({
          target: entry.target,
          isVisible: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          boundingClientRect: entry.boundingClientRect
        });
      });
      
      // Process all updates in a single callback
      if (updates.length > 0) {
        callback(updates);
      }
    }, config);

    return observer;
  }

  // Get current scroll information
  getScrollInfo() {
    return {
      scrollY: window.pageYOffset,
      direction: this.scrollDirection,
      isScrolling: this.isScrolling,
      lastScrollTime: this.lastScrollTime
    };
  }

  // Set header offset dynamically
  setHeaderOffset(offset) {
    this.headerOffset = offset;
  }
}

// Create global instance
const scrollManager = new SmoothScrollManager();

// High-level API functions
export const smoothScrollTo = (target, options) => scrollManager.scrollTo(target, options);

// Enhanced smooth scroll with different easing options
export const smoothScrollToEnhanced = (target, duration = 1000, easing = 'easeInOutCubic') => {
  return scrollManager.scrollTo(target, { duration, easing });
};

// Professional scroll with custom easing
export const professionalScroll = (target, options = {}) => {
  const config = {
    duration: 1200,
    easing: 'easeInOutExpo', // Apple-like smooth scrolling
    ...options
  };
  return scrollManager.scrollTo(target, config);
};

// Quick scroll for navigation
export const quickScroll = (target, options = {}) => {
  const config = {
    duration: 600,
    easing: 'easeInOutQuart',
    ...options
  };
  return scrollManager.scrollTo(target, config);
};

// Performance-optimized scroll listener
export const addScrollListener = (callback) => scrollManager.addScrollListener(callback);

// Enhanced Intersection Observer
export const createScrollAnimationObserver = (callback, options) => 
  scrollManager.createOptimizedObserver(callback, options);

// Utility functions
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  let lastCallTime = 0;
  
  return function executedFunction(...args) {
    const now = performance.now();
    const timeSinceLastCall = now - lastCallTime;
    
    const later = () => {
      timeout = null;
      lastCallTime = now;
      if (!immediate) func.apply(this, args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeSinceLastCall >= wait && !timeout) {
      if (immediate) {
        lastCallTime = now;
        func.apply(this, args);
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(later, Math.max(0, wait - timeSinceLastCall));
      }
    } else if (!timeout) {
      timeout = setTimeout(later, Math.max(0, wait - timeSinceLastCall));
    }
    
    if (callNow) func.apply(this, args);
  };
};

// High-performance throttle
export const throttle = (func, limit) => {
  let inThrottle;
  let lastFunc;
  let lastRan;
  
  return function() {
    const context = this;
    const args = arguments;
    
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// Scroll progress tracker
export const getScrollProgress = () => {
  const scrollTop = window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  return documentHeight > 0 ? Math.min(scrollTop / documentHeight, 1) : 0;
};

// Check if element is in viewport with precision
export const isElementInViewport = (element, threshold = 0) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  
  return (
    rect.top < windowHeight - (windowHeight * threshold) &&
    rect.bottom > windowHeight * threshold &&
    rect.left < windowWidth &&
    rect.right > 0
  );
};

// Get scroll manager instance for advanced usage
export const getScrollManager = () => scrollManager;

// Auto-detect best scroll method based on user preferences
export const adaptiveScroll = (target, options = {}) => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Use instant scroll for accessibility
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
      const elementTop = element.offsetTop - (options.offset || scrollManager.headerOffset);
      window.scrollTo({ top: elementTop, behavior: 'auto' });
    }
    return Promise.resolve(true);
  }
  
  // Use professional smooth scroll for normal users
  return professionalScroll(target, options);
};

// Export default object for backward compatibility
export default {
  smoothScrollTo,
  smoothScrollToEnhanced,
  professionalScroll,
  quickScroll,
  adaptiveScroll,
  createScrollAnimationObserver,
  addScrollListener,
  debounce,
  throttle,
  getScrollProgress,
  isElementInViewport,
  getScrollManager
};

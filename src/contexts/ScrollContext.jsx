import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { addScrollListener, getScrollProgress } from '../utils/smoothScroll';

// Create scroll context
const ScrollContext = createContext({
  scrollY: 0,
  scrollProgress: 0,
  scrollDirection: null,
  isScrolling: false,
  isScrolledPastHeader: false
});

// Scroll provider component
export const ScrollProvider = ({ children, headerHeight = 80 }) => {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollProgress: 0,
    scrollDirection: null,
    isScrolling: false,
    isScrolledPastHeader: false
  });

  // Performance-optimized scroll handler
  const handleScrollUpdate = useCallback((scrollInfo) => {
    const progress = getScrollProgress();
    const isScrolledPastHeader = scrollInfo.scrollY > headerHeight;
    
    setScrollState(prevState => {
      // Only update if values have actually changed to prevent unnecessary re-renders
      if (
        prevState.scrollY === scrollInfo.scrollY &&
        prevState.scrollDirection === scrollInfo.direction &&
        prevState.isScrolledPastHeader === isScrolledPastHeader
      ) {
        return prevState;
      }
      
      return {
        scrollY: scrollInfo.scrollY,
        scrollProgress: progress,
        scrollDirection: scrollInfo.direction,
        isScrolling: true,
        isScrolledPastHeader
      };
    });

    // Reset isScrolling after a brief delay
    setTimeout(() => {
      setScrollState(prev => ({ ...prev, isScrolling: false }));
    }, 150);
  }, [headerHeight]);

  useEffect(() => {
    // Subscribe to scroll updates
    const unsubscribe = addScrollListener(handleScrollUpdate);
    
    // Initial scroll state
    const initialProgress = getScrollProgress();
    const initialScrollY = window.pageYOffset || 0;
    
    setScrollState({
      scrollY: initialScrollY,
      scrollProgress: initialProgress,
      scrollDirection: null,
      isScrolling: false,
      isScrolledPastHeader: initialScrollY > headerHeight
    });

    return unsubscribe;
  }, [handleScrollUpdate, headerHeight]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => scrollState, [scrollState]);

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook for using scroll context
export const useScroll = () => {
  const context = useContext(ScrollContext);
  
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  
  return context;
};

// Custom hook for scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const elementRef = React.useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-5% 0px -10% 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return {
    ref: elementRef,
    isVisible,
    intersectionRatio,
    // Smooth animation progress (0 to 1)
    animationProgress: Math.max(0, Math.min(1, intersectionRatio / threshold))
  };
};

// Hook for header scroll behavior
export const useHeaderScroll = () => {
  const { scrollY, scrollDirection, isScrolledPastHeader } = useScroll();
  
  const shouldShowHeader = useMemo(() => {
    if (scrollY <= 100) return true; // Always show at top
    if (scrollDirection === 'up') return true; // Show when scrolling up
    return false; // Hide when scrolling down
  }, [scrollY, scrollDirection]);

  return {
    scrollY,
    scrollDirection,
    isScrolledPastHeader,
    shouldShowHeader,
    headerOpacity: isScrolledPastHeader ? 0.95 : 0.8
  };
};

// Hook for section animations with performance optimizations
export const useSectionAnimation = (options = {}) => {
  const config = {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-10% 0px -20% 0px',
    ...options
  };

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = React.useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || (config.triggerOnce && hasAnimated)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          if (config.triggerOnce) {
            setHasAnimated(true);
          }
        } else if (!config.triggerOnce) {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [config.threshold, config.triggerOnce, config.rootMargin, hasAnimated]);

  return {
    ref: elementRef,
    isVisible,
    hasAnimated
  };
};

export default ScrollContext;

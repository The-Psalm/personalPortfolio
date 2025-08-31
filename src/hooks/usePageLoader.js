import { useState, useEffect } from 'react';

export const usePageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const checkPageReadiness = async () => {
      // Wait for DOM to be fully loaded
      if (document.readyState !== 'complete') {
        await new Promise(resolve => {
          window.addEventListener('load', resolve, { once: true });
        });
      }

      // Check if all critical resources are loaded
      const checkResources = () => {
        return new Promise(resolve => {
          let progress = 0;
          const totalChecks = 5;
          
          // Check 1: Images
          const images = document.querySelectorAll('img');
          let imagesLoaded = 0;
          
          if (images.length === 0) {
            progress += 20;
          } else {
            images.forEach(img => {
              if (img.complete) {
                imagesLoaded++;
              } else {
                img.onload = () => {
                  imagesLoaded++;
                  if (imagesLoaded === images.length) {
                    progress += 20;
                    setLoadProgress(Math.min(progress, 100));
                  }
                };
                img.onerror = () => {
                  imagesLoaded++;
                  if (imagesLoaded === images.length) {
                    progress += 20;
                    setLoadProgress(Math.min(progress, 100));
                  }
                };
              }
            });
            
            if (imagesLoaded === images.length) {
              progress += 20;
            }
          }
          
          // Check 2: Fonts
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
              progress += 20;
              setLoadProgress(Math.min(progress, 100));
            });
          } else {
            progress += 20;
          }
          
          // Check 3: CSS animations and transitions
          setTimeout(() => {
            progress += 20;
            setLoadProgress(Math.min(progress, 100));
          }, 100);
          
          // Check 4: JavaScript execution
          setTimeout(() => {
            progress += 20;
            setLoadProgress(Math.min(progress, 100));
          }, 200);
          
          // Check 5: Final rendering
          setTimeout(() => {
            progress += 20;
            setLoadProgress(100);
            resolve();
          }, 300);
        });
      };

      await checkResources();

      // Additional wait to ensure smooth experience
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsLoading(false);
    };

    // Start loading check after a brief delay
    const timer = setTimeout(checkPageReadiness, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Force minimum loading time for better UX
  useEffect(() => {
    const minLoadTime = setTimeout(() => {
      if (loadProgress >= 100) {
        setIsLoading(false);
      }
    }, 2000); // Minimum 2 seconds loading time

    return () => clearTimeout(minLoadTime);
  }, [loadProgress]);

  const completeLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    loadProgress,
    completeLoading
  };
};

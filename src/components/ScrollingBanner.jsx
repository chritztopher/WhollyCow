import React, { useEffect, useRef } from 'react';

const ScrollingBanner = ({ textArray }) => {
  const containerRef = useRef(null);

  // Handle page visibility changes to prevent animation jumping
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && containerRef.current) {
        // Force reflow to restart animations smoothly
        const elements = containerRef.current.querySelectorAll('.animate-marquee');
        elements.forEach(element => {
          element.style.animationPlayState = 'paused';
          // Force reflow
          element.offsetHeight;
          element.style.animationPlayState = 'running';
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also handle when the window gains focus
    const handleFocus = () => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.animate-marquee');
        elements.forEach(element => {
          element.style.animationPlayState = 'running';
        });
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Lightweight purple SVG icons
  const icons = [
    // Star icon - representing premium quality
    <svg key="star" className="w-4 h-4 flex-shrink-0 text-wc-purple" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>,
    
    // Sparkle icon - representing pure/clean
    <svg key="sparkle" className="w-4 h-4 flex-shrink-0 text-wc-purple" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1L9 9l-8 3 8 3 3 8 3-8 8-3-8-3-3-8z"/>
    </svg>,
    
    // Heart icon - representing love/care
    <svg key="heart" className="w-4 h-4 flex-shrink-0 text-wc-purple" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ];

  const createPills = () => {
    return textArray.map((text, index) => (
      <li key={index} className="flex items-center gap-6">
        <span className="text-sm font-semibold text-gray-700 tracking-wider whitespace-nowrap">
          {text}
        </span>
        {icons[index % icons.length]}
      </li>
    ));
  };

  return (
    <div className="overflow-hidden w-full" ref={containerRef}>
      <div className="flex whitespace-nowrap w-max">
        <ul className="flex items-center gap-6 animate-marquee">
          {createPills()}
        </ul>
        <ul className="flex items-center gap-6 animate-marquee ml-6">
          {createPills()}
        </ul>
      </div>
    </div>
  );
};

export default ScrollingBanner; 
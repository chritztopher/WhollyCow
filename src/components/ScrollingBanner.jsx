import React from 'react';
import OptimizedImage from './OptimizedImage';

const ScrollingBanner = ({ textArray }) => {
  const everscrollImages = [
    '/assets/Everscroll_1.png',
    '/assets/Everscroll_2.png',
    '/assets/Everscroll_3.png',
    '/assets/Everscroll_4.png'
  ];

  const createPills = () => {
    return textArray.map((text, index) => (
      <li key={index} className="flex items-center gap-6">
        <span className="text-sm font-mono font-medium text-gray-700 tracking-wider whitespace-nowrap">
          {text}
        </span>
        <OptimizedImage 
          src={everscrollImages[index % everscrollImages.length]} 
          alt="Decorative separator icon" 
          className="w-4 h-4 flex-shrink-0"
          priority={false}
          placeholder={false}
        />
      </li>
    ));
  };

  return (
    <div className="overflow-hidden w-full">
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
import React from 'react';
import ScrollingBanner from './ScrollingBanner';
import OptimizedImage from './OptimizedImage';

const Header = ({ cartItemCount = 0, onCartClick }) => {
  const bannerTexts = [
    'grass-finished',
    'handmade',
    'silky smooth',
    'deeply nourishing',
    'Made with care',
    'zero waste',
    'ancestral skincare'
  ];

  return (
    <header className="relative bg-transparent">
      {/* Top row - Logo and Cart */}
      <div className="flex items-center justify-between px-4 md:px-6 h-20">
        {/* Empty space for balance */}
        <div className="w-10"></div>
        
        {/* Centered Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="block">
            <OptimizedImage 
              src="/assets/Nav_Logo_Cow-01.webp" 
              alt="Wholly Cow - Premium Grass-Fed Tallow Skincare Logo" 
              className="h-16 w-auto"
              priority={true}
              placeholder={false}
            />
          </a>
        </div>

        {/* Cart */}
        <div className="flex-shrink-0">
          <button
            onClick={onCartClick}
            className="relative p-2 text-gray-700 hover:text-wc-purple transition-colors focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-wc-purple"
            aria-label={`View cart (${cartItemCount} items)`}
          >
            <OptimizedImage src="/assets/Cart.png" alt="Shopping Cart" className="h-6" priority={true} placeholder={false} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-wc-purple text-white text-xs font-bold min-w-[1.25rem] h-5 rounded-full flex items-center justify-center px-1">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom row - Full-width Scrolling Banner */}
      <div className="w-full bg-white border-t border-b border-black py-2">
        <ScrollingBanner textArray={bannerTexts} />
      </div>
    </header>
  );
};

export default Header; 
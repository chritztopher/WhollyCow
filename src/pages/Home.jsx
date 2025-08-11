import React from 'react';
import ProductCard from '../components/ProductCard';
import InfoCard from '../components/InfoCard';
import OptimizedImage from '../components/OptimizedImage';

const Home = ({ onAddToCart }) => {
  return (
    <main className="relative min-h-screen">
      {/* Static Hero Background - positioned behind header */}
      <div 
        className="fixed top-0 left-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ 
          backgroundImage: 'url(/assets/Hero_Image.jpg)',
          height: '100vh',
          width: '100vw',
        }}
      >
      </div>

      {/* Static Product Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-8 md:pt-0 pb-8 px-2">
        <div className="md:-mt-16">
          <ProductCard onAddToCart={onAddToCart} />
        </div>
      </div>

      {/* Info Card - directly below Product Card */}
      <div className="relative z-10 px-2 pb-8 -mt-2 md:-mt-4 lg:-mt-16">
        <InfoCard />
      </div>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-between px-4 md:px-8 py-6 md:py-8 bg-transparent">
        {/* Left - Contact */}
        <a 
          href="mailto:support@whollycowtallow.com"
          className="flex items-center gap-2 md:gap-3 text-white hover:text-wc-purple transition-colors font-bold text-sm md:text-lg focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-wc-purple rounded-md px-2 py-1"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.3.16.69.16 1.06 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          lets chat!
        </a>

        {/* Right - Company Info */}
        <div className="flex items-center gap-2 md:gap-3 text-white font-bold text-sm md:text-lg">
          <span>whollycowtallow 2025</span>
          <OptimizedImage src="/assets/Smiley.png" alt="Happy face emoji" className="w-4 h-4 md:w-6 md:h-6" priority={false} placeholder={false} />
        </div>
      </footer>
    </main>
  );
};

export default Home; 
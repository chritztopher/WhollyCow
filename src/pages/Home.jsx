import React from 'react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  return (
    <main className="relative min-h-screen">
      {/* Static Hero Background - positioned behind header */}
      <div 
        className="fixed top-0 left-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ 
          backgroundImage: 'url(/assets/Hero_Image.png)',
          height: '100vh',
          width: '100vw',
        }}
      >
      </div>

      {/* Static Product Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-8 pb-24 px-2">
        <ProductCard />
      </div>
    </main>
  );
};

export default Home; 
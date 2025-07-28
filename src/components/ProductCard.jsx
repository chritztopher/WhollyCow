import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VariantPill from './VariantPill';
import QuantityStepper from './QuantityStepper';
import Badge from './Badge';
import OptimizedImage from './OptimizedImage';

const ProductCard = ({ onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState('unscented');
  const [quantity, setQuantity] = useState(1);
  const [heroImage, setHeroImage] = useState('/assets/Unscented.png');

  const variants = ['lavender', 'thieves', 'unscented'];
  const thumbnails = [
    '/assets/Unscented.png',
    '/assets/product2.png', 
    '/assets/product3.png',
    '/assets/product4.png',
    '/assets/product5.png'
  ];

  // Variant to image mapping
  const variantImages = {
    lavender: '/assets/product4.png',
    thieves: '/assets/product5.png',
    unscented: '/assets/Unscented.png'
  };

  // Variant to button color mapping
  const variantButtonColors = {
    lavender: 'bg-gradient-to-r from-wc-purple to-purple-400',
    thieves: 'bg-gradient-to-r from-orange-300 to-orange-400',
    unscented: 'bg-gradient-to-r from-blue-300 to-blue-400'
  };

  // Variant to description mapping
  const variantDescriptions = {
    lavender: 'Grass fed tallow blended with lavender oil calms the senses and leaves skin soft and smooth.',
    thieves: 'Grass fed tallow enriched with clove, cinnamon, and citrus oils provides deep moisture with a gentle spiced aroma.',
    unscented: 'Pure grass fed tallow delivers full-strength nourishment with no added fragrance for the most sensitive skin.'
  };

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setHeroImage(variantImages[variant]);
  };

  const handleAddToCart = () => {
    const cartItem = {
      name: 'Tallow Butter',
      variant: selectedVariant,
      quantity: quantity,
      price: 40,
      image: variantImages[selectedVariant]
    };
    onAddToCart(cartItem);
    
    // Reset quantity after adding to cart
    setQuantity(1);
  };

  const handleThumbnailClick = (imageSrc) => {
    setHeroImage(imageSrc);
  };

  // Icons for badges and features
  const CheckIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const CalendarIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const LeafIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

     return (
     <motion.div
       initial={{ y: 20, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.5 }}
       className="bg-white rounded-[20px] md:rounded-[28px] p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-6 w-[95vw] md:w-[75vw] lg:w-[65vw] mx-auto relative"
       style={{
         boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 8px 16px -8px rgba(0, 0, 0, 0.3)'
       }}
     >
                           {/* NEW! Doodle */}
        <OptimizedImage 
          src="/assets/New.png" 
          alt="New product badge" 
          className="absolute -top-1 md:-top-2 right-3 md:right-6 w-12 md:w-20 z-20"
          priority={false}
          placeholder={false}
        />

               {/* Mobile: Full Width Image Section */}
        <div className="relative w-full md:w-1/2 flex-shrink-0">
          <OptimizedImage
            src={heroImage}
            alt="Wholly Cow tallow butter jar - natural skincare"
            className="aspect-[1/1] w-full rounded-[8px] md:rounded-[12px] object-cover border-2 border-black"
            priority={true}
          />
         
                   {/* Purple Sparkle Overlay */}
          <OptimizedImage 
            src="/assets/Sparkle.png" 
            alt="Decorative sparkle element" 
            className="absolute -top-2 -left-2 md:-top-6 md:-left-6 w-12 md:w-20"
            priority={false}
            placeholder={false}
          />

                                       {/* Thumbnail Strip - 5 equal squares */}
           <div className="flex gap-2 mt-4 w-full">
             {thumbnails.map((thumb, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(thumb)}
                className="flex-1 aspect-square rounded-lg overflow-hidden border border-black hover:border-wc-purple focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-wc-purple"
              >
                <OptimizedImage
                  src={thumb}
                  alt={`Tallow butter product view ${index + 1} - natural moisturizer`}
                  className="w-full h-full object-cover"
                  priority={false}
                />
              </button>
            ))}
          </div>
       </div>

       {/* Mobile: Stacked Content Below Image */}
       <div className="flex flex-col gap-4 md:gap-5 flex-1 md:pl-4">
         {/* Star Rating */}
         <div className="flex items-center gap-2">
           <div className="flex gap-1">
             {[...Array(5)].map((_, i) => (
               <svg key={i} className="w-5 h-5 fill-amber-400" viewBox="0 0 24 24">
                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
               </svg>
             ))}
           </div>
           <span className="text-sm text-gray-600 font-medium">4.9 • 128 reviews</span>
         </div>

                   {/* Product Title with Quantity - Mobile & Desktop */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-serif">
              Tallow Butter
            </h2>
            <div className="flex-shrink-0">
              <QuantityStepper 
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
            </div>
          </div>

                   {/* Product Description */}
          <p className="text-sm leading-relaxed text-gray-700">
            {variantDescriptions[selectedVariant]}
          </p>

                   {/* Variant Pills */}
          <div className="flex gap-2 flex-wrap">
            {variants.map((variant) => (
              <VariantPill
                key={variant}
                variant={variant}
                isActive={selectedVariant === variant}
                onClick={handleVariantChange}
              />
            ))}
          </div>

         {/* Features List */}
         <ul className="space-y-3 text-sm">
           <li className="flex items-center gap-3">
             <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
             <span>30-day satisfaction guarantee</span>
           </li>
           <li className="flex items-center gap-3">
             <CalendarIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
             <span>8oz = 1-2 months of daily use</span>
           </li>
         </ul>

                   {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 bg-white text-wc-green text-sm font-semibold px-3 py-2 rounded-full">
              <OptimizedImage src="/assets/Natural.png" alt="Organic certification icon" className="h-6" priority={false} placeholder={false} />
              Organic
            </div>
            <div className="inline-flex items-center gap-2 bg-white text-wc-green text-sm font-semibold px-3 py-2 rounded-full">
              <OptimizedImage src="/assets/Natural.png" alt="Grass-fed certification icon" className="h-6" priority={false} placeholder={false} />
              Grassfed
            </div>
            <div className="inline-flex items-center gap-2 bg-white text-wc-green text-sm font-semibold px-3 py-2 rounded-full">
              <OptimizedImage src="/assets/Natural.png" alt="Handmade certification icon" className="h-6" priority={false} placeholder={false} />
              Handmade
            </div>
          </div>

                                   {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full ${variantButtonColors[selectedVariant]} text-white text-lg font-medium py-4 rounded-xl border-2 border-black shadow-md hover:scale-[1.02] transition-transform focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-wc-purple`}
          >
            ADD TO CART | ${quantity * 40}
          </button>

         <p className="text-sm text-gray-500 text-center">
           ships in 1-2 days • free shipping on orders $50+
         </p>
      </div>
    </motion.div>
  );
};

export default ProductCard; 
import React from 'react';

const QuantityStepper = ({ quantity, onQuantityChange, min = 1, max = 10 }) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-4 border border-gray-300 rounded-full py-1 px-2 sm:px-3">
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="text-gray-700 hover:text-wc-purple disabled:text-gray-300 disabled:cursor-not-allowed text-base sm:text-lg font-medium"
        aria-label="Decrease quantity"
      >
        −
      </button>
      
      <span className="font-medium text-gray-900 min-w-[2ch] text-center text-sm sm:text-base">
        {quantity}
      </span>
      
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="text-gray-700 hover:text-wc-purple disabled:text-gray-300 disabled:cursor-not-allowed text-base sm:text-lg font-medium"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper; 
import React from 'react';

const VariantPill = ({ variant, isActive, onClick }) => {
  // Define colors for each variant
  const variantColors = {
    lavender: {
      border: 'border-wc-purple',
      background: 'bg-wc-purple',
      hover: 'hover:border-wc-purple'
    },
    thieves: {
      border: 'border-orange-400',
      background: 'bg-orange-400',
      hover: 'hover:border-orange-400'
    },
    unscented: {
      border: 'border-gray-400',
      background: 'bg-gray-400',
      hover: 'hover:border-gray-400'
    }
  };

  const colors = variantColors[variant] || variantColors.unscented;

  return (
    <button
      onClick={() => onClick(variant)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-wc-purple border-2 ${
        isActive
          ? `${colors.background} ${colors.border} text-white`
          : `${colors.border} text-gray-700 ${colors.hover}`
      }`}
      aria-label={`Select ${variant} variant`}
    >
      {variant}
    </button>
  );
};

export default VariantPill; 
import React from 'react';

const Badge = ({ children, icon: Icon }) => {
  return (
    <div className="inline-flex items-center gap-1.5 bg-white text-wc-green text-xs font-medium px-2 py-1 rounded-full border border-gray-200">
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </div>
  );
};

export default Badge; 
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createCheckout } from '../services/shopifyService';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const variantColors = {
    lavender: {
      bg: 'bg-wc-purple',
      text: 'text-white'
    },
    thieves: {
      bg: 'bg-orange-300',
      text: 'text-white'
    },
    unscented: {
      bg: 'bg-blue-300',
      text: 'text-white'
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const updateQuantity = (itemId, change) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0 || isCheckingOut) return;
    
    setIsCheckingOut(true);
    
    // Skip the API entirely - use direct cart URL
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Try different URL formats - Shopify has multiple ways to add to cart
    const urlOptions = [
      // Format 1: Direct product ID with quantity
      `https://jame3r-0v.myshopify.com/cart/7839558697041:${totalQuantity}`,
      
      // Format 2: Add to cart then go to cart
      `https://jame3r-0v.myshopify.com/cart/add?id=7839558697041&quantity=${totalQuantity}&return_to=/cart`,
      
      // Format 3: Direct to checkout with product
      `https://jame3r-0v.myshopify.com/cart/add?id=7839558697041&quantity=${totalQuantity}&return_to=/checkout`,
      
      // Format 4: Just go to the product page
      `https://jame3r-0v.myshopify.com/products/tallow-butter`,
      
      // Format 5: Go to cart page
      `https://jame3r-0v.myshopify.com/cart`
    ];
    
    // Start with the first option
    const primaryUrl = urlOptions[0];
    console.log('🛒 Redirecting to cart:', primaryUrl);
    console.log('💡 If this doesn\'t work, try these URLs manually:');
    urlOptions.forEach((url, index) => {
      console.log(`${index + 1}. ${url}`);
    });
    
    // Give user feedback, then redirect
    setTimeout(() => {
      window.location.href = primaryUrl;
    }, 500);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col rounded-l-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold font-serif">Your Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const colors = variantColors[item.variant] || variantColors.unscented;
                    
                    return (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                        {/* Product Info */}
                        <div className="flex items-start gap-3 mb-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">${item.price} each</p>
                            
                            {/* Variant Pill */}
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${colors.bg} ${colors.text}`}>
                              {item.variant}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <span className="font-medium text-gray-900 min-w-[2ch] text-center">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer with Total and Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-wc-purple">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full text-white text-lg font-medium py-3 rounded-xl border-2 border-black shadow-md transition-all focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-wc-purple ${
                    isCheckingOut 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-wc-purple to-purple-400 hover:scale-[1.02]'
                  }`}
                >
                  {isCheckingOut ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating checkout...
                    </div>
                  ) : (
                    'CHECKOUT'
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  ships in 1-2 days • free shipping on orders $50+
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer; 
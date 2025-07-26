import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import CartDrawer from './components/CartDrawer';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if item with same variant already exists
      const existingItemIndex = prevItems.findIndex(
        item => item.name === product.name && item.variant === product.variant
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += product.quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { 
          ...product, 
          id: `${product.name}-${product.variant}-${Date.now()}` 
        }];
      }
    });
    
    // Automatically open cart drawer after adding item
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } else {
      // Update quantity
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="App">
      <Header 
        cartItemCount={getTotalCartItems()} 
        onCartClick={handleCartClick} 
      />
      <Home onAddToCart={addToCart} />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
      />
    </div>
  );
}

export default App; 
import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleCartClick = () => {
    // Future: toggle cart drawer
    console.log('Cart clicked');
  };

  return (
    <div className="App">
      <Header cartItemCount={cartItemCount} onCartClick={handleCartClick} />
      <Home />
    </div>
  );
}

export default App; 
import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const updateCart = (productId, newQuantity) => {
    const updatedCart = cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      updateCart(product.id, existingItem.quantity + product.quantity);
    } else {
      setCart([...cart, { ...product, quantity: product.quantity }]);
    }
  };

  const updateItemQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    updateCart(productId, newQuantity);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const addToFavorites = (product) => {
    if (!favorites.some(item => item.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <StoreContext.Provider 
      value={{ 
        cart,
        favorites,
        addToCart,
        removeFromCart,
        addToFavorites,
        removeFromFavorites,
        clearCart,
        updateItemQuantity
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;

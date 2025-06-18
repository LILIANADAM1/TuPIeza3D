import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const [card, setCard] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const updateCart = (productId, newQuantity) => {
    const updatedCard = card.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCard(updatedCard);
  };

  const addToCart = (product) => {
    const existingItem = card.find(item => item.id === product.id);
    if (existingItem) {
      updateCart(product.id, existingItem.quantity + product.quantity);
    } else {
      setCard([...card, { ...product, quantity: product.quantity }]);
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
    setCard(card.filter(item => item.id !== productId));
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
    setCard([]);
  };

  return (
    <StoreContext.Provider 
      value={{ 
        card,
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

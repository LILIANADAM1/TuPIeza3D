import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserCart, updateUserCart } from '../services/api';

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const { user } = useAuth0();
  const [card, setCard] = useState(() => {
    const cart = localStorage.getItem('guestCart');
    return cart ? JSON.parse(cart) : [];
  });
  const [favorites, setFavorites] = useState([]);

  // Cargar carrito según estado de usuario
  useEffect(() => {
    if (user) {
      const loadUserCart = async () => {
        try {
          const cart = await getUserCart(user.sub);
          if (cart) {
            setCard(cart);
          } else {
            const guestCart = localStorage.getItem('guestCart');
            if (guestCart) {
              const parsedCart = JSON.parse(guestCart);
              setCard(parsedCart);
              saveCartToUser(parsedCart);
            }
          }
        } catch (error) {
          console.error('Error loading user cart:', error);
        }
      };
      loadUserCart();
      localStorage.removeItem('guestCart');
      localStorage.removeItem('savedCart');

      // Al iniciar sesión, limpiar favoritos
      setFavorites([]);
    } else {
      localStorage.setItem('guestCart', JSON.stringify(card));
    }
  }, [user]);

  const saveCartToUser = async (cart) => {
    try {
      await updateUserCart(user.sub, cart);
      localStorage.setItem('userCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = (product) => {
    const existingItem = card.find(item => item.id === product.id);
    if (existingItem) {
      updateCart(product.id, existingItem.quantity + product.quantity);
    } else {
      const updatedCard = [...card, { ...product, quantity: product.quantity }];
      setCard(updatedCard);
      if (user) {
        saveCartToUser(updatedCard);
      } else {
        localStorage.setItem('guestCart', JSON.stringify(updatedCard));
      }
    }
  };

  const updateCart = (productId, newQuantity) => {
    const updatedCard = card.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCard(updatedCard);
    if (user) {
      saveCartToUser(updatedCard);
    } else {
      localStorage.setItem('guestCart', JSON.stringify(updatedCard));
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
    const updatedCard = card.filter(item => item.id !== productId);
    setCard(updatedCard);
    if (user) {
      saveCartToUser(updatedCard);
    } else {
      localStorage.setItem('guestCart', JSON.stringify(updatedCard));
    }
  };

  const clearCart = () => {
    setCard([]);
    if (user) {
      saveCartToUser([]);
    } else {
      localStorage.setItem('guestCart', JSON.stringify([]));
    }
  };

  // Favoritos solo permitidos si NO estás logueado
  const addToFavorites = (product) => {
    if (user) return; // bloqueamos acción si está logueado
    if (!favorites.some(item => item.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    if (user) return; // bloqueamos acción si está logueado
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  return (
    <StoreContext.Provider
      value={{
        card,
        addToCart,
        removeFromCart,
        updateCart,
        updateItemQuantity,
        clearCart,
        favorites,
        addToFavorites,
        removeFromFavorites
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserCart, updateUserCart, addFavorite, removeFavorite, getUserFavorites } from '../services/api';

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const { user } = useAuth0();
  const [card, setCard] = useState(() => {
    const cart = localStorage.getItem('guestCart');
    const parsedCart = cart ? JSON.parse(cart) : [];
    // Asegurar que cada item tenga un precio válido
    const validCart = parsedCart.map(item => ({
      ...item,
      price: item.price || 0,
      quantity: item.quantity || 1
    }));
    return validCart;
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

  // Manejar favoritos para usuarios logueados y no logueados
  const addToFavorites = async (product) => {
    if (!user) {
      if (!favorites.some(item => item.id === product.id)) {
        setFavorites([...favorites, product]);
      }
    } else {
      try {
        await addFavorite(user.sub, product.id);
        setFavorites(prev => [...prev, product]);
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    }
  };

  const removeFromFavorites = async (productId) => {
    if (!user) {
      setFavorites(favorites.filter(item => item.id !== productId));
    } else {
      try {
        await removeFavorite(user.sub, productId);
        setFavorites(prev => prev.filter(item => item.id !== productId));
      } catch (error) {
        console.error('Error removing from favorites:', error);
      }
    }
  };

  // Cargar favoritos cuando el usuario inicia sesión
  useEffect(() => {
    if (user) {
      const loadUserFavorites = async () => {
        try {
          const response = await getUserFavorites(user.sub);
          if (response) {
            setFavorites(response);
          }
        } catch (error) {
          console.error('Error loading favorites:', error);
        }
      };
      loadUserFavorites();
    }
  }, [user]);

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
        removeFromFavorites,
        user
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;

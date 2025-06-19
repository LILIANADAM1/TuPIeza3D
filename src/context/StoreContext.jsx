import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { api, getUserCart, updateUserCart } from '../services/api';

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const { user, updateProfile } = useAuth0();
  const [card, setCard] = useState(() => {
    // Cargar cesta del localStorage inicialmente
    const cart = localStorage.getItem('guestCart');
    return cart ? JSON.parse(cart) : [];
  });
  const [favorites, setFavorites] = useState([]);

  // Efecto para cargar y sincronizar la cesta
  useEffect(() => {
    // Cuando el usuario inicia sesión:
    if (user) {
      // 1. Cargar cesta del usuario
      const loadUserCart = async () => {
        try {
          const cart = await getUserCart(user.sub);
          if (cart) {
            setCard(cart);
          } else {
            // Si no hay cesta en los datos del usuario, usar la del localStorage
            const guestCart = localStorage.getItem('guestCart');
            if (guestCart) {
              const parsedCart = JSON.parse(guestCart);
              setCard(parsedCart);
              // Guardar en datos del usuario
              saveCartToUser(parsedCart);
            }
          }
        } catch (error) {
          console.error('Error loading user cart:', error);
        }
      };
      loadUserCart();

      // 2. Limpiar localStorage del usuario
      localStorage.removeItem('guestCart');
    } else {
      // Cuando el usuario cierra sesión:
      // Guardar la cesta actual en localStorage
      localStorage.setItem('guestCart', JSON.stringify(card));
    }
  }, [user]);

  // Función para guardar la cesta en los datos del usuario
  // Función para guardar la cesta en los datos del usuario
  const saveCartToUser = async (cart) => {
    try {
      await updateUserCart(user.sub, cart);
      // También guardar en localStorage para referencia rápida
      localStorage.setItem('userCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Función para cargar la cesta del usuario al iniciar sesión
  useEffect(() => {
    if (user) {
      const loadUserCart = async () => {
        try {
          const cart = await getUserCart(user.sub);
          setCard(cart);
        } catch (error) {
          console.error('Error loading user cart:', error);
        }
      };
      loadUserCart();
    }
  }, [user]);

  const addToCart = (product) => {
    const existingItem = card.find(item => item.id === product.id);
    if (existingItem) {
      updateCart(product.id, existingItem.quantity + product.quantity);
    } else {
      const updatedCard = [...card, { ...product, quantity: product.quantity }];
      setCard(updatedCard);
      // Guardar en localStorage o en datos del usuario según el caso
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
    // Guardar en localStorage o en datos del usuario según el caso
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
    // Si el usuario está autenticado, guardamos la cesta en sus datos
    if (user) {
      saveCartToUser(updatedCard);
    }
  };

  const clearCart = () => {
    setCard([]);
    // Guardar en localStorage o en datos del usuario según el caso
    if (user) {
      saveCartToUser([]);
    } else {
      localStorage.setItem('guestCart', JSON.stringify([]));
    }
  };

  // Cuando el usuario inicia sesión, limpiamos el localStorage
  useEffect(() => {
    if (user) {
      localStorage.removeItem('savedCart');
    }
  }, [user]);

  const addToFavorites = (product) => {
    if (!favorites.some(item => item.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter(item => item.id !== productId));
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

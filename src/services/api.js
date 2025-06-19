import axios from 'axios';
import Hogar from '../pages/Hogar';

const API_BASE_URL = 'https://api.thingiverse.com';
const API_TOKEN = import.meta.env.VITE_THINGIVERSE_API_TOKEN;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const CATEGORY_SLUGS = {
  hogar: 'household',
  gadgets: 'gadgets',
  juegos: 'games'
};

// Función para obtener productos por categoría usando el slug
export const fetchProductsByCategory = async (category) => {
  try {
    const categorySlug = CATEGORY_SLUGS[category];
    if (!categorySlug) {
      throw new Error(`Category ${category} not found`);
    }

    // Obtener productos de la categoría usando el slug
    const response = await api.get(`/categories/${categorySlug}/things?sort=popular&page=1`);
    return response.data;

  } catch (error) {
    console.error('Error fetching category products:', error);
    throw error;
  }
};

// Función para obtener categorías (para depuración)
export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchTopProducts = async () => {
  try {
    const response = await api.get('/things?sort=popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw error;
  }
}

export const updateUserCart = async (userId, cart) => {
  try {
    const response = await api.put(`/users/${userId}/cart`, { cart });
    return response.data;
  } catch (error) {
    console.error('Error updating user cart:', error);
    throw error;
  }
};

export const getUserCart = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/cart`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user cart:', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await api.get('/things');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

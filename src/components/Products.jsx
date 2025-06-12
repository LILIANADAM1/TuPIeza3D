import { useState, useEffect } from 'react';
import { api } from '../services/api';
import ProductCard from './ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Map());

  const handleLike = (productId, isLiked) => {
    const newLikedProducts = new Set(likedProducts);
    if (isLiked) {
      newLikedProducts.add(productId);
    } else {
      newLikedProducts.delete(productId);
    }
    setLikedProducts(newLikedProducts);
  };

  const handleAddToCart = (productId, quantity) => {
    const newCartItems = new Map(cartItems);
    const currentQuantity = newCartItems.get(productId) || 0;
    newCartItems.set(productId, currentQuantity + quantity);
    setCartItems(newCartItems);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/things');
        setProducts(response.data.slice(0, 9));
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Más Productos</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Más Productos</h2>
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Más Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onLike={handleLike}
            onCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

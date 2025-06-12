import { useState, useEffect } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Gadgets() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Map());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Buscar productos con palabras clave relacionadas con gadgets
        const searchTerms = ['gadgets'];
        const allProducts = [];

        // Realizar búsqueda para cada término
        for (const term of searchTerms) {
          const response = await api.get(`/search/things?q=${term}&sort=relevant`);
          allProducts.push(...response.data.hits);
        }

        // Eliminar duplicados usando un Set
        const uniqueProducts = Array.from(
          new Map(allProducts.map(product => [product.id, product])).values()
        );

        // Tomar solo los primeros 12 productos únicos
        setProducts(uniqueProducts.slice(0, 12));
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos de gadgets');
        console.error('Error:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Gadgets</h2>
      
      {loading && (
        <div className="text-center py-8">Cargando productos...</div>
      )}

      {error && (
        <div className="text-red-500 text-center py-8">{error}</div>
      )}

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

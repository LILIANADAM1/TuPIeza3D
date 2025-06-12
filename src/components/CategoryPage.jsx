import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import ProductCard from './ProductCard';

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Map());

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/things');
        
        // Filtrar productos según la categoría
        const filteredProducts = response.data.filter(product => {
          // Aquí necesitaríamos la lógica real para filtrar por categoría
          // Por ahora simulamos con la descripción
          const categoryKeywords = {
            'Hogar': ['home', 'kitchen', 'living'],
            'Juegos y juguetes': ['toy', 'game', 'play'],
            'Gadgets': ['gadget', 'tech', 'electronics']
          };
          
          const keywords = categoryKeywords[slug] || [];
          return keywords.some(keyword => 
            product.description.toLowerCase().includes(keyword)
          );
        });

        setProducts(filteredProducts.slice(0, 12));
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error('Error fetching category products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

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
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{slug}</h2>
      
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

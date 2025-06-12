import { useState, useEffect } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import { fetchProductsByCategory } from '../services/api';

export default function Hogar() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Map());
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchProductsByCategory('hogar');
        
        // Agregar precios personalizados a los productos
        const productsWithPrices = await Promise.all(data.map(async product => ({
          ...product,
          price: await getCategoryPrice('household', product.slug)
        })));

        if (productsWithPrices && productsWithPrices.length > 0) {
          setProducts(productsWithPrices);
          setError(null);
          setHasMore(data.length > 0);
        } else {
          setError('No se encontraron productos para esta categoría');
        }
      } catch (err) {
        setError(`Error al cargar los productos de hogar: ${err.message}`);
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
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Hogar</h2>
      
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Cargando productos...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-8">
          <p>{error}</p>
          <button
            onClick={() => {
              fetchProducts();
              setError(null);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Intentar nuevamente
          </button>
        </div>
      )}

      {products.length === 0 && !loading && !error && (
        <div className="text-gray-500 text-center py-8">
          No se encontraron productos en esta categoría
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

import { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { api } from '../services/api';
import { useStore } from '../context/StoreContext';
import CarouselProductCard from './CarouselProductCard';

export default function TopSales() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useStore();

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        setLoading(true);
        const response = await api.get('/things?sort=popular');
        setProducts(response.data.slice(0, 8));
        setError(null);
      } catch (err) {
        console.error('Error fetching top products:', err);
        setError('Error al cargar los productos más vendidos');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSelling();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Ventas</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Ventas</h2>
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Ventas</h2>
      <div className="w-full h-[350px]">
        <Splide
          options={{
            type: 'loop',
            perPage: 4,
            gap: '0.5rem',
            arrows: false,
            pagination: false,
            drag: false,
            autoplay: true,
            speed: 600,
            interval: 1600,
            fixedWidth: '255px',
            fixedHeight: '500px',
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            perMove: 1,
            padding: {
              left: '0.5rem',
              right: '0.5rem'
            },
          }}
        >
          {products.map((product) => (
            <SplideSlide key={product.id}>
              <div className="w-full h-full">
                <CarouselProductCard 
                  product={product}
                  onCart={(productId, quantity) => addToCart(productId, quantity)}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
}

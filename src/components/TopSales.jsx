import { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import ProductCard from './ProductCard';
import { api } from '../services/api';

export default function TopSales() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        setLoading(true);
        const response = await api.get('/things?sort=popular');
        setProducts(response.data.slice(0, 8));
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos más vendidos');
        console.error('Error fetching top products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSelling();
  }, []);

  const categories = [
    {
      id: 1,
      name: 'Impresión 3D',
      image: '/categories/3d-printing.jpg',
      description: 'Objetos impresos en 3D'
    },
    {
      id: 2,
      name: 'Escaneo 3D',
      image: '/categories/3d-scanning.jpg',
      description: 'Escaneos de objetos en 3D'
    },
    {
      id: 3,
      name: 'Diseño 3D',
      image: '/categories/3d-design.jpg',
      description: 'Diseños 3D personalizados'
    },
    {
      id: 4,
      name: 'Modelos 3D',
      image: '/categories/3d-models.jpg',
      description: 'Modelos 3D profesionales'
    }
  ];

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
      <div className="mt-8">
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
              fixedWidth: '262px',
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
                  <ProductCard product={product} />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { HeartIcon } from '@heroicons/react/24/outline';

const Favoritos = () => {
  const { favorites } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Favoritos</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">No tienes productos favoritos</h2>
          <p className="mt-2 text-gray-500">¡Añade productos a tus favoritos para verlos aquí!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLiked={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;

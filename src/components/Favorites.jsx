import React from 'react';
import { useStore } from '../context/StoreContext';
import { HeartIcon } from '@heroicons/react/24/outline';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Favoritos</h2>
          
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <HeartIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">No tienes productos favoritos</p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <HeartIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;

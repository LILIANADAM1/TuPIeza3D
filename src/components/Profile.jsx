import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Cog6ToothIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';

const Profile = () => {
  const { user, logout } = useAuth0();
  const { favorites } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              {/* Sección de Información Personal */}
              <div className="py-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>
                    <p className="mt-1 text-sm text-gray-500">Información personal</p>
                  </div>
                  <button 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar sesión
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <div className="mt-1">
                      <p className="text-sm text-gray-900">{user?.name || 'No disponible'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                      <p className="text-sm text-gray-900">{user?.email || 'No disponible'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección de Favoritos */}
              <div className="py-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Mis Favoritos</h2>
                  <p className="mt-1 text-sm text-gray-500">Productos que has marcado como favoritos</p>
                </div>

                <div className="mt-6">
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-200 rounded-lg h-40">
                          {/* Skeleton loading */}
                        </div>
                      ))}
                    </div>
                  ) : favorites.length === 0 ? (
                    <div className="text-center py-8">
                      <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes productos favoritos</h3>
                      <p className="mt-1 text-sm text-gray-500">¡Añade productos a tus favoritos para verlos aquí!</p>
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
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

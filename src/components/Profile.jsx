import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Cog6ToothIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import ProfileModal from './ProfileModal';

const Profile = () => {
  const { user, logout } = useAuth0();
  const { favorites } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
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
                      <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
                    </div>
                  </div>
                  {isLoading ? (
                    <div className="mt-8">
                      <div className="animate-pulse">
                        <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8">
                      <div className="flex flex-col items-center">
                        <img
                          src={user?.picture}
                          alt="Perfil"
                          className="w-24 h-24 rounded-full"
                        />
                        <h2 className="mt-4 text-xl font-semibold text-gray-900">{user?.name}</h2>
                        <p className="mt-1 text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Opciones del perfil */}
                <div className="py-8">
                  <div className="space-y-4">
                    <button className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                      <span>Mis Favoritos</span>
                      <HeartIcon className="h-5 w-5 text-red-500" />
                    </button>
                   
                  </div>
                </div>

                {/* Lista de favoritos */}
                <div className="py-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Favoritos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {favorites.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>

                {/* Botón de cierre de sesión */}
                <div className="pt-8">
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Profile;

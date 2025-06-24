import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Cog6ToothIcon, HeartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth0();
  const { favorites } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg mx-2">
        {/* Header del modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Perfil</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Contenido del perfil */}
        <div className="p-4 space-y-4">
          {/* Información del usuario */}
          <div className="flex flex-col items-center space-y-2">
            <img
              src={user?.picture}
              alt="Perfil"
              className="w-24 h-24 rounded-full"
            />
            <h3 className="text-lg font-semibold">{user?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          {/* Opciones del perfil */}
          <div className="space-y-2">
            <button className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
              <span>Mis Favoritos</span>
              <HeartIcon className="h-5 w-5 text-red-500" />
            </button>
            <button className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
              <span>Ajustes</span>
              <Cog6ToothIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Lista de favoritos */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Favoritos</h3>
            <div className="grid grid-cols-2 gap-4">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Botón de cierre de sesión */}
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

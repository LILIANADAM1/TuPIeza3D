import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  UserCircleIcon,
  PencilIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useAuth0();

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex justify-center mb-8">
                  <img
                    src={user?.picture || ''}
                    alt={user?.name || 'Perfil'}
                    className="h-32 w-32 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + (user?.name || 'Usuario');
                    }}
                  />
                </div>
                <div className="flex justify-center mb-4">
                  <h1 className="text-3xl font-bold text-gray-800">{user?.name || 'Usuario'}</h1>
                </div>
                <div className="flex justify-center mb-4">
                  <p className="text-gray-600">{user?.email}</p>
                </div>
                <div className="flex justify-center space-x-4 mb-8">
                  <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                    <PencilIcon className="h-5 w-5 mr-2" />
                    Editar Perfil
                  </button>
                  <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                    <Cog6ToothIcon className="h-5 w-5 mr-2" />
                    Ajustes
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Miembros</p>
                      <p className="text-sm text-gray-500">10,000</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShoppingBagIcon className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Compras</p>
                      <p className="text-sm text-gray-500">100</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HeartIcon className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Favoritos</p>
                      <p className="text-sm text-gray-500">25</p>
                    </div>
                  </div>
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

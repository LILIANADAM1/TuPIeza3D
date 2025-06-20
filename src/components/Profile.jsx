import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useAuth0();

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
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                    <Cog6ToothIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Editar perfil
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

              {/* Puedes agregar otras secciones aquí si lo deseas */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

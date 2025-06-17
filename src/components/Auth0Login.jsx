import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  LockClosedIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

const Auth0Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        screen_hint: 'signup',
        redirect_uri: window.location.origin,
      });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicia sesión con tu cuenta
          </p>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                O inicia sesión con
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleLogin}
              className="relative w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LockClosedIcon className="h-5 w-5 mr-2" />
              Iniciar sesión con Auth0
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth0Login;

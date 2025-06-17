import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../assets/logopieza.png';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth0();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Tu Pieza 3D"
                  className="h-16 w-auto"
                />
                <span className="ml-4 text-3xl font-bold text-gray-800">Tu Pieza 3D</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/perfil" className="flex items-center">
                    <img
                      src={user?.picture || ''}
                      alt={user?.name || 'Perfil'}
                      className="h-8 w-8 rounded-full cursor-pointer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + (user?.name || 'Usuario');
                      }}
                    />
                    <span className="ml-2 text-gray-700 hover:text-gray-900 cursor-pointer">{user?.name || 'Usuario'}</span>
                  </Link>
                  <Link to="/favoritos" className="flex items-center">
                    <HeartIcon className="h-6 w-6" />
                    <span className="ml-2 text-gray-700">Favoritos</span>
                  </Link>
                  <button 
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="text-red-600 hover:text-red-800 px-2 py-1 rounded-md transition-colors"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                  Iniciar Sesión
                </Link>
              )}
              <Link to="/cesta" className="flex items-center">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="ml-2 text-gray-700">Cesta</span>
              </Link>
            </div>
            <div className="ml-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar productos..."
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

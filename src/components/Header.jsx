import { Link, useLocation } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { useAuth0 } from '@auth0/auth0-react';
import { useStore } from '../context/StoreContext';
import SearchBar from './SearchBar';
import logo from '../assets/logopieza.png';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth0();
  const { card } = useStore();
  const totalItems = card.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo a la izquierda */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Tu Pieza 3D" className="h-16 w-auto" />
              <span className="ml-4 text-3xl font-bold text-gray-800">Tu Pieza 3D</span>
            </Link>
          </div>

          {/* Tramitar Pedido button for authenticated users */}
          {isAuthenticated && useLocation().pathname === '/cesta' && (
            <Link
              to="/pedido"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:text-blue-900 hover:bg-blue-50"
            >
              Tramitar Pedido
            </Link>
          )}

          {/* Buscador */}
          <div className="flex-1 px-4">
            <SearchBar />
          </div>

          {/* Acciones a la derecha */}
          <div className="flex items-center space-x-6">
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
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                Iniciar Sesión
              </Link>
            )}
            <Link to="/cesta" className="flex items-center relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -right-7 bg-red-500 text-white text-sm px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
              <span className="ml-2 text-gray-700">Cesta</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

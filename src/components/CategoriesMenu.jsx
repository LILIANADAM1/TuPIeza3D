import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDownIcon,
  ShoppingCartIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth0 } from '@auth0/auth0-react';
import { useStore } from '../context/StoreContext';

const categories = [
  { id: 1, name: 'Hogar', slug: 'hogar' },
  { id: 2, name: 'Juegos y juguetes', slug: 'juegos-juguetes' },
  { id: 3, name: 'Gadgets', slug: 'gadgets' },
];

export default function CategoriesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth0();
  const { card } = useStore();
  const totalItems = card.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              Categorías
              <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-500 sm:hidden" />
            </button>
          </div>

          {/* Mostrar solo en móvil */}
          <div className="flex sm:hidden">
            {/* Cesta */}
            <Link
              to="/cesta"
              className={`relative p-2 rounded-md group hover:scale-105 hover:shadow-sm transition-all duration-300 ease-in-out ${isActive ? 'bg-green-500 text-white hover:bg-green-600' : ''}`}
              onClick={() => {
                setIsActive(true);
                setTimeout(() => setIsActive(false), 300);
              }}
            >
              <ShoppingCartIcon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-gray-700'} group-hover:text-blue-500 transition-colors duration-300`} />
              {totalItems > 0 && (
                <span className={`absolute -right-7 ${isActive ? 'bg-green-500' : 'bg-red-500'} text-white text-sm px-1.5 py-0.5 rounded-full transition-transform duration-300 group-hover:scale-110`}>
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cesta</span>
            </Link>

            {/* Perfil/Cerrar Sesión */}
            {isAuthenticated ? (
              <Link
                to="/perfil"
                className="p-2 rounded-md hover:bg-gray-50 text-gray-700"
              >
                <UserCircleIcon className="h-6 w-6" />
                <span className="sr-only">Ver Perfil</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-md hover:bg-gray-50 text-gray-700"
              >
                <UserCircleIcon className="h-6 w-6" />
                <span className="sr-only">Iniciar Sesión</span>
              </Link>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="mt-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categorias/${category.slug}`}
                  className="text-gray-700 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

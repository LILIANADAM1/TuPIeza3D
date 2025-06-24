import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDownIcon,
  ShoppingCartIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth0 } from '@auth0/auth0-react';
import { useStore } from '../context/StoreContext';

const categories = [
  { id: 1, name: 'Impresoras 3D', slug: 'impresoras-3d' },
  { id: 2, name: 'Filamento', slug: 'filamento' },
  { id: 3, name: 'Gadgets', slug: 'gadgets' },
];

export default function CategoriesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth0();
  const { card } = useStore();
  const totalItems = card.reduce((total, item) => total + item.quantity, 0);

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
              className="relative p-2 rounded-md hover:bg-gray-50 text-gray-700"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -right-7 bg-red-500 text-white text-sm px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cesta</span>
            </Link>

            {/* Iniciar Sesión */}
            {isAuthenticated ? (
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="p-2 rounded-md hover:bg-gray-50 text-gray-700"
              >
                <UserCircleIcon className="h-6 w-6" />
                <span className="sr-only">Cerrar Sesión</span>
              </button>
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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const categories = [
  { id: 1, name: 'Hogar', slug: 'hogar' },
  { id: 2, name: 'Juegos y juguetes', slug: 'juegos-juguetes' },
  { id: 3, name: 'Gadgets', slug: 'gadgets' },
];

export default function CategoriesMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
              <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categorias/${category.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-gray-900 hover:underline"
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

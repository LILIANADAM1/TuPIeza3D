import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Hacer la búsqueda después de un pequeño delay para evitar peticiones innecesarias
  useEffect(() => {
    if (searchQuery.trim()) {
      const timer = setTimeout(() => {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }, 300); // 300ms de delay

      return () => clearTimeout(timer);
    }
  }, [searchQuery, navigate]);

  const handleSearch = (query) => {
    // Redirigir a la página de resultados de búsqueda
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    navigate('/');
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Buscar productos..."
          className="w-128 px-5 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchQuery.trim()) {
              handleSearch(searchQuery);
            }
          }}
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      <button
        onClick={() => handleSearch(searchQuery)}
        disabled={!searchQuery.trim()}
        className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;

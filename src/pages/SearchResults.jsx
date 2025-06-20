import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useStore } from '../context/StoreContext';
import { getProductPrice, getProductDescription } from '../services/prices';
import ProductCard from '../components/ProductCard';

const API_BASE_URL = 'https://api.thingiverse.com';
const API_TOKEN = import.meta.env.VITE_THINGIVERSE_API_TOKEN;

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useStore();  // SOLO addToCart
  const { user } = useAuth0();

  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  const filterDuplicates = (newResults, currentResults) => {
    const existingIds = new Set(currentResults.map(r => r.id));
    return newResults.filter(result => !existingIds.has(result.id));
  };

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const fetchResults = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/search/${encodeURIComponent(searchQuery)}?page=${page}&per_page=12`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al buscar productos');
      }

      const data = await response.json();
      const filteredResults = filterDuplicates(data.hits, results);
      
      if (filteredResults.length > 0) {
        setResults(prev => [...prev, ...filteredResults]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      setError('Error al buscar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setResults([]);
      setPage(1);
      setHasMore(true);
      fetchResults(1);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (page > 1 && searchQuery) {
      fetchResults(page);
    }
  }, [page, searchQuery]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      fetchResults(page + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Resultados de búsqueda</h1>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-4">
          {error}
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <div className="text-gray-500 text-center py-4">
          No se encontraron resultados
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <ProductCard
              key={`${result.id}-${result.public_url || searchQuery}`}
              product={result}
              // Eliminado onLike que usaba favoritos
              onCart={(id, quantity) => {
                const productToAdd = {
                  id: result.id,
                  name: result.name,
                  image: result.thumbnail,
                  price: `${Number(getProductPrice(result)).toFixed(2)} €`,
                  quantity,
                  description: getProductDescription(result)
                };
                addToCart(productToAdd);
              }}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            ) : (
              'Ver más'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

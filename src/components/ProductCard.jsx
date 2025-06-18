import { useState, useEffect } from 'react';
import { HeartIcon, ShoppingCartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useAuth0 } from '@auth0/auth0-react';
import { useStore } from '../context/StoreContext';
import UnauthenticatedModal from './UnauthenticatedModal';
import { getProductPrice, getProductDescription } from '../services/prices';

export default function ProductCard({ product, onLike, onCart, isLiked: initialIsLiked = false }) {
  const { isAuthenticated } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(isAuthenticated ? initialIsLiked : false);

  // Reiniciamos el estado de "Me gusta" cuando el usuario no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLiked(false);
    }
  }, [isAuthenticated]);

  const handleLike = () => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    if (onLike) {
      onLike(product.id, newIsLiked);
    }
  };

  // Aseguramos que el corazón se mantenga en estado neutral cuando no estás logueado
  const heartColor = isAuthenticated ? (isLiked ? 'text-red-500' : 'text-gray-400') : 'text-gray-400';

  const { addToCart } = useStore();

  const handleCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      image: product.image || product.thumbnail,
      price: getProductPrice(product),
      quantity: quantity,
      description: getProductDescription(product)
    };
    addToCart(productToAdd);
  };

  return (
    <>
      {showModal && (
        <UnauthenticatedModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative aspect-[4/3]">
          <img
            src={product.thumbnail || product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
            fetchpriority="high"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.jpg';
            }}
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={handleLike}
              className="p-2 rounded-full bg-white hover:bg-red-200 hover:text-white"
            >
              <HeartIcon
                className={`h-6 w-6 ${heartColor}`}
              />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">
              {getProductPrice(product)}€
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <MinusIcon className="h-6 w-6 text-gray-400" />
              </button>
              <span className="px-2 py-1 bg-gray-100 rounded-full">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <PlusIcon className="h-6 w-6 text-gray-400" />
              </button>
              <button
                onClick={handleCart}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2"
              >
                <ShoppingCartIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

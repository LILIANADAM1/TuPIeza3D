import { useState, useEffect } from 'react';
import { HeartIcon, ShoppingCartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useAuth0 } from '@auth0/auth0-react';
import { useStore } from '../context/StoreContext';
import { getProductPrice, getProductDescription } from '../services/prices';

export default function CarouselProductCard({ product, onCart, isLiked: initialIsLiked = false }) {
  const { user } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  // Actualizamos el estado de "Me gusta" cuando cambia el valor inicial
  useEffect(() => {
    if (initialIsLiked !== undefined) {
      setIsLiked(initialIsLiked);
    }
  }, [initialIsLiked]);

  // Reiniciamos el estado de "Me gusta" cuando el usuario no está autenticado
  useEffect(() => {
    if (!user) {
      setIsLiked(false);
    }
  }, [user]);

  const { addToFavorites, removeFromFavorites, favorites } = useStore();

  useEffect(() => {
    // Actualizar el estado de isLiked cuando cambien los favoritos
    const isProductFavorited = favorites.some(item => item.id === product.id);
    setIsLiked(isProductFavorited);
  }, [favorites, product.id]);

  const handleLike = () => {
    if (!user) {
      setShowModal(true);
      return;
    }
    const isProductFavorited = favorites.some(item => item.id === product.id);
    if (isProductFavorited) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // Aseguramos que el corazón se mantenga en estado neutral cuando no estás logueado
  const heartColor = user ? (isLiked ? 'text-red-500' : 'text-gray-400') : 'text-gray-400';

  const { addToCart } = useStore();

  const handleCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      image: product.image || product.thumbnail,
      price: Number(getProductPrice(product)),
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
            src={product.image || product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
            fetchpriority="high"
            width="400"
            height="300"
            quality="90"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.jpg';
            }}
          />
          {user && (
            <div className="absolute top-2 right-8">
              <button
                onClick={handleLike}
                className="p-2 rounded-full bg-white hover:bg-red-200 hover:text-white"
              >
                {isLiked ? (
                  <HeartIconSolid className={`h-6 w-6 ${heartColor}`} />
                ) : (
                  <HeartIcon className={`h-6 w-6 ${heartColor}`} />
                )}
              </button>
            </div>
          )}
        </div>
        <div className="p-4 text-center">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
            {product.name}
          </h3>
          {product.description}
          <div className="flex justify-center items-center space-x-2">
            <span className="text-sm text-gray-600">
              {Number(getProductPrice(product)).toFixed(2)}€
            </span>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 rounded-full hover:bg-gray-100"
            >
              <MinusIcon className="h-4 w-4 text-gray-400" />
            </button>
            <span className="px-1.5 py-0.5 bg-gray-100 rounded-full text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 rounded-full hover:bg-gray-100"
            >
              <PlusIcon className="h-4 w-4 text-gray-400" />
            </button>
            <button
              onClick={handleCart}
              className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 flex items-center space-x-1"
            >
              <ShoppingCartIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

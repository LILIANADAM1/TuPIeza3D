import React from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  ShoppingCartIcon, 
  XMarkIcon, 
  MinusIcon, 
  PlusIcon,
  UserCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const Cesta = () => {
  const { card, removeFromCart, clearCart, updateItemQuantity } = useStore();
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleClearCart = () => {
    clearCart();
    navigate('/cesta');
  };

  const handleTramitarPedido = () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        returnTo: window.location.origin + '/cesta'
      });
      return;
    }
    navigate('/pedido');
  };

  const getTotal = () => {
    if (!card || !Array.isArray(card)) return 0;
    return card.reduce((total, item) => {
      const itemPrice = Number(item.price) || 0;
      const itemQuantity = Number(item.quantity) || 1;
      return total + (itemPrice * itemQuantity);
    }, 0);
  };

  // Formatear precio
  const formatPrice = (price) => {
    if (price === null || price === undefined || isNaN(price)) {
      return '0.00€';
    }
    return Number(price).toFixed(2) + '€';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 flex flex-col justify-center">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-2xl font-bold text-center sm:text-left">Cesta de Compras</h2>
            <div className="mt-2 sm:mt-0 flex items-center space-x-2 justify-center sm:justify-end w-full sm:w-auto">
              <span className="text-gray-600">Artículos:</span>
              <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold">
                {card.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>
          </div>
          
          {card.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-gray-600">Tu cesta está vacía</p>
            </div>
          ) : (
            <div>
              <div className="space-y-4">
                {card.map((item) => (
                  <div className="relative p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 hover:bg-gray-100 text-red-600 hover:text-red-800 shadow-sm"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded"
                      />
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                const newQuantity = Math.max(1, item.quantity - 1);
                                updateItemQuantity(item.id, newQuantity);
                              }}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <MinusIcon className="h-5 w-5 text-gray-400" />
                            </button>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                updateItemQuantity(item.id, item.quantity + 1);
                              }}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <PlusIcon className="h-5 w-5 text-gray-400" />
                            </button>
                          </div>
                          <p className="text-gray-600 text-sm">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-8 border-t pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                  <h3 className="text-lg font-medium">Total</h3>
                  <p className="text-lg font-bold">{formatPrice(getTotal())}</p>
                </div>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center sm:justify-end space-y-2 sm:space-y-0 space-x-0 sm:space-x-4">
                  <button
                    onClick={handleClearCart}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-200 rounded-lg shadow-sm text-sm sm:text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-all duration-200 flex items-center justify-center sm:justify-start space-x-2"
                  >
                    <TrashIcon className="h-5 w-5 text-gray-500" />
                    <span>Limpiar Cesta</span>
                  </button>
                  <button
                    onClick={handleTramitarPedido}
                    className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium flex items-center justify-center sm:justify-start space-x-2 transition-all duration-200 ${
                      isAuthenticated ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isAuthenticated ? (
                      <>
                        <ShoppingCartIcon className="h-5 w-5" />
                        <span>Tramitar Pedido</span>
                      </>
                    ) : (
                      <>
                        <UserCircleIcon className="h-5 w-5" />
                        <span>Iniciar Sesión para Tramitar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cesta;

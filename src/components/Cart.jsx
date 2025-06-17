import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCartIcon, XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateItemQuantity } = useStore();

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Cesta de Compras</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Artículos:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>
          </div>
          
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-gray-600">Tu cesta está vacía</p>
            </div>
          ) : (
            <div>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
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
                        <p className="text-gray-600 mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t pt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Total</h3>
                  <p className="text-lg font-bold">${getTotal().toFixed(2)}</p>
                </div>
                <button
                  onClick={clearCart}
                  className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Limpiar Cesta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

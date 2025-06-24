import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  ShoppingCartIcon, 
  CreditCardIcon as CardIcon,
  BanknotesIcon as CashIcon,
  ArrowLeftIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  GiftIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const paymentOptions = [
  {
    id: 'credit-card',
    name: 'Tarjeta de Crédito/Débito',
    icon: CardIcon,
    description: 'Pago con tarjeta Visa, MasterCard, American Express'
  },
  {
    id: 'bank-transfer',
    name: 'Transferencia Bancaria',
    icon: CurrencyDollarIcon,
    description: 'Transferencia bancaria directa'
  },
  {
    id: 'cash-on-delivery',
    name: 'Contra Reembolso',
    icon: CashIcon,
    description: 'Paga al recibir el pedido'
  },
  {
    id: 'store-credit',
    name: 'Crédito en Tienda',
    icon: BuildingStorefrontIcon,
    description: 'Paga con tus puntos o crédito acumulado'
  },
  {
    id: 'express-payment',
    name: 'Pago Express',
    icon: SparklesIcon,
    description: 'Pago rápido y seguro'
  }
];

const Pedido = () => {
  const { card, clearCart } = useStore();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('credit-card');
  const [orderStatus, setOrderStatus] = useState('pending');

  const total = card.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);

  const handlePayment = () => {
    if (!user) {
      alert('Por favor, inicia sesión para completar el pedido');
      return;
    }

    if (card.length === 0) {
      alert('El carrito está vacío');
      navigate('/cesta');
      return;
    }

    // Simular el proceso de pago
    alert('¡Gracias por tu compra! Se ha realizado el cobro exitosamente.');
    clearCart();
    navigate('/perfil');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {/* Volver a la Cesta button */}
            <button
              onClick={() => navigate('/cesta')}
              className="mb-6 p-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center space-x-2"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Volver a la Cesta</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              <ShoppingCartIcon className="h-6 w-6 inline-block mr-2" />
              Tramitar Pedido
            </h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Detalles del Pedido</h2>
                <div className="space-y-4">
                  {card.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">{Number(item.price * item.quantity).toFixed(2)}€</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Métodos de Pago</h2>
                <div className="space-y-4">
                  {paymentOptions.map((option) => (
                    <div
                      key={option.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedPayment(option.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <option.icon className="h-6 w-6 text-gray-400" />
                            <span className="text-gray-900 font-medium">{option.name}</span>
                          </div>
                          {selectedPayment === option.id && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                              Seleccionado
                            </span>
                          )}
                        </div>
                        {option.description && (
                          <p className="mt-2 text-sm text-gray-500">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handlePayment}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Realizar Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedido;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function UnauthenticatedModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold text-gray-900">Usuario no registrado</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Debes iniciar sesión o registrarte para poder añadir favoritos a las listas.
          </p>
          <div className="flex justify-center">
            <Link 
              to="/login"
              onClick={onClose}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

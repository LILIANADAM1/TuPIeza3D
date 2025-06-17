import React, { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/moreno.liliana@outlook.es', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4 tracking-tight">Contáctanos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¡Estamos aquí para ayudarte! Estamos a tu disposición para responder cualquier pregunta o consulta que tengas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sección de Información */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-700">Email</h3>
                      <p className="text-gray-600">tuPieza3D@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-700">Teléfono</h3>
                      <p className="text-gray-600">+34 612 345 678</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-700">Dirección</h3>
                      <p className="text-gray-600">Calle Falsa 123, Bilbao, España</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
  <h2 className="text-3xl font-bold text-gray-900 text-center">Horarios</h2>
  <div className="space-y-4">
    <div className="flex items-center space-x-4 text-center">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-gray-700">Lunes a Viernes</h3>
        <p className="text-gray-600">9:00 - 18:00</p>
      </div>
    </div>
    <div className="flex items-center space-x-4 text-left">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-gray-700">Sábado</h3>
        <p className="text-gray-600">10:00 - 14:00</p>
      </div>
    </div>
    <div className="flex items-center space-x-4 text-left">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-gray-700">Domingo</h3>
        <p className="text-gray-600">Cerrado</p>
      </div>
    </div>
  </div>
</div>

            </div>
          </div>

          {/* Sección del Formulario */}
<div className="bg-white rounded-2xl shadow-xl p-8">
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900 text-left">Envíanos un mensaje</h2>

    {isSubmitted ? (
      <div className="text-left text-green-600 font-semibold text-lg">
        ¡Gracias por contactarnos! Responderemos pronto.
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 text-left">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Escribe tu mensaje aquí..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    )}
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Contacto;

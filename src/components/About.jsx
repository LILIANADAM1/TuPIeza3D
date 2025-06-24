import React from 'react';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestra Historia</h1>
        <p className="text-gray-600">La pasión por la innovación y la excelencia</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-gray-700 space-y-6">
          <p>
            En 2015, Xabier Uribe, un ingeniero industrial apasionado por la tecnología y la innovación, fundó TuPieza3D con un sueño: democratizar el acceso a la impresión 3D para todos.
          </p>
          <p>
            Desde su taller en Bilbao, Xabier comenzó a experimentar con diferentes tecnologías de impresión 3D, buscando formas de hacerlas más accesibles y fáciles de usar para personas sin experiencia técnica.
          </p>
          <p>
            Con años de experiencia en el sector industrial y un profundo conocimiento de los materiales, Xabier desarrolló una plataforma única que combina diseño, impresión y distribución de Piezas 3D de alta calidad.
          </p>
          <p>
            Hoy en día, TuPieza3D es mucho más que una tienda de impresión 3D. Es una comunidad de innovadores, diseñadores y entusiastas que comparten una visión común: crear un futuro más sostenible y personalizado a través de la tecnología.
          </p>
          <p>
            Nuestro compromiso es seguir liderando la revolución de la fabricación digital, manteniendo siempre los valores que nos definieron: calidad, innovación y accesibilidad.
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg transform -rotate-3"></div>
          <div className="relative p-8 bg-white rounded-lg shadow-lg">
            <img 
              src="/logo-xabier.jpg" 
              alt="Xabier Uribe - Fundador de TuPieza3D" 
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
              decoding="async"
              fetchpriority="high"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-gray-900">Xabier Uribe</h3>
              <p className="text-gray-600">Fundador y CEO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

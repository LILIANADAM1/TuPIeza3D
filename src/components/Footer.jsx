export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Tu Pieza 3D</h3>
            <p className="text-gray-400">
              Tu tienda de productos 3D de confianza.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li><a href="/categorias/hogar" className="text-gray-400 hover:text-white">Hogar</a></li>
              <li><a href="/categorias/juegos-juguetes" className="text-gray-400 hover:text-white">Juegos y juguetes</a></li>
              <li><a href="/categorias/gadgets" className="text-gray-400 hover:text-white">Gadgets</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white">Sobre Nosotros</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contacto</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white">Términos y Condiciones</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: tuPieza3D@gmail.com</li>
              <li className="text-gray-400">Teléfono: +34 612 345 678</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tu Pieza 3D. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TopSales from '../components/TopSales';
import Products from '../components/Products';

function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirigir a la página principal si estamos en la raíz
  if (location.pathname === '/TuPIeza3D/') {
    navigate('/TuPIeza3D/');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <TopSales />
      <Products />
    </div>
  );
}

export default MainPage;

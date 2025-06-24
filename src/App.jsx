import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hogar from './pages/Hogar';
import JuegosJuguetes from './pages/JuegosJuguetes';
import Gadgets from './pages/Gadgets';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoriesMenu from './components/CategoriesMenu';
import Auth0Login from './components/Auth0Login';
import Auth0ProviderWithHistory from './components/Auth0Provider';
import Profile from './components/Profile';
import Cesta from './components/Cesta';
import About from './components/About';
import Contacto from './components/Contacto';
import SearchResults from './pages/SearchResults';
import Favoritos from './pages/Favoritos';
import Pedido from './pages/Pedido';
import { StoreProvider } from './context/StoreContext';
import MainPage from './pages/MainPage';
import './App.css';

function App() {
  return (
    <StoreProvider>
      <Auth0ProviderWithHistory>
        <Router 
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          basename="/TuPieza3D/"
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <CategoriesMenu />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/categorias/hogar" element={<Hogar />} />
                <Route path="/categorias/juegos-juguetes" element={<JuegosJuguetes />} />
                <Route path="/categorias/gadgets" element={<Gadgets />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contacto />} />
                <Route path="/login" element={<Auth0Login />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/cesta" element={<Cesta />} />
                <Route path="/pedido" element={<Pedido />} />
                <Route path="/favoritos" element={<Favoritos />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </Auth0ProviderWithHistory>
    </StoreProvider>
  );
}

export default App;

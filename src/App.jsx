import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Hogar from './pages/Hogar';
import JuegosJuguetes from './pages/JuegosJuguetes';
import Gadgets from './pages/Gadgets';
import CategoryPage from './components/CategoryPage';
import Header from './components/Header';
import Footer from './components/Footer';
import TopSales from './components/TopSales';
import Products from './components/Products';
import CategoriesMenu from './components/CategoriesMenu';
import Auth0Login from './components/Auth0Login';
import Auth0ProviderWithHistory from './components/Auth0Provider';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Favorites from './components/Favorites';
import About from './components/About';
import Contacto from './components/Contacto';
import { StoreProvider } from './context/StoreContext';
import './App.css';

function App() {
  return (
    <StoreProvider>
      <Auth0ProviderWithHistory>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <CategoriesMenu />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <TopSales />
                    <Products />
                  </div>
                } />
                <Route path="/categorias/hogar" element={<Hogar />} />
                <Route path="/categorias/juegos-juguetes" element={<JuegosJuguetes />} />
                <Route path="/categorias/gadgets" element={<Gadgets />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contacto />} />
                <Route path="/login" element={<Auth0Login />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/cesta" element={<Cart />} />
                <Route path="/favoritos" element={<Favorites />} />
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

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hogar from './pages/Hogar';
import JuegosJuguetes from './pages/JuegosJuguetes';
import Gadgets from './pages/Gadgets';
import CategoryPage from './components/CategoryPage';
import Header from './components/Header';
import Footer from './components/Footer';
import TopSales from './components/TopSales';
import Products from './components/Products';
import CategoriesMenu from './components/CategoriesMenu';
import './App.css';

function App() {
  return (
    <Router>
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

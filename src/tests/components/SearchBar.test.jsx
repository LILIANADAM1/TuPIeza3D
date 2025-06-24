import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';

// Mock del hook useNavigate
const mockNavigate = vi.fn();
const mockLocation = { pathname: '/' };

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

// Componente wrapper para proveer el router context
const SearchBarWrapper = () => (
  <BrowserRouter>
    <SearchBar />
  </BrowserRouter>
);

describe('SearchBar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleSearch function', () => {
    it('should navigate to search page with encoded query when handleSearch is called', () => {
      render(<SearchBarWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Buscar productos...');
      
      // Escribir una consulta de búsqueda para habilitar el botón
      const searchQuery = 'test query';
      fireEvent.change(searchInput, { target: { value: searchQuery } });
      
      // Obtener el botón de búsqueda (el azul con lupa)
      const buttons = screen.getAllByRole('button');
      const searchButton = buttons.find(button => 
        button.className.includes('bg-blue-500')
      );
      
      // Hacer clic en el botón de búsqueda
      fireEvent.click(searchButton);

      // Verificar que navigate fue llamado con la URL correcta
      expect(mockNavigate).toHaveBeenCalledWith(
        `/search?q=${encodeURIComponent(searchQuery)}`
      );
    });

    it('should handle special characters in search query correctly', () => {
      render(<SearchBarWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Buscar productos...');

      // Consulta con caracteres especiales
      const specialQuery = 'test & search @#$%';
      fireEvent.change(searchInput, { target: { value: specialQuery } });
      
      // Obtener el botón de búsqueda (el azul con lupa)
      const buttons = screen.getAllByRole('button');
      const searchButton = buttons.find(button => 
        button.className.includes('bg-blue-500')
      );
      
      fireEvent.click(searchButton);

      // Verificar que los caracteres especiales se codifican correctamente
      expect(mockNavigate).toHaveBeenCalledWith(
        `/search?q=${encodeURIComponent(specialQuery)}`
      );
    });

    it('should navigate when Enter key is pressed with valid query', () => {
      render(<SearchBarWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Buscar productos...');

      const searchQuery = 'keyboard search';
      fireEvent.change(searchInput, { target: { value: searchQuery } });
      
      // Presionar Enter
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

      expect(mockNavigate).toHaveBeenCalledWith(
        `/search?q=${encodeURIComponent(searchQuery)}`
      );
    });

    it('should not navigate when Enter key is pressed with empty query', () => {
      render(<SearchBarWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Buscar productos...');

      // Presionar Enter sin escribir nada
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should not navigate when search button is clicked with empty query', () => {
      render(<SearchBarWrapper />);
      
      // El botón debe estar deshabilitado cuando no hay query
      const buttons = screen.getAllByRole('button');
      const searchButton = buttons.find(button => 
        button.className.includes('bg-blue-500')
      );
      expect(searchButton).toBeDisabled();
      
      fireEvent.click(searchButton);

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should navigate automatically after 300ms delay when typing', async () => {
      vi.useFakeTimers();
      
      render(<SearchBarWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Buscar productos...');

      const searchQuery = 'auto search';
      fireEvent.change(searchInput, { target: { value: searchQuery } });

      // No debe navegar inmediatamente
      expect(mockNavigate).not.toHaveBeenCalled();

      // Avanzar el timer 300ms
      vi.advanceTimersByTime(300);

      // Esperar a que se ejecute el efecto
      expect(mockNavigate).toHaveBeenCalledWith(
        `/search?q=${encodeURIComponent(searchQuery)}`
      );

      vi.useRealTimers();
    });

    it('should cancel previous timer when typing quickly', async () => {
      vi.useFakeTimers();
      
      render(<SearchBarWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Buscar productos...');

      // Escribir primera consulta
      fireEvent.change(searchInput, { target: { value: 'first' } });
      
      // Avanzar 200ms (menos de 300)
      vi.advanceTimersByTime(200);
      
      // Escribir segunda consulta
      fireEvent.change(searchInput, { target: { value: 'second' } });
      
      // Avanzar otros 200ms (total 400ms desde la primera, 200ms desde la segunda)
      vi.advanceTimersByTime(200);
      
      // No debe haber navegado aún
      expect(mockNavigate).not.toHaveBeenCalled();
      
      // Avanzar 100ms más (300ms desde la segunda consulta)
      vi.advanceTimersByTime(100);

      expect(mockNavigate).toHaveBeenCalledWith('/search?q=second');

      vi.useRealTimers();
    });

    it('should clear search and navigate to home when clear button is clicked', () => {
      render(<SearchBarWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Buscar productos...');

      // Escribir algo para que aparezca el botón de limpiar
      fireEvent.change(searchInput, { target: { value: 'test query' } });
      
      // Buscar el botón X (el que tiene posición absoluta)
      const buttons = screen.getAllByRole('button');
      const clearButton = buttons.find(button => 
        button.className.includes('absolute')
      );
      
      fireEvent.click(clearButton);

      // Verificar que el input se limpia
      expect(searchInput.value).toBe('');
      
      // Verificar que navega a home
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should clear search input when navigating away from search page', () => {
      // Simular estar en la página de búsqueda inicialmente
      mockLocation.pathname = '/search';
      
      const { rerender } = render(<SearchBarWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Buscar productos...');
      fireEvent.change(searchInput, { target: { value: 'test query' } });

      // Simular cambio de ruta
      mockLocation.pathname = '/';
      rerender(<SearchBarWrapper />);

      // El input debería estar vacío después del cambio de ruta
      expect(searchInput.value).toBe('');
    });
  });
});

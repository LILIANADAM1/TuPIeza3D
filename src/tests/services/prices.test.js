import { describe, it, expect, vi } from 'vitest';
import { getProductPrice } from '../../services/prices';

// Mock del archivo de configuración
vi.mock('../../data/products-config.json', () => ({
  default: {
    categories: {
      hogar: {
        name: 'Hogar',
        keywords: ['sliding', 'balcony', 'door', 'drying', 'tray', 'cassette', 'tape', 'waffle'],
        priceRange: {
          min: 19.99,
          max: 49.99,
          step: 5
        }
      },
      gadgets: {
        name: 'Gadgets',
        keywords: ['servo', 'horn', 'filadryer', 'sp2', 'charging', 'adapter'],
        priceRange: {
          min: 29.99,
          max: 79.99,
          step: 10
        }
      },
      juegos: {
        name: 'Juegos y juguetes',
        keywords: ['keychain', 'figure', 'dinosaur', 'robot', 'duck'],
        priceRange: {
          min: 14.99,
          max: 34.99,
          step: 3
        }
      }
    },
    defaultCategory: {
      name: 'General',
      priceRange: {
        min: 10.0,
        max: 20.0,
        step: 2
      }
    },
    products: {}
  }
}));

describe('getProductPrice function', () => {
  // Mock console.log para evitar ruido en los tests
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Category matching by keywords', () => {
    it('should match hogar category for products with hogar keywords', () => {
      const product = { name: 'Sliding Door Handle' };
      const price = getProductPrice(product);
      
      // Nombre tiene 19 caracteres, increment = Math.floor(19/5) = 3
      // Precio = 19.99 + (3 * 5) = 34.99
      expect(price).toBe('34.99');
    });

    it('should match gadgets category for products with gadgets keywords', () => {
      const product = { name: 'Servo Motor' };
      const price = getProductPrice(product);
      
      // Nombre tiene 11 caracteres, increment = Math.floor(11/5) = 2
      // Precio = 29.99 + (2 * 10) = 49.99
      expect(price).toBe('49.99');
    });

    it('should match juegos category for products with juegos keywords', () => {
      const product = { name: 'Dinosaur Figure' };
      const price = getProductPrice(product);
      
      // Nombre "Dinosaur Figure" tiene 15 caracteres (sin contar el espacio), increment = Math.floor(15/5) = 3
      // Precio = 14.99 + (3 * 3) = 23.99
      expect(price).toBe('23.99');
    });

    it('should be case insensitive when matching keywords', () => {
      const product = { name: 'SLIDING DOOR MECHANISM' };
      const price = getProductPrice(product);
      
      // Debe coincidir con categoría hogar a pesar de estar en mayúsculas
      // Nombre tiene 22 caracteres, increment = Math.floor(22/5) = 4
      // Precio = 19.99 + (4 * 5) = 39.99
      expect(price).toBe('39.99');
    });
  });

  describe('Default category behavior', () => {
    it('should use default category for products without matching keywords', () => {
      const product = { name: 'Generic Product' };
      const price = getProductPrice(product);
      
      // Nombre tiene 15 caracteres, increment = Math.floor(15/5) = 3
      // Precio = 10.0 + (3 * 2) = 16.0
      expect(price).toBe('16.00');
    });

    it('should handle products with empty name', () => {
      const product = { name: '' };
      const price = getProductPrice(product);
      
      // Nombre tiene 0 caracteres, increment = Math.floor(0/5) = 0
      // Precio = 10.0 + (0 * 2) = 10.0
      expect(price).toBe('10.00');
    });

    it('should handle products without name property', () => {
      const product = {};
      const price = getProductPrice(product);
      
      // Sin nombre, se trata como cadena vacía
      // Precio = 10.0 + (0 * 2) = 10.0
      expect(price).toBe('10.00');
    });

    it('should handle null product name', () => {
      const product = { name: null };
      const price = getProductPrice(product);
      
      // name null se convierte a cadena vacía
      // Precio = 10.0 + (0 * 2) = 10.0
      expect(price).toBe('10.00');
    });
  });

  describe('Price calculation logic', () => {
    it('should calculate price based on name length correctly', () => {
      // Producto corto (5 caracteres)
      const shortProduct = { name: 'door' }; // 4 chars
      const shortPrice = getProductPrice(shortProduct);
      // increment = Math.floor(4/5) = 0
      // Precio = 19.99 + (0 * 5) = 19.99
      expect(shortPrice).toBe('19.99');

      // Producto mediano (10 caracteres)
      const mediumProduct = { name: 'sliding door' }; // 12 chars
      const mediumPrice = getProductPrice(mediumProduct);
      // increment = Math.floor(12/5) = 2
      // Precio = 19.99 + (2 * 5) = 29.99
      expect(mediumPrice).toBe('29.99');

      // Producto largo (20 caracteres)
      const longProduct = { name: 'sliding balcony door handle' }; // 26 chars
      const longPrice = getProductPrice(longProduct);
      // increment = Math.floor(26/5) = 5
      // Precio = 19.99 + (5 * 5) = 44.99
      expect(longPrice).toBe('44.99');
    });

    it('should not exceed maximum price for category', () => {
      // Producto extremadamente largo que podría exceder el máximo
      const longProduct = { name: 'sliding balcony door with multiple accessories and features' }; // 62 chars
      const price = getProductPrice(longProduct);
      
      // increment = Math.floor(62/5) = 12
      // Precio calculado = 19.99 + (12 * 5) = 79.99
      // Pero el máximo para hogar es 49.99, así que debe ser 49.99
      expect(price).toBe('49.99');
    });

    it('should handle different price ranges correctly', () => {
      // Test con categoría gadgets que tiene rango diferente
      const gadgetProduct = { name: 'servo' }; // 5 chars
      const gadgetPrice = getProductPrice(gadgetProduct);
      // increment = Math.floor(5/5) = 1
      // Precio = 29.99 + (1 * 10) = 39.99
      expect(gadgetPrice).toBe('39.99');

      // Test con categoría juegos que tiene step menor
      const toyProduct = { name: 'duck' }; // 4 chars
      const toyPrice = getProductPrice(toyProduct);
      // increment = Math.floor(4/5) = 0
      // Precio = 14.99 + (0 * 3) = 14.99
      expect(toyPrice).toBe('14.99');
    });
  });

  describe('Return value format', () => {
    it('should return price as string with 2 decimal places', () => {
      const product = { name: 'door' };
      const price = getProductPrice(product);
      
      expect(typeof price).toBe('string');
      expect(price).toMatch(/^\d+\.\d{2}$/);
    });

    it('should handle prices that result in whole numbers', () => {
      // Crear un escenario que resulte en un número entero
      const product = { name: 'test' }; // 4 chars, categoría default
      const price = getProductPrice(product);
      // increment = Math.floor(4/5) = 0
      // Precio = 10.0 + (0 * 2) = 10.0
      expect(price).toBe('10.00');
    });
  });

  describe('Keyword matching priority', () => {
    it('should match the first category found when multiple keywords could match', () => {
      // Como el código hace break en el primer match, el orden en el objeto importa
      const product = { name: 'sliding servo mechanism' }; // Contiene keywords de hogar y gadgets
      const price = getProductPrice(product);
      
      // Debería coincidir con la primera categoría encontrada
      // En este caso, probablemente hogar (sliding) ya que aparece primero en el nombre
      const expectedPrice = parseFloat(price);
      expect(expectedPrice).toBeGreaterThanOrEqual(19.99);
      expect(expectedPrice).toBeLessThanOrEqual(49.99);
    });
  });

  describe('Edge cases', () => {
    it('should handle very long product names', () => {
      const veryLongName = 'a'.repeat(100); // 100 caracteres
      const product = { name: veryLongName };
      const price = getProductPrice(product);
      
      // increment = Math.floor(100/5) = 20
      // Para categoría default: 10.0 + (20 * 2) = 50.0
      // Pero máximo es 20.0, así que debe ser 20.0
      expect(price).toBe('20.00');
    });

    it('should handle special characters in product name', () => {
      const product = { name: 'sliding-door_handle@home.com' };
      const price = getProductPrice(product);
      
      // Debe funcionar normalmente y coincidir con hogar por "sliding" y "door"
      expect(parseFloat(price)).toBeGreaterThanOrEqual(19.99);
      expect(parseFloat(price)).toBeLessThanOrEqual(49.99);
    });

    it('should handle unicode characters', () => {
      const product = { name: 'puerta deslizante' }; // No contiene keywords en inglés
      const price = getProductPrice(product);
      
      // Debería usar categoría default ya que no coincide con keywords
      expect(parseFloat(price)).toBeGreaterThanOrEqual(10.0);
      expect(parseFloat(price)).toBeLessThanOrEqual(20.0);
    });
  });
});

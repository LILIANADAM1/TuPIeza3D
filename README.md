# TuPieza3D - E-commerce de Productos 3D

## 🚀 Tecnologías Utilizadas

- **Framework**: React
- **Tooling**: Vite
- **Estado**: Zustand
- **HTTP Client**: Axios
- **Estilos**: Tailwind CSS
- **Testing**: Vitest + Testing Library
- **Form Submission**: FormSubmit.co
- **Autenticación**: Auth0 OAuth

## 📋 Requisitos del Proyecto

### 🎯 Competencias

1. **Frontend Moderno**
   - Interfaz web adaptable con React
   - Sistema de construcción profesional: Vite
   - Gestión del estado con Zustand
   - Estilos aislados con Tailwind
   - Testing unitario con Vitest y Testing Library

2. **API y Servicios**
   - Integración con API externa (Thingiverse)
   - Formulario de contacto con FormSubmit.co
   - Sistema de autenticación OAuth con Auth0

## 🛍️ Funcionalidades Implementadas

### 1. Sistema de Comercio
- Catálogo de productos 3D
- Sistema de favoritos
- Carrito de compras
- Categorización de productos
- Búsqueda de productos
- Sistema de categorías

### 2. Autenticación
- Login/Register con Auth0
- Protección de rutas privadas
- Perfil de usuario
- Gestión de sesiones

### 3. Interfaz de Usuario
- Diseño responsive
- Navegación intuitiva
- Carrusel de productos populares
- Grid de productos
- Tarjetas de producto
### 4. Formulario (IMPLEMENTADO)
- Formulario de contacto con validación
- Integración con FormSubmit.co
- Manejo de estados (enviando, enviado, errores)
- Diseño responsive
- Animaciones de feedback

## 🛠️ Testing

### Tests Unitarios
- **Framework**: Vitest + Testing Library
- **Componentes testeados**: SearchBar, ProductCard, Contacto
- **Cobertura**: Funciones críticas del frontend

### Interfaz de Testing
- **Vitest UI**: [http://localhost:51204/__vitest__/](http://localhost:51204/__vitest__/)
- Ejecutar tests: `npm test`
- Interfaz visual: `npm run test:ui`

### Comandos de Testing
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Abrir interfaz visual de tests
npm run test:ui
```

## 🛠️ Características Pendientes

### 1. Testing Avanzado
- Pruebas de integración con Playwright
- Mock Service Worker (MSW.js)
- Aumento de cobertura de tests

### 2. Mejoras Técnicas
- Implementación de MSW.js para mock API
- Optimización de performance
- Implementación de lazy loading
- Mejora de accesibilidad

## 📦 Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── Header.jsx    # Navegación
│   ├── Footer.jsx    # Pie de página
│   ├── ProductCard.jsx # Tarjetas de producto
│   └── ...           # Otros componentes
├── pages/            # Páginas principales
│   ├── Home.jsx      # Página principal
│   ├── Products.jsx  # Catálogo de productos
│   ├── Cart.jsx      # Carrito de compras
│   └── ...           # Otras páginas
├── context/          # Gestión de estado
│   └── StoreContext.jsx # Estado global
├── services/         # Servicios y APIs
│   └── api.js        # Llamadas a la API
├── utils/            # Utilidades
└── tests/           # Pruebas
    ├── components/   # Tests de componentes
    ├── services/     # Tests de servicios
    └── setup.js      # Configuración de tests
```

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm test

# Abrir interfaz de tests
npm run test:ui
```

## 🌐 Despliegue

La aplicación está desplegada en GitHub Pages:

- **URL de producción**: https://lilianadam1.github.io/TuPieza3D/
- **Plataforma**: GitHub Pages
- **Rama**: main
- **Proceso de despliegue**: Automático mediante GitHub Actions
- **Base URL**: /TuPieza3D/

## 🔐 Seguridad

- Autenticación segura con Auth0
- Protección de rutas privadas
- Manejo seguro de tokens
- Validación de datos


## 🤝 Contribuciones

¡Contribuciones son bienvenidas! Por favor, crea un issue o pull request para cualquier mejora o corrección.

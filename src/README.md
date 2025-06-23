# TuPIeza3D - E-commerce de Productos 3D

## 🚀 Tecnologías Utilizadas

- **Framework**: React
- **Tooling**: Vite
- **Estado**: Zustand
- **HTTP Client**: Axios
- **Estilos**: Tailwind CSS
- **Testing**: Testing Library + Playwright
- **Form Submission**: FormSubmit.co
- **Autenticación**: Auth0 OAuth

## 📋 Requisitos del Proyecto

### 🎯 Competencias

1. **Frontend Moderno**
   - Interfaz web adaptable con React
   - Sistema de construcción profesional: Vite
   - Gestión del estado con Zustand
   - Estilos aislados con Tailwind
   - Testing con Testing Library y Playwright

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

## 🛠️ Características Pendientes

### 1. Testing
- Pruebas unitarias con Jest
- Pruebas de componentes con Testing Library
- Pruebas de integración con Playwright
- Mock Service Worker (MSW.js)

### 2. Formulario (IMPLEMENTADO)
- Formulario de contacto con validación
- Integración con FormSubmit.co
- Manejo de estados (enviando, enviado, errores)
- Diseño responsive
- Animaciones de feedback

### 3. Mejoras Técnicas
- Implementación de MSW.js para mock API
- Optimización de performance
- Implementación de lazy loading
- Mejora de accesibilidad
- Implementación de testing unitario y de componentes
- Pruebas de integración con Playwright
- Mock Service Worker (MSW.js) para pruebas

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
```

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🌐 Despliegue

La aplicación está desplegada en GitHub Pages:

- **URL de producción**: https://lilianadam1.github.io/TuPIeza3D/
- **Plataforma**: GitHub Pages
- **Rama**: main
- **Proceso de despliegue**: Automático mediante GitHub Actions
- **Base URL**: /TuPIeza3D/

## 🔐 Seguridad

- Autenticación segura con Auth0
- Protección de rutas privadas
- Manejo seguro de tokens
- Validación de datos


## 🤝 Contribuciones

¡Contribuciones son bienvenidas! Por favor, crea un issue o pull request para cualquier mejora o corrección.

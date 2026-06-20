# Prueba FS - Frontend (Vue 3 + Vite)

Esta es la interfaz de usuario para el sistema de gestión de Productos y Categorías.

## Tecnologías Utilizadas
- Vue 3 (Composition API)
- Vite
- Pinia (Manejo de estados)
- Vue Router (Ruteo)
- Tailwind CSS (Estilos y diseño premium)
- Axios (Peticiones HTTP con interceptores para manejo global de errores y estados de carga)

## Requisitos Previos
- Node.js 18+
- NPM

## Instalación y Configuración Local

1. Instalar dependencias de NPM:
   ```bash
   npm install
   ```

2. Configurar la URL de la API:
   *La URL de la API (Axios) está configurada por defecto a `http://localhost:8000/api` en `src/services/api.js`. Si tu backend corre en otro puerto, asegúrate de cambiarlo allí.*

3. Levantar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible típicamente en `http://localhost:5173`*

## Manejo de Errores y Estados
- Se ha implementado un manejador global en Axios que atrapa errores de red y de validación (4xx y 5xx), mostrando automáticamente notificaciones visuales (Toasts) al usuario.
- Antes de cada petición HTTP se dispara un "Loader" global (Spinner estilo Glassmorphism) que se detiene cuando la respuesta se resuelve o falla.

## Docker (Opcional)
Se incluye un archivo `docker-compose.yml` en este proyecto para levantar el frontend.

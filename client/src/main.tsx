import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import './index.css';

// Punto de entrada del cliente React.
// Monta el arbol de rutas (src/app/router.ts) dentro del nodo #root definido en index.html.
// StrictMode ayuda a detectar efectos secundarios no idempotentes durante el desarrollo.
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontro el elemento #root en index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
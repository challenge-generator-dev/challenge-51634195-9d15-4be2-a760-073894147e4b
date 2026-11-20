import { createBrowserRouter } from 'react-router-dom';
import { OrdersPage } from '../features/orders/pages/OrdersPage';

// Arbol de rutas de la aplicacion.
// La capa app solo define el enrutado; la logica de cada pantalla vive en src/features.
// La ruta raiz muestra el listado de ordenes, que es el flujo principal del reto.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <OrdersPage />,
  },
  {
    path: '*',
    element: (
      <div className="not-found">
        <h1>Pagina no encontrada</h1>
        <p>La ruta solicitada no existe en la aplicacion.</p>
      </div>
    ),
  },
]);
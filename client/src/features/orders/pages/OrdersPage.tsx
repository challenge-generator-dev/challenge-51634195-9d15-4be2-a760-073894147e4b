import { useEffect } from 'react';
import { OrderForm } from '../components/OrderForm';
import { useOrderState } from '../hooks/use-order-state';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order.model';
import { CreateOrderRequest } from '../../../shared/models/create-order-request.model';

const orderService = new OrderService();

export function OrdersPage() {
  const {
    orders,
    loading,
    error,
    setOrders,
    addOrder,
    updateOrderInState,
    removeOrder,
    setLoading,
    setError,
  } = useOrderState();

  useEffect(() => {
    let cancelled = false;

    const loadOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await orderService.listOrders();
        if (!cancelled) {
          setOrders(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Error al cargar órdenes'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, [setOrders, setLoading, setError]);

  const handleCreateOrder = async (request: CreateOrderRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newOrder = await orderService.createOrder(request);
      addOrder(newOrder);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al crear orden'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await orderService.updateOrder(orderId, status);
      updateOrderInState(updated);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al actualizar orden'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      await orderService.deleteOrder(orderId);
      removeOrder(orderId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al eliminar orden'));
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (order: Order, newStatus: string) => {
    handleUpdateStatus(order.id, newStatus);
  };

  return (
    <div className="orders-page">
      <h1>Gestión de Órdenes</h1>

      {error && (
        <div className="error-message" role="alert">
          {error.message}
        </div>
      )}

      <section className="orders-form-section">
        <h2>Crear Nueva Orden</h2>
        <OrderForm onSubmit={handleCreateOrder} />
      </section>

      <section className="orders-list-section">
        <h2>Órdenes Existentes</h2>

        {loading && <p>Cargando órdenes...</p>}

        {!loading && orders.length === 0 && (
          <p>No hay órdenes disponibles</p>
        )}

        {!loading && orders.length > 0 && (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <div className="order-info">
                  <strong>ID:</strong> {order.id}<br />
                  <strong>Cliente:</strong> {order.customerId}<br />
                  <strong>Estado:</strong> {order.status}<br />
                  <strong>Items:</strong> {order.items.length}<br />
                  <strong>Creado:</strong> {new Date(order.createdAt).toLocaleString()}
                </div>
                <div className="order-actions">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                    aria-label={`Cambiar estado de orden ${order.id}`}
                  >
                    <option value="pending">Pendiente</option>
                    <option value="processing">Procesando</option>
                    <option value="completed">Completado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    aria-label={`Eliminar orden ${order.id}`}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
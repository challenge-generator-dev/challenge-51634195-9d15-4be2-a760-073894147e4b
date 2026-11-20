import { describe, it, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse, delay } from 'msw';
import { OrderService } from '../shared/services/order.service';
import { Order, OrderItem } from '../shared/models/order.model';
import { CreateOrderRequest } from '../shared/models/create-order-request.model';

// Base de datos en memoria que simula el backend de ordenes.
// Se reinicia antes de cada prueba para que las pruebas sean independientes.
const seedOrders: Order[] = [
  {
    id: 'order-1',
    customerId: 'customer-1',
    items: [{ productId: 'product-1', quantity: 2, price: 29.99 }],
    status: 'pending',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'order-2',
    customerId: 'customer-2',
    items: [{ productId: 'product-2', quantity: 1, price: 49.99 }],
    status: 'completed',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-15T09:00:00Z'
  }
];

const VALID_STATUSES = ['pending', 'completed', 'shipped'];

let store: Order[] = [];

function resetStore(): void {
  store = seedOrders.map(order => ({
    ...order,
    items: order.items.map(item => ({ ...item }))
  }));
}

const server = setupServer(
  http.get('http://localhost:3000/orders', async () => {
    await delay(50);
    return HttpResponse.json(store);
  }),

  http.get('http://localhost:3000/orders/:id', async ({ params }) => {
    await delay(50);
    const id = String(params.id);
    const order = store.find(o => o.id === id);
    if (!order) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(order);
  }),

  http.post('http://localhost:3000/orders', async ({ request }) => {
    await delay(50);
    const body = (await request.json()) as { customerId: string; items: OrderItem[] };

    if (!body.customerId || body.customerId.trim() === '') {
      return HttpResponse.json({ message: 'customerId es obligatorio' }, { status: 400 });
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return HttpResponse.json({ message: 'La orden debe tener al menos un item' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const newOrder: Order = {
      id: 'order-new',
      customerId: body.customerId,
      items: body.items,
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };
    store.push(newOrder);
    return HttpResponse.json(newOrder, { status: 201 });
  }),

  http.put('http://localhost:3000/orders/:id', async ({ params, request }) => {
    await delay(50);
    const id = String(params.id);
    const body = (await request.json()) as { status: string };

    const index = store.findIndex(o => o.id === id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    if (!VALID_STATUSES.includes(body.status)) {
      return HttpResponse.json({ message: 'Estado invalido' }, { status: 400 });
    }

    const updatedOrder: Order = {
      ...store[index],
      status: body.status,
      updatedAt: new Date().toISOString()
    };
    store[index] = updatedOrder;
    return HttpResponse.json(updatedOrder);
  }),

  http.delete('http://localhost:3000/orders/:id', async ({ params }) => {
    await delay(50);
    const id = String(params.id);
    const index = store.findIndex(o => o.id === id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    store.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  })
);

describe('OrderAcceptanceTests - E2E', () => {
  let orderService: OrderService;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  beforeEach(() => {
    resetStore();
    orderService = new OrderService();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('Creación de órdenes', () => {
    it('debe crear una orden exitosamente con datos válidos', async () => {
      const createRequest: CreateOrderRequest = {
        customerId: 'customer-new',
        items: [{ productId: 'product-3', quantity: 3, price: 19.99 }]
      };

      const result = await orderService.createOrder(createRequest);

      expect(result).toBeDefined();
      expect(result.id).toBe('order-new');
      expect(result.customerId).toBe(createRequest.customerId);
      expect(result.items).toHaveLength(1);
      expect(result.items[0].productId).toBe('product-3');
      expect(result.status).toBe('pending');
    });

    it('debe rechazar creación con customerId vacío', async () => {
      const invalidRequest: CreateOrderRequest = {
        customerId: '',
        items: [{ productId: 'product-1', quantity: 1, price: 10 }]
      };

      await expect(orderService.createOrder(invalidRequest)).rejects.toThrow();
    });

    it('debe rechazar creación sin items', async () => {
      const invalidRequest: CreateOrderRequest = {
        customerId: 'customer-1',
        items: []
      };

      await expect(orderService.createOrder(invalidRequest)).rejects.toThrow();
    });
  });

  describe('Listado de órdenes', () => {
    it('debe obtener todas las órdenes', async () => {
      const orders = await orderService.listOrders();

      expect(orders).toBeDefined();
      expect(orders).toHaveLength(2);
      expect(orders[0].id).toBe('order-1');
      expect(orders[1].id).toBe('order-2');
    });

    it('debe retornar array vacío cuando no hay órdenes', async () => {
      server.use(
        http.get('http://localhost:3000/orders', () => {
          return HttpResponse.json([]);
        })
      );

      const orders = await orderService.listOrders();

      expect(orders).toEqual([]);
    });
  });

  describe('Obtención de orden por ID', () => {
    it('debe obtener una orden específica por su ID', async () => {
      const order = await orderService.getOrder('order-1');

      expect(order).toBeDefined();
      expect(order.id).toBe('order-1');
      expect(order.customerId).toBe('customer-1');
      expect(order.items).toHaveLength(1);
    });

    it('debe lanzar error cuando la orden no existe', async () => {
      await expect(orderService.getOrder('non-existent')).rejects.toThrow();
    });
  });

  describe('Actualización de órdenes', () => {
    it('debe actualizar el estado de una orden existente', async () => {
      const updatedOrder = await orderService.updateOrder('order-1', 'completed');

      expect(updatedOrder).toBeDefined();
      expect(updatedOrder.id).toBe('order-1');
      expect(updatedOrder.status).toBe('completed');
    });

    it('debe rechazar actualización de orden inexistente', async () => {
      await expect(orderService.updateOrder('non-existent', 'completed')).rejects.toThrow();
    });

    it('debe rechazar estado inválido', async () => {
      await expect(orderService.updateOrder('order-1', 'invalid-status')).rejects.toThrow();
    });
  });

  describe('Eliminación de órdenes', () => {
    it('debe eliminar una orden exitosamente', async () => {
      await expect(orderService.deleteOrder('order-1')).resolves.toBeUndefined();
    });

    it('debe rechazar eliminación de orden inexistente', async () => {
      await expect(orderService.deleteOrder('non-existent')).rejects.toThrow();
    });
  });

  describe('Integración completa del flujo CRUD', () => {
    it('debe ejecutar el flujo completo: crear, listar, obtener, actualizar, eliminar', async () => {
      const createRequest: CreateOrderRequest = {
        customerId: 'customer-integration',
        items: [{ productId: 'product-integration', quantity: 1, price: 99.99 }]
      };

      const createdOrder = await orderService.createOrder(createRequest);
      expect(createdOrder.id).toBeDefined();

      const orders = await orderService.listOrders();
      expect(orders.length).toBeGreaterThan(0);

      const fetchedOrder = await orderService.getOrder(createdOrder.id);
      expect(fetchedOrder.id).toBe(createdOrder.id);

      const updatedOrder = await orderService.updateOrder(createdOrder.id, 'shipped');
      expect(updatedOrder.status).toBe('shipped');

      await orderService.deleteOrder(createdOrder.id);

      await expect(orderService.getOrder(createdOrder.id)).rejects.toThrow();
    });
  });
});
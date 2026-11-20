import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { OrderService } from '../../shared/services/order.service';
import { Order, OrderItem } from '../../shared/models/order.model';

interface TestScenario<T> {
  name: string;
  setup: () => void;
  execute: () => Promise<T>;
  assert: (result: T) => void;
}

export class OrderAcceptanceTestsImpl {
  private orderService: OrderService;
  private testResults: Array<{ scenario: string; passed: boolean; error?: string }> = [];

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  async runAllTests(): Promise<void> {
    console.log('Iniciando pruebas de aceptación de órdenes...');
    
    await this.testCreateOrder();
    await this.testListOrders();
    await this.testGetOrder();
    await this.testUpdateOrder();
    await this.testDeleteOrder();
    await this.testFullCrudFlow();
    
    this.printResults();
  }

  private async testCreateOrder(): Promise<void> {
    const scenarios: Array<TestScenario<Order>> = [
      {
        name: 'Crear orden con datos válidos',
        setup: () => {},
        execute: async () => {
          return await this.orderService.createOrder({
            customerId: 'customer-test-1',
            items: [{ productId: 'prod-1', quantity: 2, price: 25.50 }]
          });
        },
        assert: (order) => {
          expect(order.customerId).toBe('customer-test-1');
          expect(order.items).toHaveLength(1);
          expect(order.status).toBe('pending');
        }
      },
      {
        name: 'Crear orden con múltiples items',
        setup: () => {},
        execute: async () => {
          return await this.orderService.createOrder({
            customerId: 'customer-test-2',
            items: [
              { productId: 'prod-1', quantity: 1, price: 100 },
              { productId: 'prod-2', quantity: 3, price: 15 }
            ]
          });
        },
        assert: (order) => {
          expect(order.items).toHaveLength(2);
          expect(order.items[0].price).toBe(100);
          expect(order.items[1].quantity).toBe(3);
        }
      }
    ];

    await this.runScenarios('Crear Orden', scenarios);
  }

  private async testListOrders(): Promise<void> {
    const scenarios: Array<TestScenario<Order[]>> = [
      {
        name: 'Listar todas las órdenes',
        setup: () => {},
        execute: async () => {
          return await this.orderService.listOrders();
        },
        assert: (orders) => {
          expect(Array.isArray(orders)).toBe(true);
          expect(orders.length).toBeGreaterThanOrEqual(0);
        }
      }
    ];

    await this.runScenarios('Listar Órdenes', scenarios);
  }

  private async testGetOrder(): Promise<void> {
    const scenarios: Array<TestScenario<Order>> = [
      {
        name: 'Obtener orden existente',
        setup: async () => {
          await this.orderService.createOrder({
            customerId: 'customer-get-test',
            items: [{ productId: 'prod-x', quantity: 1, price: 10 }]
          });
        },
        execute: async () => {
          return await this.orderService.getOrder('order-new');
        },
        assert: (order) => {
          expect(order).toBeDefined();
          expect(order.id).toBeDefined();
        }
      }
    ];

    await this.runScenarios('Obtener Orden', scenarios);
  }

  private async testUpdateOrder(): Promise<void> {
    const scenarios: Array<TestScenario<Order>> = [
      {
        name: 'Actualizar estado de orden a completed',
        setup: async () => {
          await this.orderService.createOrder({
            customerId: 'customer-update-test',
            items: [{ productId: 'prod-y', quantity: 1, price: 20 }]
          });
        },
        execute: async () => {
          return await this.orderService.updateOrder('order-new', 'completed');
        },
        assert: (order) => {
          expect(order.status).toBe('completed');
        }
      },
      {
        name: 'Actualizar estado de orden a cancelled',
        setup: async () => {
          await this.orderService.createOrder({
            customerId: 'customer-cancel-test',
            items: [{ productId: 'prod-z', quantity: 1, price: 30 }]
          });
        },
        execute: async () => {
          return await this.orderService.updateOrder('order-new', 'cancelled');
        },
        assert: (order) => {
          expect(order.status).toBe('cancelled');
        }
      }
    ];

    await this.runScenarios('Actualizar Orden', scenarios);
  }

  private async testDeleteOrder(): Promise<void> {
    const scenarios: Array<TestScenario<void>> = [
      {
        name: 'Eliminar orden existente',
        setup: async () => {
          await this.orderService.createOrder({
            customerId: 'customer-delete-test',
            items: [{ productId: 'prod-del', quantity: 1, price: 50 }]
          });
        },
        execute: async () => {
          await this.orderService.deleteOrder('order-new');
        },
        assert: () => {
          expect(true).toBe(true);
        }
      }
    ];

    await this.runScenarios('Eliminar Orden', scenarios);
  }

  private async testFullCrudFlow(): Promise<void> {
    const scenarios: Array<TestScenario<void>> = [
      {
        name: 'Flujo completo CRUD',
        setup: () => {},
        execute: async () => {
          const created = await this.orderService.createOrder({
            customerId: 'customer-flow',
            items: [{ productId: 'prod-flow', quantity: 1, price: 75 }]
          });
          
          const listed = await this.orderService.listOrders();
          expect(listed.length).toBeGreaterThan(0);
          
          const fetched = await this.orderService.getOrder(created.id);
          expect(fetched.id).toBe(created.id);
          
          const updated = await this.orderService.updateOrder(created.id, 'processing');
          expect(updated.status).toBe('processing');
          
          await this.orderService.deleteOrder(created.id);
        },
        assert: () => {
          expect(true).toBe(true);
        }
      }
    ];

    await this.runScenarios('Flujo CRUD Completo', scenarios);
  }

  private async runScenarios<T>(
    category: string,
    scenarios: Array<TestScenario<T>>
  ): Promise<void> {
    for (const scenario of scenarios) {
      try {
        scenario.setup();
        const result = await scenario.execute();
        scenario.assert(result);
        this.testResults.push({ scenario: `${category}: ${scenario.name}`, passed: true });
      } catch (error) {
        this.testResults.push({
          scenario: `${category}: ${scenario.name}`,
          passed: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        });
      }
    }
  }

  private printResults(): void {
    console.log('\n=== Resultados de Pruebas de Aceptación ===');
    
    const passed = this.testResults.filter(r => r.passed).length;
    const failed = this.testResults.filter(r => !r.passed).length;
    
    this.testResults.forEach(result => {
      const status = result.passed ? '✓' : '✗';
      console.log(`${status} ${result.scenario}`);
      if (result.error) {
        console.log(`  Error: ${result.error}`);
      }
    });
    
    console.log(`\nTotal: ${passed} pasadas, ${failed} fallidas`);
    
    if (failed > 0) {
      throw new Error(`${failed} prueba(s) de aceptación fallida(s)`);
    }
  }
}

export function createOrderAcceptanceTestRunner(): OrderAcceptanceTestsImpl {
  const orderService = new OrderService();
  return new OrderAcceptanceTestsImpl(orderService);
}
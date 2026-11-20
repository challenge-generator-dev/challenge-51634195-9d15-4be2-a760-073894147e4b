import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from './order-item.model';
import { Order, OrderStatus } from './order.model';

// Solicitud de creación de orden: valida los datos de entrada antes de convertirlos en una Order del dominio.
export class CreateOrderRequest {
  @IsString()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  constructor(customerId: string, items: OrderItem[]) {
    this.customerId = customerId;
    this.items = items;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (!this.customerId || this.customerId.trim() === '') {
      throw new Error('Customer ID cannot be empty');
    }
    if (!Array.isArray(this.items) || this.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    for (const item of this.items) {
      if (item.quantity <= 0) {
        throw new Error(`Quantity must be greater than zero for product ${item.productId}`);
      }
      if (item.price < 0) {
        throw new Error(`Price cannot be negative for product ${item.productId}`);
      }
    }
  }

  toOrder(id: string): Order {
    return new Order(
      id,
      this.customerId,
      this.items.map(item => new OrderItem(item.productId, item.quantity, item.price)),
      OrderStatus.PENDING
    );
  }
}
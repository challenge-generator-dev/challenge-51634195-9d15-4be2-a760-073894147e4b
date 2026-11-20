import { IsArray, IsDateString, IsEnum, IsString } from 'class-validator';
import { OrderItem } from './order-item.model';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export class Order {
  @IsString()
  id: string;

  @IsString()
  customerId: string;

  @IsArray()
  items: OrderItem[];

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  constructor(
    id: string,
    customerId: string,
    items: OrderItem[],
    status: OrderStatus = OrderStatus.PENDING,
    createdAt: string = new Date().toISOString(),
    updatedAt: string = new Date().toISOString()
  ) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (!this.id || this.id.trim() === '') {
      throw new Error('Order ID cannot be empty');
    }
    if (!this.customerId || this.customerId.trim() === '') {
      throw new Error('Customer ID cannot be empty');
    }
    if (this.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  updateStatus(newStatus: OrderStatus): void {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
      [OrderStatus.PROCESSING]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
      [OrderStatus.COMPLETED]: [],
      [OrderStatus.CANCELLED]: []
    };

    if (!validTransitions[this.status].includes(newStatus)) {
      throw new Error(`Invalid status transition from ${this.status} to ${newStatus}`);
    }
    this.status = newStatus;
    this.updatedAt = new Date().toISOString();
  }

  addItem(item: OrderItem): void {
    this.items.push(item);
    this.updatedAt = new Date().toISOString();
  }

  removeItem(productId: string): void {
    const index = this.items.findIndex(item => item.productId === productId);
    if (index === -1) {
      throw new Error(`Item with productId ${productId} not found`);
    }
    this.items.splice(index, 1);
    this.updatedAt = new Date().toISOString();
  }
}
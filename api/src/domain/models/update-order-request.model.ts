import { IsEnum } from 'class-validator';
import { OrderStatus } from './order.model';

export class UpdateOrderRequest {
  @IsEnum(OrderStatus)
  status: OrderStatus;

  constructor(status: OrderStatus) {
    this.status = status;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (!Object.values(OrderStatus).includes(this.status)) {
      throw new Error('Invalid order status');
    }
  }
}
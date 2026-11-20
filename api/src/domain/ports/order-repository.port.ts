import { Order } from '../models/order.model';
import { CreateOrderRequest } from '../models/create-order-request.model';
import { UpdateOrderRequest } from '../models/update-order-request.model';

export interface OrderRepository {
  create(order: CreateOrderRequest): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  update(id: string, updateRequest: UpdateOrderRequest): Promise<Order>;
  delete(id: string): Promise<void>;
}
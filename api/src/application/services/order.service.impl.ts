// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../../domain/models/order.model';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';
import { UpdateOrderRequest } from '../../domain/models/update-order-request.model';
import { OrderRepository } from '../../domain/ports/order-repository.port';
import { OrderItem } from '../../domain/models/order-item.model';

@Injectable()
export class OrderServiceImpl extends OrderService {
  constructor(private readonly repository: OrderRepository) {
    super(repository);
  }

  async create(order: CreateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async list(): Promise<Order[]> {
    throw new Error('TODO(reto): list');
  }

  async get(id: string): Promise<Order> {
    throw new Error('TODO(reto): get');
  }

  async update(id: string, order: UpdateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): update');
  }

  async delete(id: string): Promise<void> {
    throw new Error('TODO(reto): delete');
  }

  private generateOrderId(): string {
    throw new Error('TODO(reto): generateOrderId');
  }
}
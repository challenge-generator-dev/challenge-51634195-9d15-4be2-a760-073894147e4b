// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Inject } from '@nestjs/common';
import { OrderRepository } from '../../domain/ports/order-repository.port';
import { Order } from '../../domain/models/order.model';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';
import { UpdateOrderRequest } from '../../domain/models/update-order-request.model';

@Injectable()
export class OrderService {
  constructor(@Inject('OrderRepository') private readonly orderRepository: OrderRepository) {}

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
}
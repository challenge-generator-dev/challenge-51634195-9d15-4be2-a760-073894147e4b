// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from '../../domain/ports/order-repository.port';
import { Order, OrderStatus } from '../../domain/models/order.model';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';
import { UpdateOrderRequest } from '../../domain/models/update-order-request.model';
import { DynamoDBClientService } from '../aws/dynamodb-client';
import { OrderItem } from '../../domain/models/order-item.model';

@Injectable()
export class DynamoOrderRepository implements OrderRepository {
  private readonly logger = new Logger(DynamoOrderRepository.name);
  private readonly tableName = process.env.ORDERS_TABLE_NAME || 'orders';

  constructor(private readonly dynamoClient: DynamoDBClientService) {}

  async create(orderRequest: CreateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async findAll(): Promise<Order[]> {
    throw new Error('TODO(reto): findAll');
  }

  async findById(id: string): Promise<Order | null> {
    throw new Error('TODO(reto): findById');
  }

  async update(id: string, updateRequest: UpdateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): update');
  }

  async delete(id: string): Promise<void> {
    throw new Error('TODO(reto): delete');
  }

  private mapToOrder(item: any): Order {
    throw new Error('TODO(reto): mapToOrder');
  }
}
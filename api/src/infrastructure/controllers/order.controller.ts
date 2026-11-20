import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrderService } from '../../application/services/order.service';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';
import { UpdateOrderRequest } from '../../domain/models/update-order-request.model';
import { Order } from '../../domain/models/order.model';

/**
 * Adaptador de entrada HTTP para el recurso /orders.
 * Solo traduce la petición HTTP a una llamada al caso de uso y devuelve su resultado.
 * Las validaciones de negocio y los errores de dominio viven en la capa de aplicación;
 * su traducción a respuestas HTTP la resuelve el filtro global de excepciones.
 */
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderRequest: CreateOrderRequest): Promise<Order> {
    return this.orderService.create(createOrderRequest);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listOrders(): Promise<Order[]> {
    return this.orderService.list();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.orderService.get(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderRequest: UpdateOrderRequest,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderRequest);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.orderService.delete(id);
  }
}
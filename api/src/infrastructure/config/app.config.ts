import { Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { OrderService } from '../../application/services/order.service';
import { OrderServiceImpl } from '../../application/services/order.service.impl';
import { DynamoOrderRepository } from '../repositories/dynamo-order.repository';
import { DynamoDBClientService } from '../aws/dynamodb-client';

// Token de inyeccion del puerto de repositorio. El puerto es una interface (tipo, no valor),
// por eso se inyecta y exporta mediante este token de cadena, nunca por la interface.
export const ORDER_REPOSITORY_TOKEN = 'OrderRepository';

// Modulo de configuracion de infraestructura: conecta los adaptadores de salida con los puertos del dominio.
@Global()
@Module({
  providers: [
    DynamoDBClientService,
    {
      provide: 'DYNAMODB_TABLE_NAME',
      useValue: process.env.DYNAMODB_TABLE_NAME || 'orders',
    },
    {
      provide: ORDER_REPOSITORY_TOKEN,
      useClass: DynamoOrderRepository,
    },
    {
      provide: OrderService,
      useClass: OrderServiceImpl,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
  exports: [
    OrderService,
    ORDER_REPOSITORY_TOKEN,
    DynamoDBClientService,
    'DYNAMODB_TABLE_NAME',
  ],
})
export class AppConfigModule {}
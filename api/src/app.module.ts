import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DynamoDBClientService } from './infrastructure/aws/dynamodb-client';
import { OrderServiceImpl } from './application/services/order.service.impl';
import { DynamoOrderRepository } from './infrastructure/repositories/dynamo-order.repository';
import { OrderController } from './infrastructure/controllers/order.controller';
import { AllExceptionsFilter } from './infrastructure/filters/global-exception.filter';
import { AppConfigModule } from './infrastructure/config/app.config';

@Module({
  imports: [AppConfigModule],
  controllers: [OrderController],
  providers: [
    DynamoDBClientService,
    {
      provide: 'OrderRepository',
      useClass: DynamoOrderRepository,
    },
    {
      provide: 'OrderService',
      useClass: OrderServiceImpl,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
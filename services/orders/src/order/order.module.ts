import { HttpModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Buyer,
  Order,
  OrderItem
} from './infrastructure/entities';

import { controllers } from './api';
import { repositories } from './infrastructure/repositories';
import { eventHandlers } from './application/events';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Buyer,
      Order,
      OrderItem
    ]),
    HttpModule,
    CqrsModule
  ],
  providers: [
    ...repositories,
    ...eventHandlers
  ],
  controllers: [
    ...controllers
  ]
})
export class OrderModule {}

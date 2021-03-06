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
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Buyer,
      Order,
      OrderItem
    ]),
    HttpModule,
    CqrsModule,
    ClientsModule.register([
      {
        name: 'BASKET_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'basket',
          protoPath: join(__dirname, 'order.proto'),
        },
      },
    ]),
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

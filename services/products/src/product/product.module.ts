import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './infrastructure/entities/product.entity';

import {
  ProductRepositoryService
} from './infrastructure/repositories';

import {
  AllProductsUsecaseService,
  GetProductUsecaseService
} from './application/usecases';

import {
  AllProductsController,
  GetProductController
} from './api/controllers';

import {
  GetAllProductsHandler
} from './application/queries/getAllProducts/get-all-products-handler';
import {
  GetAllProductsQuery
} from './application/queries/getAllProducts/get-all-products-query';

import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Product
    ]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://obmsotkf:nFcmYLWdRJmWCv_WNuPSDLvmVm6ku3U5@woodpecker.rmq.cloudamqp.com/obmsotkf'],
          queue: 'orders_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ])
  ],
  providers: [
    ProductRepositoryService,
    AllProductsUsecaseService,
    GetProductUsecaseService,
    GetAllProductsQuery,
    GetAllProductsHandler
  ],
  controllers: [
    AllProductsController,
    GetProductController
  ],
})
export class ProductModule {}

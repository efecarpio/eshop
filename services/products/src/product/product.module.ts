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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product
    ]),
  ],
  providers: [
    ProductRepositoryService,
    AllProductsUsecaseService,
    GetProductUsecaseService
  ],
  controllers: [
    AllProductsController,
    GetProductController
  ],
})
export class ProductModule {}

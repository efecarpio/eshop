import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductRepositoryService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  all({
    name,
    sku,
    quantity,
  }): SelectQueryBuilder<Product> {
    const query = this.productRepository.createQueryBuilder('product')
      .where(
        "product.name like :name OR product.sku = :sku", {
        name: `%${name}%`,
        sku,
      })
      .orderBy('name');
    return query;
  }

  async findById(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }
}

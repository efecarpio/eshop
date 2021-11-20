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
    min,
    max
  }): SelectQueryBuilder<Product> {
    const rangeFilter = this.priceRange(min, max);
    const quantitiesFilter = (quantity > 0) ? `product.quantity = ${quantity}` : '';

    let query = this.productRepository.createQueryBuilder('product')
      .where(
        "product.name like :name OR product.sku = :sku", {
        name: `%${name}%`,
        sku,
      })
      .orderBy('name');

    if (rangeFilter !== '') {
      query = query.where(rangeFilter).orderBy('price');;
    } else if (quantitiesFilter !== '') {
      query = query.where(quantitiesFilter).orderBy('quantity');;
    }

    return query;
  }

  async findById(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async restoreQuantiyStock(id: number, quantity: number) {
    const itemFounded = await this.productRepository.findOne(id);
    if (itemFounded === undefined) {
      throw new Error('Item no econtrado');
    }

    itemFounded.quantity = Number(itemFounded.quantity) + Number(quantity);

    const itemSaved = await this.productRepository.save(itemFounded);
    if (itemSaved === undefined) {
      throw new Error('No se ha actualizado el stock');
    }

    return itemSaved;
  }

  async reduceQuantityStock(id: number, quantity: number) {
    const itemFounded = await this.productRepository.findOne(id);
    if (itemFounded === undefined) {
      throw new Error('Item no econtrado');
    }

    if (Number(itemFounded.quantity) < Number(quantity)) {
      throw new Error('No hay suficiente stock');
    }

    itemFounded.quantity = Number(itemFounded.quantity) - Number(quantity);

    const itemSaved = await this.productRepository.save(itemFounded);
    if (itemSaved === undefined) {
      throw new Error('No se ha actualizado el stock');
    }
    
    return itemSaved;
  }

  private priceRange(min: number, max: number) {
    if (min === undefined || max === undefined) {
      return '';
    }

    if (+min < 0 || +max < 0) {
      throw new Error('Las cantidades no pueden ser menores a cero');
    }
    if (+min >= +max) {
      throw new Error('El rango de cantidades es incorrecto');
    }
    return `product.price BETWEEN ${min} AND ${max}`;
  }
}

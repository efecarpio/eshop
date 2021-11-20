import { Basket } from './../entities/basket.entity';
import { BasketItem } from './../entities/basket-item-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBasketDto } from '../dto/update-basket.dto';
import { CreateBasketItemDto } from '../dto/create-basket-item.dto';


@Injectable()
export class BasketItemService {
  constructor(
    @InjectRepository(BasketItem) 
    private readonly repository: Repository<BasketItem>,
  ) {}

  async createBulk(createBasketDto: CreateBasketItemDto[], basket: Basket) {
    const listaItemSaved = [];
    for (const item of createBasketDto) {

      const itemSaved = await this.repository.save({
        id: (item.id ===0) ? null : item.id,
        idproduct: item.idproduct,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageuri: item.imageuri,
        idbasket: { id: basket.id }
      })
      
      if (itemSaved === undefined) {
        throw new Error('No se pudo guardar el producto en el carrito');
      }
      
      listaItemSaved.push(itemSaved);  
    }
    return listaItemSaved;
  }

  async removeBulk(ids: number[]) {
    return await this.repository.delete(ids);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  async update(id: number, updateBasketDto: UpdateBasketDto) {
    const basket = await this.repository.findOne(id);
    if (basket === undefined) {
      throw new Error('No se ha podido actualizar el carritp');
    }
    return await this.repository.save({ ...basket, ...updateBasketDto});
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}

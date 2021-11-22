import { BasketItemService } from './basket-item.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBasketDto } from '../dto/create-basket.dto';
import { UpdateBasketDto } from '../dto/update-basket.dto';
import { Basket } from '../entities/basket.entity';


@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) 
    private readonly repository: Repository<Basket>,
    private readonly itemRepository: BasketItemService
  ) {}

  async create(createBasketDto: CreateBasketDto) {
    const { items } = createBasketDto;
    createBasketDto.items = [];
    const basketSaved = await this.repository.save({
      id: (createBasketDto.id === 0) ? null : createBasketDto.id,
      idbuyersession: createBasketDto.idbuyersession,
      items: []
    });
    const itemsSaved = await this.itemRepository.createBulk(
      items, basketSaved
    )
    
    Object.assign(basketSaved.items, itemsSaved);
    return basketSaved;
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
      throw new Error('No se ha podido actualizar el carrito');
    }

    const basketSaved = await this.repository.save({
      ...basket,
      ...{idbuyersession: updateBasketDto.idbuyersession},
      items: updateBasketDto.items
    });

    const { items } = updateBasketDto;
    /* const itemsSaved = await this.itemRepository.createBulk(
      items, basket
    )*/

    // Object.assign(basketSaved.items, itemsSaved);
    return basketSaved;
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }

  async removeBySession(idsession: string) {
    const basket = await this.repository.findOne({
      where: { idbuyersession: idsession },
      relations: ['items']
    });

    if (basket === undefined) {
      throw new Error('No se ha encontrado el carrito');
    }

    const ids = basket.items.map((item) => item.id);
    await this.itemRepository.removeBulk(ids);
    await this.repository.remove(basket);
      
    return { isDeleted: true };
  }
}

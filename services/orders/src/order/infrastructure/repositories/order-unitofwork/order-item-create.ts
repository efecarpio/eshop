import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem } from '../../entities';

@Injectable()
export class OrderItemCreateService {
  constructor(
    @InjectRepository(OrderItem)
    private repository: Repository<OrderItem>
  ) {}

  async execute(itemsRequest: any[], order: Order) {
    const listaItemSaved = [];

    for (const item of itemsRequest) {
      const { idproduct, quantity, price } = item;

      const itemSaved = await this.repository.save({
        idorder: order,
        idproduct: idproduct,
        quantity: quantity,
        price: price
      })
      
      if (itemSaved === undefined) {
        throw new Error('No se pudo guardar');
      }
      
      listaItemSaved.push(itemSaved);  
    }

    return listaItemSaved;
  }
}
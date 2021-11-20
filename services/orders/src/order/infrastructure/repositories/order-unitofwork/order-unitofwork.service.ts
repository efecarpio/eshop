import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonFunctions } from './../../../shared';

import { BuyerCreateService } from './buyer-create';
import { OrderItemCreateService } from './order-item-create';

import { Order } from '../../entities';

@Injectable()
export class OrderUnitofworkService {
  constructor(
    @InjectRepository(Order) 
    private orderRepository: Repository<Order>,
    private itemRepository: OrderItemCreateService,
    private buyerRepository: BuyerCreateService
  ) {}

  async execute(orderRequest: any) {
    const { items } = orderRequest;
    const buyerSaved = await this.buyerRepository.execute(orderRequest);

    const orderSaved: Order = await this.orderRepository.save({
      idbuyer: buyerSaved,
      ordernumber: 'INV-' + CommonFunctions.uuid(),
      status: 'Submitted',
      comments: '',
      total: this.totalOrder(items),
      items: []
    });

    if (orderSaved === undefined) {
      throw new Error('No se ha podido guardar la orden');
    }
    
    await this.itemRepository.execute(items, orderSaved);
    
    return orderSaved;
  }

  private totalOrder(items: any[]) {
    let total = 0;
    items.forEach((item: any) => {
      total += (item.quantity * item.price);
    });
    return total;
  }
}

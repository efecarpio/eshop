import { StatusOrder } from './../../../shared/types/status-type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Order } from '../../entities';

@Injectable()
export class OrderRepositoryService {
  constructor(
    @InjectRepository(Order) 
    private readonly repository: Repository<Order>,
  ) {}

  findAll({
    buyer
  }): SelectQueryBuilder<Order> {
    const orders = this.repository.createQueryBuilder('order')
      .where("order.idbuyer = :buyer", { buyer: buyer })
      .orderBy("createdat");
    return orders;
  }

  async cancelOrder({ id }) {
    const order = await this.repository.findOne(id);
    order.status = StatusOrder.Cancel;
    const orderCancelled = await this.repository.save(order);
    if (orderCancelled === undefined) {
      throw new Error('No se ha podido cancelar la orden');
    }
    return orderCancelled;
  }
}

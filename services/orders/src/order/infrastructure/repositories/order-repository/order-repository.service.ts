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
    idbuyer
  }): SelectQueryBuilder<Order> {
    const orders = this.repository.createQueryBuilder('order')
      .where("order.idbuyer = :buyer", { buyer: idbuyer })
      .orderBy("createdat");
    return orders;
  }
}

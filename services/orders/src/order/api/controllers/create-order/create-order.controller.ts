import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import { BasePresenter } from 'src/order/shared';

import { OrderRequest } from '../../request/order-request';
import {
  OrderCreateCommand,
} from './../../../application/commands';

@Controller('orders')
export class CreateOrderController {
  constructor(
    private readonly commandBus: CommandBus
  ) {}

  @Post()
  public async createOrder(@Body() request: OrderRequest): Promise<object> {
    try {
      const result = await this.commandBus.execute<OrderCreateCommand, any>(
        new OrderCreateCommand(request),
      ); 
      const output = BasePresenter.populateView(result);
      return output;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @EventPattern('hello')
  async productMicroService(data: any) {
    console.log(data);
  }
}

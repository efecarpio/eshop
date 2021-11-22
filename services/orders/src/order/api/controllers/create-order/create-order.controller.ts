import { Body, Controller, HttpException, HttpService, HttpStatus, Inject, OnModuleInit, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ClientGrpc, EventPattern } from '@nestjs/microservices';
import { BasketService } from 'src/grpc.interface';
import { BasePresenter } from 'src/order/shared';

import { OrderRequest } from '../../request/order-request';
import {
  OrderCreateCommand,
} from './../../../application/commands';

@Controller('orders')
export class CreateOrderController implements OnModuleInit {
  private basketService: BasketService;

  constructor(
    @Inject('BASKET_PACKAGE') private client: ClientGrpc,
    private readonly commandBus: CommandBus
  ) {}

  onModuleInit() {
    this.basketService = this.client.getService<BasketService>('BasketIntegrationController');
    console.log('onModuleInit', this.basketService);
  }

  @Post()
  public async createOrder(@Body() request: OrderRequest): Promise<object> {
    try {
      const { idbuyersession } = request;
      const result = await this.commandBus.execute<OrderCreateCommand, any>(
        new OrderCreateCommand(request),
      );
      const output = BasePresenter.populateView(result);
      return output;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'CreateOrder: ' + e.message,
        HttpStatus.EXPECTATION_FAILED
      );
    }
  }

  @EventPattern('hello')
  async productMicroService(data: any) {
    console.log(data);
  }

  @EventPattern('basket')
  async basketMicroService(data: any) {
    console.log(data);
  }
}

import { GrpcMethod } from '@nestjs/microservices';
import { Controller, Param } from '@nestjs/common';
import { BasketService } from '../services/basket.service';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';


@Controller()
export class BasketIntegrationController {
  constructor(
    private readonly basketService: BasketService
  ) {}

  @GrpcMethod('BasketIntegrationController', 'RemoveBasketAfterOrder')
  removeBasketAfterOrder(
    @Param('id') id: string,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>
  ) {
    const basketRemoved = this.basketService.removeBySession(id);
    basketRemoved.then(() => 1).catch(() => 0);
  }
}

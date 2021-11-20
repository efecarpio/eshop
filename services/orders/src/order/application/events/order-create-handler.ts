// import { OrderDomain } from './../../domain/order-domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderCreateCommand } from './../commands/order-create-command';
import {
  OrderUnitofworkService
} from './../../infrastructure/repositories/order-unitofwork/order-unitofwork.service';
import { Result } from 'src/order/shared';


@CommandHandler(OrderCreateCommand)
export class OrderCreateHandler implements ICommandHandler<OrderCreateCommand> {
  constructor(
    private readonly repository: OrderUnitofworkService
  ) {}

  async execute(command: OrderCreateCommand): Promise<Result<any>> {
    try {
      const order = await this.repository.execute(command.order);
      return Result.ok<any>(order);
    } catch (e) {
      const obj = "[OrderCreateHandler]: " + e.message;
      return Result.fail<any>(obj);
    }
  }
}

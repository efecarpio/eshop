import { Request } from 'express';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetAllOrdersQuery
} from 'src/order/application/queries/getAllOrders/get-all-orders-query';
import { BasePresenter } from 'src/order/shared';
import { SearchOrderRequest } from '../../request/search-order-request';

@Controller('orders')
export class GetAllOrdersController {
  constructor(
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  async findAll(
    @Req() request: Request, @Query() query: SearchOrderRequest
  ): Promise<any[]> {
    try {
      const { baseUrl } = request;
      const result = await this.queryBus.execute<GetAllOrdersQuery, any[]>(
        new GetAllOrdersQuery({ query, baseUrl }),
      );
      const output = BasePresenter.populateView(result);
      return output;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.EXPECTATION_FAILED);
    }
  }
}

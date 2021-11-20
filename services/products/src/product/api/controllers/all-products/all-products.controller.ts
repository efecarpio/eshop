import { Request } from 'express';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Query,
  Req,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { BasePresenter } from './../../../shared';
import { SearchProductRequest } from './../../requests';
import { GetAllProductsQuery } from './../../../application/queries';
import { ClientProxy } from '@nestjs/microservices';


@Controller('products')
export class AllProductsController {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async findAll(@Req() request: Request, @Query() query: SearchProductRequest): Promise<any[]> {
    try {
      const { baseUrl } = request;
      const result = await this.queryBus.execute<GetAllProductsQuery, any[]>(
        new GetAllProductsQuery({ query, baseUrl }),
      );
      const output = BasePresenter.populateView(result);
      this.client.emit('hello', { data: 'Envío desde Product_Service' });
      return output;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.EXPECTATION_FAILED);
    }
  }
}

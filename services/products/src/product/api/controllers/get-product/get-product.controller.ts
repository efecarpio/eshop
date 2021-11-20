import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetProductQuery } from 'src/product/application/queries';
import { BasePresenter } from './../../../shared';


@Controller('products')
export class GetProductController {
  constructor(
    private readonly queryBus: QueryBus
  ) {}

  @Get(':id')
  async findById(@Param('id') id: number): Promise<any[]> {
    try {
      const result = await this.queryBus.execute<GetProductQuery, any[]>(
        new GetProductQuery(id),
      );
      const output = BasePresenter.populateView(result);
      return output;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.EXPECTATION_FAILED);
    }
  }
}

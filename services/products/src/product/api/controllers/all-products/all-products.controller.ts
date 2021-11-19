import { Request } from 'express';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { BasePresenter } from './../../../shared';
import { AllProductsUsecaseService } from './../../../application/usecases';
import { SearchProductRequest } from './../../requests';

@Controller('products')
export class AllProductsController {
  constructor(
    private readonly useCase: AllProductsUsecaseService
  ) {}

  @Get()
  async findAll(@Req() request: Request, @Query() query: SearchProductRequest): Promise<any[]> {
    try {
      const { baseUrl } = request;
      const result = await this.useCase.execute({ query, baseUrl });
      const output = BasePresenter.populateView(result);
      return output;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.EXPECTATION_FAILED);
    }
  }
}

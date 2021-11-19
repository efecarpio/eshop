import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { BasePresenter } from './../../../shared';
import { GetProductUsecaseService } from './../../../application/usecases';

@Controller('products')
export class GetProductController {
  constructor(
    private readonly useCase: GetProductUsecaseService
  ) {}

  @Get(':id')
  async findById(@Param('id') id: number): Promise<any[]> {
    try {
      const result = await this.useCase.execute(id);
      const output = BasePresenter.populateView(result);
      return output;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.EXPECTATION_FAILED);
    }
  }
}

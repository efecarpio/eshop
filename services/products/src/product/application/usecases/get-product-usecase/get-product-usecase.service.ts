import { Injectable } from '@nestjs/common';
import { ProductRepositoryService } from 'src/product/infrastructure/repositories';
import { Result, IUseCase } from 'src/product/shared';

@Injectable()
export class GetProductUsecaseService  implements IUseCase<number, Result<any[]>> {
  constructor(
    private readonly productRepository: ProductRepositoryService
  ) {}

  async execute(id: number): Promise<Result<any[]>> {
    try {
      const lista = await this.productRepository.findById(id);
      return Result.ok<any>(lista);
    } catch (e) {
      const obj = "[GetProductUseCase]: " + e.message;
      return Result.fail<any>(obj);
    }
  }
}

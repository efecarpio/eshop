import { Injectable } from '@nestjs/common';
import { IPaginateRequest } from 'src/product/api/requests';
import { ProductRepositoryService } from 'src/product/infrastructure/repositories';
import { Result, IUseCase, paginate } from 'src/product/shared';

@Injectable()
export class AllProductsUsecaseService implements IUseCase<IPaginateRequest, Result<any[]>> {
  constructor(
    private readonly productRepository: ProductRepositoryService
  ) {}

  async execute(request: IPaginateRequest): Promise<Result<any[]>> {
    try {
      const lista = await paginate(
        this.productRepository.all(request.query), request
      );
      return Result.ok<any>(lista);
    } catch (e) {
      const obj = "[AllProductsUseCase]: " + e.message;
      return Result.fail<any>(obj);
    }
  }
}

import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllProductsQuery } from './get-all-products-query';

import { ProductRepositoryService } from '../../../infrastructure/repositories';
import { paginate, Result } from "src/product/shared";
import { ProductoResponseDto } from "../../dto/product-dto";

@QueryHandler(GetAllProductsQuery)
export class GetAllProductsHandler implements IQueryHandler<GetAllProductsQuery> {
  constructor(
    private readonly productRepository: ProductRepositoryService
  ) {}

  async execute({ request }: GetAllProductsQuery): Promise<Result<any>> {
    try {
      const lista = await paginate(
        this.productRepository.all(request.query), request
      );
      return Result.ok<any>({
        data: ProductoResponseDto.render(lista.data),
        links: lista.links
      });
    } catch (e) {
      const obj = "[AllProductsUseCase]: " + e.message;
      return Result.fail<any>(obj);
    }
  }   
}

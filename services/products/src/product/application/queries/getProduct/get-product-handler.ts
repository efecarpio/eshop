import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProductRepositoryService } from "src/product/infrastructure/repositories";
import { Result } from "src/product/shared";
import { ProductoResponseDto } from "../../dto/product-dto";
import { GetProductQuery } from "./get-product-query";

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(
    private readonly productRepository: ProductRepositoryService
  ) {}
  
  async execute({ id }: GetProductQuery): Promise<Result<any>> {
    try {
      const entity = await this.productRepository.findById(id);
      return Result.ok<any>(ProductoResponseDto.render(entity));
    } catch (e) {
      const obj = "[GetProductHandler]: " + e.message;
      return Result.fail<any>(obj);
    }
  }

}

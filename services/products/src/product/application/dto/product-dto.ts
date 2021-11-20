import { ResponseAbstract } from "src/product/shared";
import { Product } from './../../infrastructure/entities/product.entity';

export class ProductoResponseDto extends ResponseAbstract<Product> {
  constructor(protected data: Product | Product[]) {
    super(data);
  }

  public static render(data: Product | Product[]): object {
    const self = new this(data);
    return self.transform();
  }

  protected transformOne(entity: Product): object {
    return {
      id: entity.id,
      name: entity.name,
      sku: entity.sku,
      price: entity.price,
      quantity: entity.quantity,
    };
  }

  protected transformMany(entities: Product[]): object[] {
    return entities.map((entity: Product) => this.transformOne(entity));
  }
  
}

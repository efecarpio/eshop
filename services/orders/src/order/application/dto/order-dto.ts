import { Order } from './../../infrastructure/entities/order-entity';
import { ResponseAbstract } from "src/order/shared";


export class OrderResponseDto extends ResponseAbstract<Order> {
  constructor(protected data: Order | Order[]) {
    super(data);
  }

  public static render(data: Order | Order[]): object {
    const self = new this(data);
    return self.transform();
  }

  protected transformOne(entity: Order): object {
    return {
      id: entity.id,
      idbuyer: entity.idbuyer,
      ordernumber: entity.ordernumber,
      status: entity.status,
      total: entity.total,
      items: entity.items,
      comments: entity.comments,
      paymentmethod: entity.paymentmethod
    };
  }

  protected transformMany(entities: Order[]): object[] {
    return entities.map((entity: Order) => this.transformOne(entity));
  }
  
}

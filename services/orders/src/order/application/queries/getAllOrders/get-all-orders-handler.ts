import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllOrdersQuery } from "./get-all-orders-query";
import {
  OrderRepositoryService,
} from './../../../infrastructure/repositories/order-repository/order-repository.service';
import { paginate, Result } from "src/order/shared";
import { OrderResponseDto } from "../../dto/order-dto";

@QueryHandler(GetAllOrdersQuery)
export class GetAllOrdersHandler implements IQueryHandler<GetAllOrdersQuery> {
  constructor(
    private readonly repository: OrderRepositoryService
  ) {}

  async execute({ request }: GetAllOrdersQuery): Promise<any> {
    try {
      const lista = await paginate(
        this.repository.findAll(request.query), request
      );
      return Result.ok<any>({
        data: OrderResponseDto.render(lista.data),
        links: lista.links
      });
    } catch (e) {
      const obj = "[AllOrdersHandler]: " + e.message;
      return Result.fail<any>(obj);
    }
  }

}

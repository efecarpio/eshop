import { IPaginateRequest } from "src/order/shared";

export class GetAllOrdersQuery {
  constructor(public readonly request: IPaginateRequest) {}
}
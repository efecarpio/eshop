import { IPaginateRequest } from "src/product/api/requests";

export class GetAllProductsQuery {
  constructor(public readonly request: IPaginateRequest) {}
}
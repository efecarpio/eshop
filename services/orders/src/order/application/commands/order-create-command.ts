import { OrderRequest } from './../../api/request/order-request';

export class OrderCreateCommand {
  constructor(public readonly order: OrderRequest) {}
}
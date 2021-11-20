import { BuyerRequest } from "./buyer-request";
import { OrderItemRequest } from "./order-item-request";

export class OrderRequest {
  id: number;
  status: string;
  invoice: string;
  total: number;
  comments: string;
  buyer: BuyerRequest;
  items!: OrderItemRequest[];
}
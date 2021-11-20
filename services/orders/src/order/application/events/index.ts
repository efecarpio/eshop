import { GetAllOrdersHandler } from './../queries/getAllOrders/get-all-orders-handler';
import { GetAllOrdersQuery } from './../queries/getAllOrders/get-all-orders-query';
import { OrderCreateHandler } from './order-create-handler';

export const eventHandlers = [
  OrderCreateHandler,
  GetAllOrdersQuery,
  GetAllOrdersHandler
];

import {
  OrderRepositoryService
} from './order-repository/order-repository.service';
import {
  OrderItemCreateService
} from './order-unitofwork/order-item-create';
import {
  BuyerCreateService
} from './order-unitofwork/buyer-create';
import { 
  OrderUnitofworkService
} from './order-unitofwork/order-unitofwork.service';

export const repositories = [
  BuyerCreateService,
  OrderItemCreateService,
  OrderUnitofworkService,
  OrderRepositoryService
];

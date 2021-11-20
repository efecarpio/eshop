import { CreateBasketItemDto } from './create-basket-item.dto';

export class CreateBasketDto {
  id: number;
  idbuyersession: string;
  items: CreateBasketItemDto[];
}

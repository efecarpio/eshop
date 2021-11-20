import { PartialType } from '@nestjs/mapped-types';
import { CreateBasketItemDto } from './create-basket-item.dto';

export class UpdateBasketItemDto extends PartialType(CreateBasketItemDto) {}

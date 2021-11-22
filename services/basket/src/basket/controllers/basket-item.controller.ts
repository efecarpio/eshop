import { Controller, Param, Delete } from '@nestjs/common';
import { BasketItemService } from '../services/basket-item.service';


@Controller('basket')
export class BasketItemController {
  constructor(
    private readonly basketService: BasketItemService
  ) {}

  @Delete('/single/item/:id')
  remove(@Param('id') id: string) {
    return this.basketService.remove(+id);
  }
}

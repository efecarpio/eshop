import { ClientProxy } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateBasketDto } from '../dto/create-basket.dto';
import { UpdateBasketDto } from '../dto/update-basket.dto';
import { BasketService } from '../services/basket.service';


@Controller('basket')
export class BasketController {
  constructor(
    @Inject('BASKET_SERVICE') private readonly client: ClientProxy,
    private readonly basketService: BasketService
  ) {}

  @Post()
  create(@Body() createBasketDto: CreateBasketDto) {
    this.client.emit('basket', { data: 'Envío desde Basket_Service' });
    return this.basketService.create(createBasketDto);
  }

  @Get()
  findAll() {
    return this.basketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(+id, updateBasketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketService.remove(+id);
  }

  @Delete('/sess/:id')
  removeBulk(@Param('id') id: string) {
    return this.basketService.removeBySession(id);
  }
}

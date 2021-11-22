import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateBasketDto } from '../dto/create-basket.dto';
import { UpdateBasketDto } from '../dto/update-basket.dto';
import { BasketService } from '../services/basket.service';


@Controller('basket')
export class BasketController {
  constructor(
    private readonly basketService: BasketService
  ) {}

  @Post()
  async create(@Body() createBasketDto: CreateBasketDto) {
    return await this.basketService.create(createBasketDto);
  }

  @Put()
  async updateAll(@Body() createBasketDto: CreateBasketDto) {
    return await this.basketService.update(createBasketDto.id, createBasketDto);
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
  
  @Delete('/sess/:id')
  async removeBulk(@Param('id') id: string) {
    return await this.basketService.removeBySession(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.basketService.remove(+id);
  }
}

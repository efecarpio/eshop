import { Test, TestingModule } from '@nestjs/testing';
import { BasketService } from '../services/basket.service';
import { BasketController } from './basket.controller';


describe('BasketController', () => {
  let controller: BasketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketController],
      providers: [BasketService],
    }).compile();

    controller = module.get<BasketController>(BasketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

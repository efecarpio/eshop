import { Test, TestingModule } from '@nestjs/testing';
import { AllProductsController } from './all-products.controller';

describe('AllProductsController', () => {
  let controller: AllProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllProductsController],
    }).compile();

    controller = module.get<AllProductsController>(AllProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

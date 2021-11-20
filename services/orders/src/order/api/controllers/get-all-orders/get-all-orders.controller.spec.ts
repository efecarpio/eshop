import { Test, TestingModule } from '@nestjs/testing';
import { GetAllOrdersController } from './get-all-orders.controller';

describe('GetAllOrdersController', () => {
  let controller: GetAllOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllOrdersController],
    }).compile();

    controller = module.get<GetAllOrdersController>(GetAllOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

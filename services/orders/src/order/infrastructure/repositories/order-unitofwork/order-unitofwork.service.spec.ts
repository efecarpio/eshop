import { Test, TestingModule } from '@nestjs/testing';
import { OrderUnitofworkService } from './order-unitofwork.service';

describe('OrderUnitofworkService', () => {
  let service: OrderUnitofworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderUnitofworkService],
    }).compile();

    service = module.get<OrderUnitofworkService>(OrderUnitofworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

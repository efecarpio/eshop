import { Test, TestingModule } from '@nestjs/testing';
import { AllProductsUsecaseService } from './all-products-usecase.service';

describe('AllProductsUsecaseService', () => {
  let service: AllProductsUsecaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllProductsUsecaseService],
    }).compile();

    service = module.get<AllProductsUsecaseService>(AllProductsUsecaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

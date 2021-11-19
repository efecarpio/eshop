import { Test, TestingModule } from '@nestjs/testing';
import { GetProductUsecaseService } from './get-product-usecase.service';

describe('GetProductUsecaseService', () => {
  let service: GetProductUsecaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetProductUsecaseService],
    }).compile();

    service = module.get<GetProductUsecaseService>(GetProductUsecaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

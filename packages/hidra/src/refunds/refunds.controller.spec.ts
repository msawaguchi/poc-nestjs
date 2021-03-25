import { Test, TestingModule } from '@nestjs/testing';
import { RefundsController } from './refunds.controller';

describe('RefundsController', () => {
  let controller: RefundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefundsController],
    }).compile();

    controller = module.get<RefundsController>(RefundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseResolver } from './purchase.resolver';
import { PurchaseService } from './purchase.service';
import { PurchaseInput } from './purchase.input';

describe('PurchaseResolver', () => {
  let resolver: PurchaseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseResolver,
        {
          provide: PurchaseService,
          // using a factory just because
          useFactory: () => ({
            findAll: jest.fn(() => [
              {
                id: '1',
                customer_id: '1',
                product_id: 'ignite',
              },
            ]),
            findOne: jest.fn((id: { id: string }) => ({
              id,
              customer_id: '1',
              product_id: 'ignite',
            })),
            create: jest.fn((cat: PurchaseInput) => ({
              id: '10',
              ...cat,
              status: 'success',
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<PurchaseResolver>(PurchaseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('purchases', () => {
    it('should get the purchases array', async () => {
      expect(await resolver.purchases()).toEqual([
        {
          id: '1',
          customer_id: '1',
          product_id: 'ignite',
        },
      ]);
    });
  });
});

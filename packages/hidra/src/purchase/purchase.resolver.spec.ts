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
            create: jest.fn((purchase: PurchaseInput) => ({
              id: '10',
              ...purchase,
              status: 'success',
            })),
            findByProduct: jest.fn((product_id: string) => [
              {
                id: '1',
                customer_id: '1',
                product_id,
              },
            ]),
            findByCustomer: jest.fn((customer_id: string) => [
              {
                id: '1',
                customer_id,
                product_id: 'ignite',
              },
            ]),
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

    it('should get the purchase by id', async () => {
      expect(await resolver.purchase('1')).toEqual({
        id: '1',
        customer_id: '1',
        product_id: 'ignite',
      });
    });

    it('should get the purchases by product', async () => {
      expect(await resolver.purchaseByProduct('ignite')).toEqual([
        {
          id: '1',
          customer_id: '1',
          product_id: 'ignite',
        },
      ]);
    });

    it('should get the purchases by customer', async () => {
      expect(await resolver.purchaseByCustomer('1')).toEqual([
        {
          id: '1',
          customer_id: '1',
          product_id: 'ignite',
        },
      ]);
    });
  });
});

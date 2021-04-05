import { Test, TestingModule } from '@nestjs/testing';

import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductInput } from './product.input';

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductResolver,
        {
          provide: ProductService,
          // using a factory just because
          useFactory: () => ({
            findOne: jest.fn((id: { id: string }) => ({
              id,
              amount: 100,
              type: 'onetime',
            })),
            findAll: jest.fn(() => [
              {
                id: 'ignite',
                amount: 100,
                type: 'onetime',
              },
              {
                id: 'experts',
                amount: 100,
                type: 'onetime',
              },
            ]),
            create: jest.fn((data: ProductInput) => ({
              id: data.id,
              amount: data.amount,
              type: data.type,
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('products', () => {
    it('should get the products array', async () => {
      expect(await resolver.products()).toEqual([
        {
          id: 'ignite',
          amount: 100,
          type: 'onetime',
        },
        {
          id: 'experts',
          amount: 100,
          type: 'onetime',
        },
      ]);
    });

    it('should find product by id', async () => {
      const id = 'ignite';
      expect(await resolver.product(id)).toEqual({
        id,
        amount: 100,
        type: 'onetime',
      });
    });
  });
});

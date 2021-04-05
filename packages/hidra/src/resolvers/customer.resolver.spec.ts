import { Test, TestingModule } from '@nestjs/testing';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from '../services/customer.service';
import { CustomerInput, CustomerPagination } from '../inputs/customer.input';

describe('CustomerResolver', () => {
  let resolver: CustomerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerResolver,
        {
          provide: CustomerService,
          // using a factory just because
          useFactory: () => ({
            findOne: jest.fn((id: { id: string }) => ({
              id,
              name: 'test',
              email: 'test@test.com',
              street: 'street',
              city: 'city',
              state: 'state',
              experts: 'experts',
              ignite: 'ignite',
            })),
            findAll: jest.fn(() => [
              {
                id: 'id_test1',
                name: 'test1',
                email: 'test1@test.com',
                street: 'street',
                city: 'city',
                state: 'state',
                experts: 'experts',
                ignite: 'ignite',
              },
              {
                id: 'id_test2',
                name: 'test2',
                email: 'test2@test.com',
                street: 'street',
                city: 'city',
                state: 'state',
                experts: 'experts',
                ignite: 'ignite',
              },
            ]),
            create: jest.fn((data: CustomerInput) => ({
              id: data.id,
              name: data.name,
              email: data.email,
              street: data.email,
              city: data.city,
              state: data.state,
              experts: data.experts,
              ignite: data.ignite,
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<CustomerResolver>(CustomerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('customers', () => {
    it('should list all customers', async () => {
      const data: CustomerPagination = {
        limit: 10,
        page: 1,
      };

      expect(await resolver.customers(data)).toEqual([
        {
          id: 'id_test1',
          name: 'test1',
          email: 'test1@test.com',
          street: 'street',
          city: 'city',
          state: 'state',
          experts: 'experts',
          ignite: 'ignite',
        },
        {
          id: 'id_test2',
          name: 'test2',
          email: 'test2@test.com',
          street: 'street',
          city: 'city',
          state: 'state',
          experts: 'experts',
          ignite: 'ignite',
        },
      ]);
    });

    it('should find customer by id', async () => {
      const id = 'id_customer_test';

      expect(await resolver.customer(id)).toEqual({
        id,
        name: 'test',
        email: 'test@test.com',
        street: 'street',
        city: 'city',
        state: 'state',
        experts: 'experts',
        ignite: 'ignite',
      });
    });
  });
});

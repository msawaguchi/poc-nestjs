import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerInput } from 'src/customer/customer.input';
import { ProductInput } from 'src/product/product.input';
import { PurchaseInput } from './purchase.input';
import { Purchase } from './purchase.model';
import { PurchaseService } from './purchase.service';

describe('PurchaseService', () => {
  let purchaseService: PurchaseService;

  const mockPurchaseRepository = {
    create: jest.fn(),
    refund: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    findByCustomer: jest.fn(),
    findByProduct: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const customer: CustomerInput = {
    id: 'id-customer',
    name: 'Customer Name',
    email: 'test@example.com',
    street: 'street',
    city: 'city',
    state: 'state',
  };

  const product: ProductInput = {
    id: 'ignite',
    amount: 100,
    type: 'recurring',
  };

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseService,
        {
          provide: getRepositoryToken(Purchase),
          useValue: mockPurchaseRepository,
        },
      ],
    }).compile();

    purchaseService = app.get<PurchaseService>(PurchaseService);
  });

  beforeEach(() => {
    mockPurchaseRepository.create.mockReset();
    mockPurchaseRepository.refund.mockReset();
    mockPurchaseRepository.findAll.mockReset();
    mockPurchaseRepository.find.mockReset();
    mockPurchaseRepository.findByCustomer.mockReset();
    mockPurchaseRepository.findByProduct.mockReset();
    mockPurchaseRepository.findOne.mockReset();
    mockPurchaseRepository.save.mockReset();
  });

  it('it should create a purchase', async () => {
    const purchase: PurchaseInput = {
      id: '5e553d38-7ecb-4939-8c4b-a00dc4b16d7c',
      customer_id: customer.id,
      product_id: product.id,
    };

    const createdPurchase = {
      id: purchase.id,
      customer_id: customer.id,
      product_id: product.id,
      status: 'success',
    };

    mockPurchaseRepository.save(purchase);
    mockPurchaseRepository.create.mockReturnValue(createdPurchase);

    const response = await purchaseService.create(purchase);

    expect(response).toMatchObject(createdPurchase);
  });

  it('it should list all purchases', async () => {
    const purchase: PurchaseInput = {
      id: '5e553d38-7ecb-4939-8c4b-a00dc4b16d7b',
      customer_id: customer.id,
      product_id: product.id,
    };

    mockPurchaseRepository.save(purchase);

    mockPurchaseRepository.create.mockReturnValue(purchase);

    mockPurchaseRepository.findAll.mockReturnValue([purchase, purchase]);

    const response = await purchaseService.findAll();

    expect(response).toHaveLength(2);
    expect(mockPurchaseRepository.findAll).toHaveBeenCalledTimes(1);
  });

  //   it(`/GET purchases`, () => {
  //     return request(app.getHttpServer())
  //       .get('/cats')
  //       .expect(200)
  //       .expect({
  //         data: catsService.findAll(),
  //       });
  //   });
});

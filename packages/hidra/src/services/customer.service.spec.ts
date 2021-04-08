import { Connection, Repository } from 'typeorm';

import { typeormHelper } from '../../test/utils/typeormHelper';

import { Customer } from '../models/customer.model';
import { Purchase } from '../models/purchase.model';
import { Product } from '../models/product.model';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let repository: Repository<Customer>;
  let service: CustomerService;
  let db: Connection;

  beforeAll(async () => {
    db = await typeormHelper([Customer, Purchase, Product]);
  });

  beforeEach(async () => {
    repository = db.getRepository(Customer);
    service = new CustomerService(repository);
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM customers;`);
  });

  afterAll(async () => {
    await db.close();
  });

  describe('customers', () => {
    it('should list all customers', async () => {
      const customers = await repository.save([
        {
          id: '1',
          name: 'John Doe',
          email: 'johndoe@email.com',
          city: 'Teste',
          state: 'Teste',
          street: 'Teste',
          ignite: 'access',
          experts_club: 'no-access',
        },
        {
          id: '2',
          name: 'John Doe2',
          email: 'johndoe2@email.com',
          ignite: 'access',
          street: 'test',
          city: 'Teste',
          state: 'state',
          experts_club: 'no-access',
        },
      ]);

      expect(await service.findAll()).toEqual(customers);
    });

    it('should create a new customer', async () => {
      await service.create({
        id: '1',
        name: 'John Doe',
        email: 'johndoe@ea=mail.com',
        city: 'city',
        state: 'state',
        street: 'street',
        experts_club: '',
        ignite: 'access',
      });

      expect(await repository.findOne('1')).toBeTruthy();
    });

    it('should get customer by id', async () => {
      const customers = await repository.save([
        {
          id: '1',
          name: 'John Doe',
          email: 'johndoe@email.com',
          city: 'Teste',
          state: 'Teste',
          street: 'Teste',
          ignite: 'access',
          experts_club: 'no-access',
        },
        {
          id: '2',
          name: 'John Doe2',
          email: 'johndoe2@email.com',
          ignite: 'access',
          street: 'test',
          city: 'Teste',
          state: 'state',
          experts_club: 'no-access',
        },
      ]);

      expect(await service.findOne('1')).toEqual(customers[0]);
    });

    it('should get customer by email', async () => {
      const customers = await repository.save([
        {
          id: '1',
          name: 'John Doe',
          email: 'johndoe@email.com',
          city: 'Teste',
          state: 'Teste',
          street: 'Teste',
          ignite: 'access',
          experts_club: 'no-access',
        },
        {
          id: '2',
          name: 'John Doe2',
          email: 'johndoe2@email.com',
          ignite: 'access',
          street: 'test',
          city: 'Teste',
          state: 'state',
          experts_club: 'no-access',
        },
      ]);

      expect(await service.findByEmail('johndoe@email.com')).toEqual(
        customers[0],
      );
    });

    it('should return customers with pagination', async () => {
      const customers = await repository.save([
        {
          id: '1',
          name: 'John Doe',
          email: 'johndoe@email.com',
          city: 'Teste',
          state: 'Teste',
          street: 'Teste',
          ignite: 'access',
          experts_club: 'no-access',
        },
        {
          id: '2',
          name: 'John Doe3',
          email: 'johndoe3@email.com',
          ignite: 'access',
          street: 'test',
          city: 'Teste',
          state: 'state',
          experts_club: 'no-access',
        },
        {
          id: '4',
          name: 'John Doe4',
          email: 'johndoe4@email.com',
          ignite: 'access',
          street: 'test',
          city: 'Teste',
          state: 'state',
          experts_club: 'no-access',
        },
        {
          id: '5',
          name: 'John Doe5',
          email: 'johndoe5@email.com',
          ignite: 'access',
          street: 'test',
          city: 'Teste',
          state: 'state',
          experts_club: 'no-access',
        },
      ]);

      expect(await service.findAll(2, 1)).toEqual([customers[0], customers[1]]);
    });
  });
});

import { Connection, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { typeormHelper } from '../../test/utils/typeormHelper';

import { Customer } from '../models/customer.model';
import { AuthInput } from '../inputs/auth.input';
import { AuthService } from './auth.service';
import { CustomerService } from './customer.service';
import { Purchase } from '../models/purchase.model';
import { Product } from '../models/product.model';

describe('AuthResolver', () => {
  let repository: Repository<Customer>;

  let authService: AuthService;
  let jwtService: JwtService;
  let customerService: CustomerService;
  let db: Connection;

  beforeAll(async () => {
    db = await typeormHelper([Customer, Purchase, Product]);
  });

  beforeEach(async () => {
    repository = db.getRepository(Customer);
    jwtService = new JwtService({
      secret: 'quemroubouopaonacasadojoao',
      signOptions: { expiresIn: '1d' },
    });
    customerService = new CustomerService(repository);
    authService = new AuthService(customerService, jwtService);
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM customers;`);
  });

  afterAll(async () => {
    await db.close();
  });

  describe('auth', () => {
    it('should validate user through existing email', async () => {
      const customer = {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com',
        city: 'test-city',
        state: 'test-state',
        street: 'test-street',
        ignite: 'access',
        experts_club: 'no-access',
      };

      await customerService.save(customer);

      const authCustomer: AuthInput = {
        email: customer.email,
      };

      const response = await authService.validateUser(authCustomer);

      expect(response.token).toBeTruthy();
    });

    // it('should not validate user when email does not exist', async () => {
    //   const authCustomer: AuthInput = {
    //     email: 'wrong_email@test.com',
    //   };

    //   const response = await authService.validateUser(authCustomer);

    //   expect(response).toEqual('This user does not exists');
    // });
  });
});

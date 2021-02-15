import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './costumer.repository';

describe('CustomerService', () => {
  let customerService;
  let customerRepository;

  const mockProductRepository = () => ({
    createCustomer: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useFactory: mockProductRepository,
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
  });

  describe('create Customer', () => {
    it('should save a customer in the database', async () => {
      customerRepository.createCustomer.mockResolvedValue('someCustomer');

      expect(customerRepository.createCustomer).not.toHaveBeenCalled();

      const createCustomerDto = {
        name: 'sample name',
        identification: 'sample identification',
        address: 'sample address',
        phone: 'sample phone',
      };

      const result = await customerService.newCustomer(createCustomerDto);

      expect(customerRepository.createCustomer).toHaveBeenCalledWith(
        createCustomerDto,
      );
      expect(result).toEqual('someProduct');
    });
  });

})

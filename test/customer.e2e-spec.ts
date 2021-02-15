import { INestApplication, Post } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from '../src/customer/customer.module';
import { Customer } from '../src/customer/entities/customer.entity';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { GeneralResponse } from '../src/model/general-response.model';


let app: INestApplication;
let repository: Repository<Customer>;

beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CustomerModule,
        // Use the e2e_test database to run the tests
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'admin',
          database: 'e2e_test',
          entities: ['./**/*.entity.ts'],
          synchronize: false,
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    repository = module.get('CustomerRepository');
  });

  
afterEach(async () => {
    await repository.query(`DELETE FROM e2e_test.customer;`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Customer', () => {
    
      it(`/GET customer`, async () => {

        const result = await repository.save([
          {
              name: "test3",
              identification: "124Thh",
              address: "address test3",
              phone: "23456727",
          },
          {
              name: "test4",
              identification: "124Thh",
              address: "address test4",
              phone: "23456727"
          }
        ]);

        return request(app.getHttpServer())
          .get('/customer')
          .expect(200)
          .expect({
            data: result,
            message: 'Resources has been successfully returned.',
            status: 200
          });
      });

      // it(`/POST customer`, async () => {

      //   const result1 = await repository.save(
      //     {
      //         name: "test3",
      //         identification: "124Thh",
      //         address: "address test3",
      //         phone: "23456727",
      //         createdAt: "2021-02-14T19:07:58.281Z",
      //         updatedAt: "2021-02-14T08:08:01.391Z"
      //     });

      //     console.log(result1);
          

      //   return request(app.getHttpServer())
      //     .post('/customer')
      //     .expect(201)
      //     .expect({
      //       data: result1,
      //       message: 'The resource has been successfully created.',
      //       status: 201
      //     });
      // });
  
  });
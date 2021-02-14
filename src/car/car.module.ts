import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { Car } from './entities/car.entity';
import { CustomerService } from '../customer/customer.service';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Car, Customer])
  ],
  controllers: [CarController],
  providers: [CarService, CustomerService]
})
export class CarModule {}

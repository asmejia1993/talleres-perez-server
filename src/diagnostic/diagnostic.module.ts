import { Module } from '@nestjs/common';
import { DiagnosticService } from './diagnostic.service';
import { DiagnosticController } from './diagnostic.controller';
import { CarService } from 'src/car/car.service';
import { CarDiagnostic } from './entities/diagnostic.entity';
import { Car } from 'src/car/entities/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { CustomerService } from '../customer/customer.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([CarDiagnostic, Car, Customer])
  ],
  providers: [DiagnosticService, CarService, CustomerService],
  controllers: [DiagnosticController]
})
export class DiagnosticModule {}

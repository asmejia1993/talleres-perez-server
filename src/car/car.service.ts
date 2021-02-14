import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarService {

    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
       ){}

    async newCarByCustomer(dto: CreateCarDto) {
        const customer = await this.customerRepository.findOne(dto.cus.id);
        if (customer) {
            const car = this.carRepository.create(dto);
            car.cus = customer;
            return await this.carRepository.save(car);
        }
        
    }

}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>, 
        ){}

    async getCustomers(){
        return this.customerRepository.find();
    }

    async newCustomer(dto: CreateCustomerDto){
        const customer = this.customerRepository.create(dto);
        return await this.customerRepository.save(customer);
    }

    async getCustomerById(id: number) {
        return this.customerRepository.findOne(id);
    }

    async getCarsByCustomer(id: number) {
        const customer = await this.customerRepository.findOne(id, {
            relations: ['cars']
        });
        return customer;
    }
}

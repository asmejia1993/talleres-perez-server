import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GeneralResponse } from '../model/general-response.model';

@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {}

    @Get()
    async getCustomer() {
        const customer = await this.customerService.getCustomers();
        return new GeneralResponse(HttpStatus.OK, "Resources obtened successfully", customer);
    }

    @Post()
    async newCustomer(@Body() dto:CreateCustomerDto) {
        const newCostumer = await this.customerService.newCustomer(dto);
        return new GeneralResponse(HttpStatus.OK, "Resources created successfully", newCostumer);
    }

    @Get(':id')
    async getCarsByCustomer(@Param('id', ParseIntPipe) id: number) {
        const data = await this.customerService.getCarsByCustomer(id);
        if (data) {
            return new GeneralResponse(HttpStatus.OK, "Resources obtened successfully", data);
        }
        return new GeneralResponse(HttpStatus.NOT_FOUND, "Resources not found", null);
    }
}

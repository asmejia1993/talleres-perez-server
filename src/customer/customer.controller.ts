import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GeneralResponse } from '../model/general-response.model';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Customer Controller')
@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Resources has been successfully returned.'})
    async getCustomer() {
        const customer = await this.customerService.getCustomers();
        return new GeneralResponse(HttpStatus.OK, 'Resources has been successfully returned.', customer);
    }

    @Post()
    @ApiBody({ type: [CreateCustomerDto] })
    @ApiResponse({ status: 201, description: 'The resource has been successfully created.'})
    async newCustomer(@Body() dto:CreateCustomerDto) {
        const newCostumer = await this.customerService.newCustomer(dto);
        return new GeneralResponse(HttpStatus.CREATED, 'The resource has been successfully created.', newCostumer);
    }

    @Get(':id')
    @ApiResponse({ status: 201, description: 'Resource has been successfully returned.'})
    async getCarsByCustomer(@Param('id', ParseIntPipe) id: number) {
        const data = await this.customerService.getCarsByCustomer(id);
        if (data) {
            return new GeneralResponse(HttpStatus.OK, 'Resource has been successfully returned.', data);
        }
        return new GeneralResponse(HttpStatus.NOT_FOUND, "Resource has not been found", null);
    }
}

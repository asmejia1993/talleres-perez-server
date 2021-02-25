import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, HttpException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GeneralResponse } from '../model/general-response.model';
import { ApiBody, ApiResponse, ApiTags, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';

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
    @ApiBadRequestResponse({ status: 404, description: 'The resource has not created.'})
    async newCustomer(@Body() dto:CreateCustomerDto) {
        const newCostumer = await this.customerService.newCustomer(dto);
        if (newCostumer) {
            return new GeneralResponse(HttpStatus.CREATED, 'The resource has been successfully created.', newCostumer);
        }
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            message: 'The resource has not created.',
            data: null
          }, HttpStatus.BAD_REQUEST);
    }

    @Get(':id')
    @ApiResponse({ status: 201, description: 'Resource has been successfully returned.'})
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'The resource has not been found.'})
    async getCarsByCustomer(@Param('id', ParseIntPipe) id: number) {
        const data = await this.customerService.getCarsByCustomer(id);
        if (data) {
            return new GeneralResponse(HttpStatus.OK, 'Resource has been successfully returned.', data);
        }
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            message: 'The resource has not been found.',
            data: null
          }, HttpStatus.NOT_FOUND);
    }
}

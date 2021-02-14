import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { GeneralResponse } from 'src/model/general-response.model';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('car')
export class CarController {

    constructor(private readonly customerService: CustomerService,
                private readonly carService:CarService) {}

    @Post()
    async newCarByCustomer(@Body() dto: CreateCarDto) {

        const carDto = await this.carService.newCarByCustomer(dto);
        return new GeneralResponse(HttpStatus.OK, "Resources created successfully", carDto);
    }

}

import { Body, Controller, Post, HttpStatus, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GeneralResponse } from 'src/model/general-response.model';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('car')
export class CarController {

    constructor(private readonly carService:CarService) {}

    @Post()
    async newCarByCustomer(@Body() dto: CreateCarDto) {

        const carDto = await this.carService.newCarByCustomer(dto);
        return new GeneralResponse(HttpStatus.OK, "Resources created successfully", carDto);
    }

    @Get(':id')
    async getDiagnosticByCar(@Param('id', ParseIntPipe) id: number) {
        const result = await this.carService.getDiagnosticByCar(id);
        return new GeneralResponse(HttpStatus.OK, "Resources created successfully", result);
    }

}

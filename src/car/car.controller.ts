import { Body, Controller, Post, HttpStatus, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeneralResponse } from 'src/model/general-response.model';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';


@ApiTags('Car Controller')
@Controller('car')
export class CarController {

    constructor(private readonly carService:CarService) {}

    @Post()
    @ApiBody({ type: [CreateCarDto] })
    @ApiResponse({ status: 201, description: 'The resource has been successfully created.'})
    async newCarByCustomer(@Body() dto: CreateCarDto) {

        const carDto = await this.carService.newCarByCustomer(dto);
        return new GeneralResponse(HttpStatus.CREATED, 'The resource has been successfully created.', carDto);
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Resource has been successfully returned.'})
    async getDiagnosticByCar(@Param('id', ParseIntPipe) id: number) {
        const result = await this.carService.getDiagnosticByCar(id);
        return new GeneralResponse(HttpStatus.OK, 'Resource has been successfully returned.', result);
    }

}

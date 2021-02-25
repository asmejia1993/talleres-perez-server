import { Body, Controller, Post, HttpStatus, Get, Param, ParseIntPipe, HttpCode, HttpException } from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeneralResponse } from '../model/general-response.model';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';


@ApiTags('Car Controller')
@Controller('car')
export class CarController {

    constructor(private readonly carService:CarService) {}

    @Post()
    @ApiBody({ type: [CreateCarDto] })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'The resource has not been created, customer not found.'})
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The resource has been successfully created.'})
    async newCarByCustomer(@Body() dto: CreateCarDto) {
        const carDto = await this.carService.newCarByCustomer(dto);
        if (carDto) {
            return new GeneralResponse(HttpStatus.CREATED, 'The resource has been successfully created.', carDto);
        }
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            message: 'The resource has not been created, customer not found.',
            data: null
          }, HttpStatus.NOT_FOUND);
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Resource has been successfully returned.'})
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'The resource has not been found.'})
    async getDiagnosticByCar(@Param('id', ParseIntPipe) id: number) {
        const result = await this.carService.getDiagnosticByCar(id);
        if (result) {
            return new GeneralResponse(HttpStatus.OK, 'Resource has been successfully returned.', result);
        }
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            message: 'The resource has not found.',
            data: null
          }, HttpStatus.NOT_FOUND);
    }

}

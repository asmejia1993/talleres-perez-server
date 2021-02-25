import { Body, Controller, Get, HttpStatus, Post, HttpException } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags, ApiNotFoundResponse } from '@nestjs/swagger';
import { GeneralResponse } from '../model/general-response.model';
import { DiagnosticService } from './diagnostic.service';
import { CreateCarDiagnosticDto } from './dto/create-car-diagnostic.dto';


@ApiTags('Diagnostic & Analysis Controller')
@Controller('diagnostic')
export class DiagnosticController {

    constructor(private readonly diagService: DiagnosticService){}

    
    @Post()
    @ApiBody({ type: [CreateCarDiagnosticDto] })
    @ApiResponse({ status: 201, description: 'The resource has been successfully created.'})
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'The resource has not been created, car not found.'})
    async newCarByCustomer(@Body() dto: CreateCarDiagnosticDto) {
        const carDiag = await this.diagService.newCarDiagnostic(dto);
        if (carDiag) {
            return new GeneralResponse(HttpStatus.CREATED, "The resource has been successfully created.", carDiag);
        }
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            message: 'The resource has not been created, car not found.',
            data: null
          }, HttpStatus.NOT_FOUND);
    }


    @Get()
    @ApiResponse({ status: 200, description: 'Resource has been successfully returned.'})
    async getCarDiagnostic() {
        const diagnostics = await this.diagService.getAllDiagnostics();
        return new GeneralResponse(HttpStatus.OK, 'Resources has been successfully returned.', diagnostics);
    }

}
 
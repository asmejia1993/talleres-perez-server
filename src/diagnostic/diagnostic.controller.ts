import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeneralResponse } from 'src/model/general-response.model';
import { DiagnosticService } from './diagnostic.service';
import { CreateCarDiagnosticDto } from './dto/create-car-diagnostic.dto';


@ApiTags('Diagnostic & Analysis Controller')
@Controller('diagnostic')
export class DiagnosticController {

    constructor(private readonly diagService: DiagnosticService){}

    
    @Post()
    @ApiBody({ type: [CreateCarDiagnosticDto] })
    @ApiResponse({ status: 201, description: 'The resource has been successfully created.'})
    async newCarByCustomer(@Body() dto: CreateCarDiagnosticDto) {
        const carDiag = await this.diagService.newCarDiagnostic(dto);
        return new GeneralResponse(HttpStatus.CREATED, "The resource has been successfully created.", carDiag);
    }


    @Get()
    @ApiResponse({ status: 200, description: 'Resource has been successfully returned.'})
    async getCarDiagnostic() {
        const diagnostics = await this.diagService.getAllDiagnostics();
        return new GeneralResponse(HttpStatus.OK, 'Resources has been successfully returned.', diagnostics);
    }

}
 
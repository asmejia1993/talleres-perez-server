import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { GeneralResponse } from 'src/model/general-response.model';
import { DiagnosticService } from './diagnostic.service';
import { CreateCarDiagnosticDto } from './dto/create-car-diagnostic.dto';

@Controller('diagnostic')
export class DiagnosticController {

    constructor(private readonly diagService: DiagnosticService){}

    @Post()
    async newCarByCustomer(@Body() dto: CreateCarDiagnosticDto) {

        const carDiag = await this.diagService.newCarDiagnostic(dto);
        return new GeneralResponse(HttpStatus.OK, "Resources created successfully", carDiag);
    }

    @Get()
    async getCarDiagnostic() {
        const diagnostics = await this.diagService.getAllDiagnostics();
        return new GeneralResponse(HttpStatus.OK, "Resources created successfully", diagnostics);
    }

}

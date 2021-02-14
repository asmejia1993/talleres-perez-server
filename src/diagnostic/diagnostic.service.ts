import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarDiagnostic } from './entities/diagnostic.entity';
import { CreateCarDiagnosticDto } from './dto/create-car-diagnostic.dto';
import { Car } from 'src/car/entities/car.entity';

@Injectable()
export class DiagnosticService {

    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>,
        @InjectRepository(CarDiagnostic)
        private readonly diagRepository: Repository<CarDiagnostic>,
    ){}

    async newCarDiagnostic(dto: CreateCarDiagnosticDto) {
        const car = await this.carRepository.findOne(dto.car.id);
        if (car) {
            const diagnostic = this.diagRepository.create(dto);
            diagnostic.car = car;
            return await this.diagRepository.save(diagnostic);
        }
    }

    async getAllDiagnostics() {
        const diagnostics = this.diagRepository.find({order: {createdAt: 'DESC'}});
        return diagnostics;
    }

}

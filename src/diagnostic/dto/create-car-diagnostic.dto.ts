import { Car } from "src/car/entities/car.entity";

export class CreateCarDiagnosticDto {
    errorCode: string;
    description: string;
    status: string;
    car: Car;
}
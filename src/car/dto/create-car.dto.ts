import { Customer } from "src/customer/entities/customer.entity";

export class CreateCarDto {
    model: string;
    brand: string;
    year: number;
    engine: string;
    cus: Customer;
}
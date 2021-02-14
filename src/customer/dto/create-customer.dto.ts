import { IsString } from "class-validator";

export class CreateCustomerDto {
    
    @IsString()
    name: string;

    @IsString()
    identification: string;

    @IsString()
    address: string;

    @IsString()
    phone: string;
}
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
export class GeneralResponse {

    @ApiProperty()
    status: HttpStatus;

    @ApiProperty()
    message: string;

    @ApiProperty()
    data: any;

    constructor(status: HttpStatus, message: string, data: any) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}
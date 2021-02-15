import { HttpStatus } from '@nestjs/common';
export class GeneralResponse {

    status: HttpStatus;
    message: string;
    data: any;

    constructor(status: HttpStatus, message: string, data: any) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}
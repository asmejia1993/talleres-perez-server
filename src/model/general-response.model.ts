export class GeneralResponse {

    status: number;
    message: string;
    data: any;

    constructor(status: number, message: string, data: any) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}
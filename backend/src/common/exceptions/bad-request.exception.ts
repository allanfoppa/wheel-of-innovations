import { HttpException, HttpStatus } from "@nestjs/common";

export class BadRequestException extends HttpException {
  constructor() {
    super('BAD REQUEST', HttpStatus.BAD_REQUEST);
  }
}

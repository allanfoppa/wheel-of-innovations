import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Controller('seeds')
export class SeedsController {
  constructor(
    private responseHelper: ResponseHelper,
    private readonly seedsService: SeedsService
  ) {}

  @Get('all')
  async seedAll() {
    try {
      // VALIDATE - N/A

      // PROCESS
      await this.seedsService.seedAll();

      // RESPONSE
      return this.responseHelper.createResponse(
        "Seed all with success.",
      );

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('back')
  async seedBack() {
    try {
      await this.seedsService.seedBack();

      return this.responseHelper.createResponse(
        "Seed backend with success.",
      );

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('front')
  async seedFront() {
    try {
      await this.seedsService.seedFront();

      return this.responseHelper.createResponse(
        "Seed frontend with success.",
      );

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('database')
  async database() {
    try {
      await this.seedsService.seedDatabase();

      return this.responseHelper.createResponse(
        "Seed database with success.",
      );

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

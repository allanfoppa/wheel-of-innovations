import { Controller, Get, HttpCode } from '@nestjs/common';
import { SeedsService } from './seeds.service';

@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Get('all')
  async seedAll() {
    return await this.seedsService.seedBack();
  }

  @Get('back')
  async seedBack() {
    return await this.seedsService.seedBack();
  }

  @Get('front')
  async seedFront() {
    return await this.seedsService.seedFront();
  }

  @Get('database')
  async database() {
    return await this.seedsService.seedDatabase();
  }
}

import { Controller, Get, HttpCode } from '@nestjs/common';
import { SeedsService } from './seeds.service';

@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Get('back')
  async seedBackLangs() {
    return await this.seedsService.seedBack();
  }
}

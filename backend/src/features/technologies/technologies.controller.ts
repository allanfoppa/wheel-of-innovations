import { Controller, Get, InternalServerErrorException, UseInterceptors } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { CACHE_TECHNOLOGIES } from 'src/common/constants/cache-constant';

@Controller('technologies')
export class TechnologiesController {
  constructor(
    private responseHelper: ResponseHelper,
    private readonly technologiesService: TechnologiesService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey(CACHE_TECHNOLOGIES.NAME)
  @Get()
  async getList(): Promise<any> {

    try {
      let response = await this.technologiesService.getList();

      return this.responseHelper.createResponse(
        "List with all technologies load with success.",
        response
      );

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

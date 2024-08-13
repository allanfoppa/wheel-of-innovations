import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Controller('technologies')
export class TechnologiesController {
  constructor(
    private responseHelper: ResponseHelper,
    private readonly technologiesService: TechnologiesService
  ) {}

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

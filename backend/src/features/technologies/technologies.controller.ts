import { Controller, Get, InternalServerErrorException, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { CACHE_TECHNOLOGIES } from 'src/common/constants/cache-constant';
import { NotEmptyPipe } from 'src/common/pipes/not-empty.pipe';

@Controller('technologies')
export class TechnologiesController {
  constructor(
    private responseHelper: ResponseHelper,
    private readonly technologiesService: TechnologiesService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey(CACHE_TECHNOLOGIES.ALL_TECHNOLOGIES)
  @Get('all')
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

  @UseInterceptors(CacheInterceptor)
  @CacheKey(CACHE_TECHNOLOGIES.BACK_LANG_TECHNOLOGIES)
  @Get('back-langs')
  async getBackLangList(): Promise<any> {

    try {
      let response = await this.technologiesService.getBackLangs();

      return this.responseHelper.createResponse(
        "List with all backend languages load with success.",
        response
      );

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('back-frameworks/:backLangId')
  async getBackFrameworksByBackId(
    @Param('backLangId', NotEmptyPipe, ParseIntPipe) backLangId: number
  ): Promise<any> {

    try {
      let response =
        await this.technologiesService.getBackFrameworksByBackLangId(backLangId);

      return this.responseHelper.createResponse(
        "List with all backend framework load with success.",
        response
      );

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(CACHE_TECHNOLOGIES.DATABASE_TECHNOLOGIES)
  @Get('database')
  async getDatabaseList(): Promise<any> {

    try {
      let response = await this.technologiesService.getDatabases();

      return this.responseHelper.createResponse(
        "List with all database load with success.",
        response
      );

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(CACHE_TECHNOLOGIES.FRONT_LANG_TECHNOLOGIES)
  @Get('front-langs')
  async getFrontLangList(): Promise<any> {

    try {
      let response = await this.technologiesService.getFrontLangList();

      return this.responseHelper.createResponse(
        "List with all frontend languages load with success.",
        response
      );

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('front-frameworks/:frontLangId')
  async getFrontFrameworksByFrontLangId(
    @Param('frontLangId', NotEmptyPipe, ParseIntPipe) frontLangId: number
  ): Promise<any> {

    try {
      let response =
        await this.technologiesService.getFrontFrameworksByFrontLangId(frontLangId);

      return this.responseHelper.createResponse(
        "List with all frontend framework load with success.",
        response
      );

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}

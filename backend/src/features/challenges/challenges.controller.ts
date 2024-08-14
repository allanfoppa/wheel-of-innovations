import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, UsePipes } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { createChallengeSchema } from './schema/create-challenge.schema';

@Controller('challenges')
export class ChallengesController {
  constructor(
    private readonly responseHelper: ResponseHelper,
    private readonly challengesService: ChallengesService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createChallengeSchema))
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    try {
      let response = await this.challengesService.create(createChallengeDto);

      return this.responseHelper.createResponse(
        "Challenge create with success.",
        response
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const response = await this.challengesService.findAll();

      return this.responseHelper.createResponse(
        "Challenge list retrived with success.",
        response
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.challengesService.findOne(+id);

      return this.responseHelper.createResponse(
        `Challenge ${id} retrived with success.`,
        response
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    try {
      const response = await this.challengesService.update(+id, updateChallengeDto);

      return this.responseHelper.createResponse(
        `Challenge ${id} was update to status ${updateChallengeDto.isCompleted}.`,
        response
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const response = await this.challengesService.remove(+id);

      return this.responseHelper.createResponse(
        `Challenge ${id} was deleted with success.`
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }
}

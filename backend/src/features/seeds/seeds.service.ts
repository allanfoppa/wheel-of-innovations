import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackLang } from 'src/database/entities/back-lang.entity';
import { BackFramework } from 'src/database/entities/back-framework.entity';
import { Repository } from 'typeorm';
import { FrontLang } from 'src/database/entities/front-lang.entity';
import { FrontFramework } from 'src/database/entities/front-framework.entity';
import { DatabaseLanguage } from 'src/database/entities/database-lang.entity';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { backTechnologies, databaseTechnologies, frontTechnologies } from 'src/common/constants/technologies.constant';

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(BackLang)
    private backLangRepository: Repository<BackLang>,
    @InjectRepository(BackFramework)
    private backFrameworkRepository: Repository<BackFramework>,
    @InjectRepository(FrontLang)
    private frontLangRepository: Repository<FrontLang>,
    @InjectRepository(FrontFramework)
    private frontFrameworkRepository: Repository<FrontFramework>,
    @InjectRepository(DatabaseLanguage)
    private databaseLanguage: Repository<DatabaseLanguage>,
    private responseHelper: ResponseHelper,
  ) {}

  async seedAll() {
    try {
      await this.seedBack();
      await this.seedFront();
      await this.seedDatabase();

      return this.responseHelper.createResponse(
        "Seed all with success.",
      );

    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async seedBack() {

    try {
      // 1º RUN AT TECHNOLOGIES LIST
      for (const technology of backTechnologies) {
        // 2º CREATE A BACKLANG
        const backLang = this.backLangRepository.create({ name: technology.name });
        let backId = await this.backLangRepository.save(backLang);

        // 3º RUN AT FRAMEWORKS LIST
        for (const framework of technology.frameworks) {
          // 4º CREATE A BACKFRAMEWORK
          const backFramework = this.backFrameworkRepository.create({
            name: framework,
            backLang: backId
          });
          await this.backFrameworkRepository.save(backFramework);
        }
      }

      return this.responseHelper.createResponse(
        "Seed backend with success.",
      );

    } catch (error) {
      throw new InternalServerErrorException();
    }

  }

  async seedFront() {

    try {
      // 1º RUN AT TECHNOLOGIES LIST
      for (const technology of frontTechnologies) {
        // 2º CREATE A FRONTLANG
        const frontLang = this.frontLangRepository.create({ name: technology.name });
        let frontId = await this.frontLangRepository.save(frontLang);

        // 3º RUN AT FRAMEWORKS LIST
        for (const framework of technology.frameworks) {
          // 4º CREATE A FRONTFRAMEWORK
          const frontFramework = this.frontFrameworkRepository.create({
            name: framework,
            frontLang: frontId
          });
          await this.frontFrameworkRepository.save(frontFramework);
        }
      }

      return this.responseHelper.createResponse(
        "Seed frontend with success.",
      );

    } catch (error) {
      throw new InternalServerErrorException();
    }

  }

  async seedDatabase() {

    try {
      for (const technology of databaseTechnologies) {
        const databaseName = this.databaseLanguage.create({ name: technology.name });
        await this.databaseLanguage.save(databaseName);
      }

      return this.responseHelper.createResponse(
        "Seed database with success.",
      );

    } catch (error) {
      throw new InternalServerErrorException();
    }

  }

}

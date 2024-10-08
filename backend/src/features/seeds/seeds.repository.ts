import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackLang } from 'src/database/entities/back-lang.entity';
import { BackFramework } from 'src/database/entities/back-framework.entity';
import { Repository } from 'typeorm';
import { FrontLang } from 'src/database/entities/front-lang.entity';
import { FrontFramework } from 'src/database/entities/front-framework.entity';
import { DatabaseLanguage } from 'src/database/entities/database-lang.entity';
import { backTechnologies, databaseTechnologies, frontTechnologies } from 'src/common/constants/technologies.constant';

@Injectable()
export class SeedsRepository {
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
  ) {}

  async seedBack() {

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

  }

  async seedFront() {
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
  }

  async seedDatabase() {
    for (const technology of databaseTechnologies) {
      const databaseName = this.databaseLanguage.create({ name: technology.name });
      await this.databaseLanguage.save(databaseName);
    }
  }

}

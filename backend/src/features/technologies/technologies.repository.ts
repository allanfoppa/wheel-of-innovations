import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackFramework } from 'src/database/entities/back-framework.entity';
import { BackLang } from 'src/database/entities/back-lang.entity';
import { DatabaseLanguage } from 'src/database/entities/database-lang.entity';
import { FrontFramework } from 'src/database/entities/front-framework.entity';
import { FrontLang } from 'src/database/entities/front-lang.entity';
import { Repository } from 'typeorm';

export interface TechnologyPayload {
  backLangs: BackLang[];
  backFrameworks: BackFramework[];
  frontLangs: FrontLang[];
  frontFrameworks: FrontFramework[];
  databaseLanguages: DatabaseLanguage[];
}

@Injectable()
export class TechnologiesRepository {

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
    private databaseLanguageRepository: Repository<DatabaseLanguage>,
  ) {}

  async getList(): Promise<TechnologyPayload> {
    const [
      backLangs,
      backFrameworks,
      frontLangs,
      frontFrameworks,
      databaseLanguages
    ] = await Promise.all([
      this.getBackLangs(),
      this.getBackFrameworks(),
      this.getFrontLangs(),
      this.getFrontFrameworks(),
      this.getDataBaseLanguages(),
    ]);

    return {
      backLangs,
      backFrameworks,
      frontLangs,
      frontFrameworks,
      databaseLanguages,
    };
  }

  private async getBackLangs() {
    return await this.backLangRepository.find()
  }

  private async getBackFrameworks() {
    return await this.backFrameworkRepository.find({
      relations: {
        backLang: true,
      },
    })
  }

  private async getFrontLangs() {
    return await this.frontLangRepository.find()
  }

  private async getFrontFrameworks() {
    return await this.frontFrameworkRepository.find({
      relations: {
        frontLang: true,
      },
    })
  }

  private async getDataBaseLanguages() {
    return await this.databaseLanguageRepository.find()
  }
}

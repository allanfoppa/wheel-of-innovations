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

  async getBackLangs(): Promise<BackLang[]> {
    return await this.backLangRepository.find()
  }

  async getBackFrameworks(): Promise<BackFramework[]> {
    return await this.backFrameworkRepository.find({
      relations: {
        backLang: true,
      },
    })
  }

  async getBackFrameworksByBackLangId(backLangId: number): Promise<BackFramework[]> {
    return await this.backFrameworkRepository.find({
      where: {
        backLang: {
          id: backLangId
        }
      },
      relations: ['backLang']
    })
  }

  async getFrontLangs(): Promise<FrontLang[]> {
    return await this.frontLangRepository.find()
  }

  async getFrontFrameworks(): Promise<FrontFramework[]> {
    return await this.frontFrameworkRepository.find({
      relations: {
        frontLang: true,
      },
    })
  }

  async getFrontFrameworksByFrontLangId(frontLangId: number): Promise<FrontFramework[]> {
    return await this.frontFrameworkRepository.find({
      where: {
        frontLang: {
          id: frontLangId
        }
      },
      relations: ['frontLang']
    })
  }

  async getDataBaseLanguages(): Promise<DatabaseLanguage[]> {
    return await this.databaseLanguageRepository.find()
  }
}

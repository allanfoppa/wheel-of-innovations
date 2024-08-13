import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenges } from 'src/database/entities/challenge.entity';
import { Repository } from 'typeorm';
import { BackLang } from 'src/database/entities/back-lang.entity';
import { BackFramework } from 'src/database/entities/back-framework.entity';
import { FrontLang } from 'src/database/entities/front-lang.entity';
import { FrontFramework } from 'src/database/entities/front-framework.entity';
import { DatabaseLanguage } from 'src/database/entities/database-lang.entity';

@Injectable()
export class QueriesHelper {

  constructor(
    @InjectRepository(Challenges)
    private readonly challengesRepository: Repository<Challenges>,
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

  async backLangFindOne(id: number) {

    const backLang = await this.backLangRepository.findOne({
      where: {
        id,
      },
    });
    if (backLang === null) throw new BadRequestException('Back Language not found');

    return backLang;
  }

  async backFrameworkFindOne(id: number) {
    const backFramework = await this.backFrameworkRepository.findOne({
      where: {
        id,
      },
    });
    if (backFramework === null) throw new BadRequestException('Back Framework not found');

    return backFramework
  }

  async frontLangFindOne(id: number) {
    const frontLang = await this.frontLangRepository.findOne({
      where: {
        id,
      },
    });
    if (frontLang === null) throw new BadRequestException('Front Language not found');

    return frontLang;
  }

  async frontFrameworkFindOne(id: number) {
    const frontFramework = await this.frontFrameworkRepository.findOne({
      where: {
        id,
      },
    });
    if (frontFramework === null) throw new BadRequestException('Front framework not found');

    return frontFramework;
  }

  async databaseLanguageFindOne(id: number) {
    const databaseLanguage = await this.databaseLanguageRepository.findOne({
      where: {
        id,
      },
    });
    if (databaseLanguage === null) throw new BadRequestException('Database language not found');

    return databaseLanguage;
  }

  async challengeFindOne(id: number) {
    const challenge = await this.challengesRepository.findOne({
      where: {
        id,
      },
    });
    if (challenge === null) throw new BadRequestException('Challenge not found');

    return challenge;
  }

}

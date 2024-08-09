import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Challenges } from '../../database/entities/challenge.entity';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { CHALLENGE_REPOSITORY } from 'src/database/database.constants';
import { BackLang } from 'src/database/entities/back-lang.entity';
import { BackFramework } from 'src/database/entities/back-framework.entity';
import { DatabaseLanguage } from 'src/database/entities/database-lang.entity';
import { FrontLang } from 'src/database/entities/front-lang.entity';
import { FrontFramework } from 'src/database/entities/front-framework.entity';

@Injectable()
export class ChallengeService {
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private repository: Repository<Challenges>,
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<any> {
  // async create(createChallengeDto: CreateChallengeDto): Promise<Challenges> {
    const { backLangId, backFrameworkId, databaseId, frontLangId, frontFrameworkId, ...rest } = createChallengeDto;

    // const challenge = this.repository.create({
    //   ...rest,
    //   backLangd: { id: backLangId } as BackLang,
    //   backFramework: { id: backFrameworkId } as BackFramework,
    //   database: { id: databaseId } as DatabaseLanguage,
    //   frontLang: { id: frontLangId } as FrontLang,
    //   frontFramework: { id: frontFrameworkId } as FrontFramework,
    // });

    // return this.repository.save(challenge);
  }

  findAll(): Promise<Challenges[]> {
    return this.repository.find({ relations: ['backLang', 'backFramework', 'database', 'frontLang', 'frontFramework'] });
  }

  async findOne(id: number): Promise<Challenges> {
    const challenge = await this.repository.findOne({
      where: {
        id: id
      }
    });
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    return challenge;
  }

  async update(id: number, updateChallengeDto: UpdateChallengeDto): Promise<Challenges> {
    const { backLangId, backFrameworkId, databaseId, frontLangId, frontFrameworkId, ...rest } = updateChallengeDto;

    const challenge = await this.findOne(id);

    Object.assign(challenge, {
      ...rest,
      backLang: { id: backLangId } as BackLang,
      backFramework: { id: backFrameworkId } as BackFramework,
      database: { id: databaseId } as DatabaseLanguage,
      frontLang: { id: frontLangId } as FrontLang,
      frontFramework: { id: frontFrameworkId } as FrontFramework,
    });

    return this.repository.save(challenge);
  }

  async remove(id: number): Promise<void> {
    const challenge = await this.findOne(id);
    await this.repository.remove(challenge);
  }
}

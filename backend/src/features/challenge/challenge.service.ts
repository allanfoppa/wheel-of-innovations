import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { BackLang } from 'src/common/entities/back-lang.entity';
import { BackFramework } from 'src/common/entities/back-framework.entity';
import { DatabaseLanguage } from 'src/common/entities/database-lang.entity';
import { FrontLang } from 'src/common/entities/front-lang.entity';
import { FrontFramework } from 'src/common/entities/front-framework.entity';
import { CHALLENGE_REPOSITORY } from 'src/database/database.constants';

@Injectable()
export class ChallengeService {
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private repository: Repository<Challenge>,
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    const { backLangId, backFrameworkId, databaseId, frontLangId, frontFrameworkId, ...rest } = createChallengeDto;

    const challenge = this.repository.create({
      ...rest,
      backLang: { id: backLangId } as BackLang,
      backFramework: { id: backFrameworkId } as BackFramework,
      database: { id: databaseId } as DatabaseLanguage,
      frontLang: { id: frontLangId } as FrontLang,
      frontFramework: { id: frontFrameworkId } as FrontFramework,
    });

    return this.repository.save(challenge);
  }

  findAll(): Promise<Challenge[]> {
    return this.repository.find({ relations: ['backLang', 'backFramework', 'database', 'frontLang', 'frontFramework'] });
  }

  async findOne(id: number): Promise<Challenge> {
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

  async update(id: number, updateChallengeDto: UpdateChallengeDto): Promise<Challenge> {
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

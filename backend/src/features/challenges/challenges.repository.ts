import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenges } from 'src/database/entities/challenge.entity';
import { Repository } from 'typeorm';
import { QueriesHelper } from 'src/common/helpers/queries.helper';

@Injectable()
export class ChallengesRepository {

  constructor(
    @InjectRepository(Challenges)
    private readonly challengesRepository: Repository<Challenges>,
    private queriesHelper: QueriesHelper
  ) {}

  async create(createChallengeDto: CreateChallengeDto) {
    const challenge = this.challengesRepository.create({
      backLang: await this.queriesHelper.backLangFindOne(createChallengeDto.backLang),
      backFramework: await this.queriesHelper.backFrameworkFindOne(createChallengeDto.backFramework),
      frontLang: await this.queriesHelper.frontLangFindOne(createChallengeDto.frontLang),
      frontFramework: await this.queriesHelper.frontFrameworkFindOne(createChallengeDto.frontFramework),
      databaseLanguage: await this.queriesHelper.databaseLanguageFindOne(createChallengeDto.databaseLanguage),
      isDesignNeeded: createChallengeDto.isDesignNeeded,
      deadline: createChallengeDto.deadline,
    });
    const response = await this.challengesRepository.save(challenge);

    return response;
  }

  async findAll() {

    const response = await this.challengesRepository.find({
      relations: [
        'backLang',
        'backFramework',
        'frontLang',
        'frontFramework',
        'databaseLanguage'
      ]
    });

    return response;
  }

  async findOne(id: number) {
    const response = await this.queriesHelper.challengeFindOne(id);

    return response;
  }

  async update(id: number, updateChallengeDto: UpdateChallengeDto) {

    const challenge = await this.queriesHelper.challengeFindOne(id);
    const response = await this.challengesRepository.save({
      ...challenge,
      isCompleted: updateChallengeDto.isCompleted
    });

    return response;
  }

  async remove(id: number) {

    const challenge = await this.queriesHelper.challengeFindOne(id);
    const response = await this.challengesRepository.remove([challenge]);

    return response;
  }
}

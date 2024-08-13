import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengesRepository } from './challenges.repository';

@Injectable()
export class ChallengesService {

  constructor(
    private readonly challengesRepository: ChallengesRepository
  ) {}

  async create(createChallengeDto: CreateChallengeDto) {
    return await this.challengesRepository.create(createChallengeDto);
  }

  async findAll() {
    return await this.challengesRepository.findAll();
  }

  async findOne(id: number) {
    return await this.challengesRepository.findOne(id);
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return this.challengesRepository.update(id, updateChallengeDto);
  }

  remove(id: number) {
    return this.challengesRepository.remove(id);
  }
}

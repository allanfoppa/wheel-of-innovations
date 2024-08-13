import { Injectable } from '@nestjs/common';
import { TechnologiesRepository, TechnologyPayload } from './technologies.repository';

@Injectable()
export class TechnologiesService {

  constructor(
    private technologiesRepository: TechnologiesRepository
  ) {}

  async getList(): Promise<TechnologyPayload> {
    return await this.technologiesRepository.getList();
  }
}

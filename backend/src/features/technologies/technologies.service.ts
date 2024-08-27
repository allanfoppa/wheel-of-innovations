import { Injectable } from '@nestjs/common';
import { TechnologiesRepository, TechnologyPayload } from './technologies.repository';
import { CACHE_TECHNOLOGIES } from 'src/common/constants/cache-constant';
import { CacheManagerService } from 'src/common/services/cache-manager/cache-manager.service';

@Injectable()
export class TechnologiesService {

  constructor(
    private technologiesRepository: TechnologiesRepository,
    private readonly cacheManagerService: CacheManagerService
  ) {}

  async getList(): Promise<TechnologyPayload> {
    const cachedValue = await this.cacheManagerService.get<TechnologyPayload>(CACHE_TECHNOLOGIES.NAME);
    if (cachedValue) return cachedValue;

    const response = await this.technologiesRepository.getList();
    await this.cacheManagerService.set(CACHE_TECHNOLOGIES.NAME, response, CACHE_TECHNOLOGIES.TTL);

    return response;
  }
}

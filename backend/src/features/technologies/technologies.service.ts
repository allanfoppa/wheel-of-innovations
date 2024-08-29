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
    const cachedValue = await this.cacheManagerService.get<TechnologyPayload>(CACHE_TECHNOLOGIES.ALL_TECHNOLOGIES);
    if (cachedValue) return cachedValue;

    const response = await this.technologiesRepository.getList();
    await this.cacheManagerService.set(CACHE_TECHNOLOGIES.ALL_TECHNOLOGIES, response, CACHE_TECHNOLOGIES.TTL);

    return response;
  }

  async getBackLangs(): Promise<any> {
    const cachedValue = await this.cacheManagerService.get<any>(CACHE_TECHNOLOGIES.BACK_LANG_TECHNOLOGIES);
    if (cachedValue) return cachedValue;

    const response = await this.technologiesRepository.getBackLangs();
    await this.cacheManagerService.set(CACHE_TECHNOLOGIES.BACK_LANG_TECHNOLOGIES, response, CACHE_TECHNOLOGIES.TTL);

    return response;
  }

  async getBackFrameworksByBackLangId(backLangId: number): Promise<any> {
    const response = await this.technologiesRepository.getBackFrameworksByBackLangId(backLangId);

    return response;
  }

  async getDatabases(): Promise<any> {
    const cachedValue = await this.cacheManagerService.get<any>(CACHE_TECHNOLOGIES.DATABASE_TECHNOLOGIES);
    if (cachedValue) return cachedValue;

    const response = await this.technologiesRepository.getDataBaseLanguages();
    await this.cacheManagerService.set(CACHE_TECHNOLOGIES.DATABASE_TECHNOLOGIES, response, CACHE_TECHNOLOGIES.TTL);

    return response;
  }

  async getFrontLangList(): Promise<any> {
    const cachedValue = await this.cacheManagerService.get<any>(CACHE_TECHNOLOGIES.FRONT_LANG_TECHNOLOGIES);
    if (cachedValue) return cachedValue;

    const response = await this.technologiesRepository.getFrontLangs();
    await this.cacheManagerService.set(CACHE_TECHNOLOGIES.FRONT_LANG_TECHNOLOGIES, response, CACHE_TECHNOLOGIES.TTL);

    return response;
  }

  async getFrontFrameworksByFrontLangId(frontLangId: number): Promise<any> {
    const response = await this.technologiesRepository.getFrontFrameworksByFrontLangId(frontLangId);

    return response;
  }
}

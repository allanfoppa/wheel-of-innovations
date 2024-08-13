import { Injectable } from '@nestjs/common';
import { SeedsRepository } from './seeds.repository';

@Injectable()
export class SeedsService {
  constructor(
    private seedsRepository: SeedsRepository,
  ) {}

  async seedAll() {
    await this.seedBack();
    await this.seedFront();
    await this.seedDatabase();
  }

  async seedBack() {
    this.seedsRepository.seedBack();
  }

  async seedFront() {
    this.seedsRepository.seedFront();
  }

  async seedDatabase() {
    this.seedsRepository.seedDatabase();
  }

}

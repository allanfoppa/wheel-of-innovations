import { DataSource } from 'typeorm';
import { Challenge } from '../entities/challenge.entity';
import { CHALLENGE_REPOSITORY, POSTGRES } from 'src/database/database.constants';

export const challengeProviders = [
  {
    provide: CHALLENGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Challenge),
    inject: [POSTGRES],
  },
];

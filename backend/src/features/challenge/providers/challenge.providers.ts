import { DataSource } from 'typeorm';
import { Challenges } from 'src/database/entities/challenge.entity';
import { CHALLENGE_REPOSITORY, POSTGRES } from 'src/database/database.constants';

export const challengeProviders = [
  {
    provide: CHALLENGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Challenges),
    inject: [POSTGRES],
  },
];

import { DataSource } from 'typeorm';
import { BackFramework } from '../entities/back-framework.entity';
import { BACK_FRAMEWORK_REPOSITORY, POSTGRES } from 'src/database/database.constants';

export const photoProviders = [
  {
    provide: BACK_FRAMEWORK_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BackFramework),
    inject: [POSTGRES],
  },
];

import { DataSource } from 'typeorm';
import { POSTGRES } from './database.constants';

export const databaseProviders = [
  {
    provide: POSTGRES,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: `${process.env.DB_HOST}`,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        database: `${process.env.DB_NAME}`,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

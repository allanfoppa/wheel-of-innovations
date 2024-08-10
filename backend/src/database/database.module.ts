import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenges } from './entities/challenge.entity';
import { BackLang } from './entities/back-lang.entity';
import { BackFramework } from './entities/back-framework.entity';
import { DatabaseLanguage } from './entities/database-lang.entity';
import { FrontLang } from './entities/front-lang.entity';
import { FrontFramework } from './entities/front-framework.entity';
import { ENVIROMENTS } from 'src/common/constants/enviroments.constant';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.DB_HOST}`,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: `${process.env.DB_USER}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_NAME}`,
      entities: [
        Challenges,
        BackLang,
        BackFramework,
        DatabaseLanguage,
        FrontLang,
        FrontFramework
      ],
      synchronize: process.env.NODE_ENV === ENVIROMENTS.DEVELOPMENT && true,
    })
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}

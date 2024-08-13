import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenges } from 'src/database/entities/challenge.entity';
import { ChallengesRepository } from './challenges.repository';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { BackLang } from 'src/database/entities/back-lang.entity';
import { BackFramework } from 'src/database/entities/back-framework.entity';
import { FrontLang } from 'src/database/entities/front-lang.entity';
import { FrontFramework } from 'src/database/entities/front-framework.entity';
import { DatabaseLanguage } from 'src/database/entities/database-lang.entity';
import { QueriesHelper } from 'src/common/helpers/queries.helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Challenges,
      BackLang,
      BackFramework,
      FrontLang,
      FrontFramework,
      DatabaseLanguage
    ]
  )],
  controllers: [ChallengesController],
  providers: [
    ChallengesRepository,
    ChallengesService,
    ResponseHelper,
    QueriesHelper
  ],
})
export class ChallengesModule {}

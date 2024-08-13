import { Module } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackLang } from 'src/database/entities/back-lang.entity';
import { BackFramework } from 'src/database/entities/back-framework.entity';
import { FrontLang } from 'src/database/entities/front-lang.entity';
import { FrontFramework } from 'src/database/entities/front-framework.entity';
import { DatabaseLanguage } from 'src/database/entities/database-lang.entity';
import { TechnologiesRepository } from './technologies.repository';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BackLang,
      BackFramework,
      FrontLang,
      FrontFramework,
      DatabaseLanguage
    ]),
  ],
  controllers: [TechnologiesController],
  providers: [
    ResponseHelper,
    TechnologiesRepository,
    TechnologiesService
  ],
})
export class TechnologiesModule {}

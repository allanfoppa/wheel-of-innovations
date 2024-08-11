import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { BackLang } from 'src/database/entities/back-lang.entity';
import { BackFramework } from 'src/database/entities/back-framework.entity';
import { FrontLang } from 'src/database/entities/front-lang.entity';
import { FrontFramework } from 'src/database/entities/front-framework.entity';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { DatabaseLanguage } from 'src/database/entities/database-lang.entity';

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
  providers: [
    SeedsService,
    ResponseHelper
  ],
  controllers: [SeedsController],
})
export class SeedsModule {}

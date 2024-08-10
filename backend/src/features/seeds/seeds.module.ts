import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { BackLang } from 'src/database/entities/back-lang.entity';
import { BackFramework } from 'src/database/entities/back-framework.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BackLang,
      BackFramework
    ]
  )],
  providers: [SeedsService],
  controllers: [SeedsController],
})
export class SeedsModule {}

import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { DatabaseModule } from 'src/database/database.module';
import { challengeProviders } from './providers/challenge.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ChallengeController],
  providers: [
    ...challengeProviders,
    ChallengeService
  ],
})
export class ChallengeModule {}

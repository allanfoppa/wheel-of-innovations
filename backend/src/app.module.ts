import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { EnvironmentModule } from './common/services/enviroments-variables/enviroment-variables.module';
import { SeedsModule } from './features/seeds/seeds.module';
import { DatabaseModule } from './database/database.module';
import { ResponseHelper } from './common/helpers/response.helper';
import { TechnologiesModule } from './features/technologies/technologies.module';
import { ChallengesModule } from './features/challenges/challenges.module';
import { CacheManagerModule } from './common/services/cache-manager/cache-manager.module';

@Module({
  imports: [
    CacheManagerModule,
    EnvironmentModule,
    SeedsModule,
    DatabaseModule,
    TechnologiesModule,
    ChallengesModule
  ],
  controllers: [AppController],
  providers: [
    ResponseHelper,
    AppService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

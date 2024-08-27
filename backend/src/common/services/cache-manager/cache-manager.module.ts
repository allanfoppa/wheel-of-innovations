import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from "redis";
import { CacheManagerService } from './cache-manager.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async () => {
        return {
          store: (): any =>
            redisStore({
              socket: {
                host: 'localhost',
                port: 6379,
              },
            }),
        };
    },
    }),
  ],
  providers: [CacheManagerService],
  exports: [CacheManagerService],
})
export class CacheManagerModule {}

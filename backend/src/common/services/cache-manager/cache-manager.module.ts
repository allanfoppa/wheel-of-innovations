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
                host: process.env.SOCKET_HOST,
                port: parseInt(process.env.SOCKET_PORT, 10) || 6379,
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

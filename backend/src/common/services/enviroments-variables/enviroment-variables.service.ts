import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const requiredEnvVars = [
      'APP_VERSION',
      'NODE_ENV',
      'PORT',
      'DB_HOST',
      'DB_PORT',
      'DB_USER',
      'DB_PASSWORD',
      'DB_NAME'
    ];

    for (const envVar of requiredEnvVars) {
      const value = this.configService.get(envVar);
      if (!value) {
        throw new Error(`MISSING REQUIRED ENVIRONMENT VARIABLE: ${envVar}`);
      }
    }
  }
}

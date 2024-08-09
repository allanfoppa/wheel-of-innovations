import { Module, Global } from '@nestjs/common';
import { EnvironmentService } from './enviroment-variables.service';

@Global()
@Module({
  imports: [],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}

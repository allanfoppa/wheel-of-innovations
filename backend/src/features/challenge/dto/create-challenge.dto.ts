import { PartialType } from '@nestjs/mapped-types';
import { ChallengeDto } from './challenge.dto';

export class CreateChallengeDto extends PartialType(ChallengeDto) {}

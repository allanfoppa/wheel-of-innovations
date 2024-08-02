import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ChallengeDto {
  @IsInt()
  backLangId: number;

  @IsInt()
  backFrameworkId: number;

  @IsInt()
  databaseId: number;

  @IsInt()
  frontLangId: number;

  @IsInt()
  frontFrameworkId: number;

  @IsBoolean()
  requires_design: boolean;

  @IsDateString()
  deadline: Date;
}

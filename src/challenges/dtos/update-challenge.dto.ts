import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { ChallengeStatus } from '../interfaces/challenge.interface';

export class UpdateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  dateTimeChallenge: Date;

  @IsNotEmpty()
  @IsEnum(ChallengeStatus)
  status: ChallengeStatus;
}

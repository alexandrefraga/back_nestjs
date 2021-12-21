import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import { Player } from 'src/players/interfaces/player.interface';
import { Result } from '../interfaces/challenge.interface';

export class UpdateGameDto {
  @IsNotEmpty()
  @IsMongoId()
  def: Player;

  @IsArray()
  result: Array<Result>;
}

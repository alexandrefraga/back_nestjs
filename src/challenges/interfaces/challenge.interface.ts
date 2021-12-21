import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';

export interface Challenge extends Document {
  dateTimeChallenge: Date;
  status: ChallengeStatus;
  dateTimeSolicitation: Date;
  dateTimeAnswer: Date;
  challenger: Player;
  category: string;
  players: Array<Player>;
  game: Game;
}

export enum ChallengeStatus {
  PENDENTE = 'Pendente',
  ACEITO = 'Aceito',
  REJEITADO = 'Rejeitado',
  ENCERRADO = 'Encerrado',
}

export interface Game extends Document {
  category: string;
  players: Array<Player>;
  def: Player;
  result: Array<Result>;
}

export interface Result {
  set: string;
}

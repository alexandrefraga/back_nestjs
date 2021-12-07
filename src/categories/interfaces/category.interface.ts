import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';

export interface Category extends Document {
  readonly category: string;
  descryption: string;
  events: Array<Event>;
  players: Array<Player>;
}

export interface Event {
  event: string;
  operator: string;
  value: number;
}

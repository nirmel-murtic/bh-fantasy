import {Id} from './id';
import {Player} from './player';

export interface Lineup extends Id {
  formation: string;
  startingPlayers: Player[];
}

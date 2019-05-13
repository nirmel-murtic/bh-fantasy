import {Id} from './id';
import {Player} from './player';

export interface MissedPenalty extends Id {
  player: Player;
  savedBy: Player;
  minute: number;
}

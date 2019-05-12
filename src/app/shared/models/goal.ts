import {Id} from './id';
import {Player, PlayerEvent} from './player';

export interface Goal extends Id, PlayerEvent {
  assist: Player;
  minute: number;
  ownGoal: boolean;
  penalty: boolean;
  player: Player;
  score1: number;
  score2: number;
}

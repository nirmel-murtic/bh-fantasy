import {Id} from './id';
import {Player, PlayerEvent} from './player';
import {Team} from "./team";

export interface Goal extends Id, PlayerEvent {
  assist: Player;
  minute: number;
  ownGoal: boolean;
  penalty: boolean;
  ownAssist: boolean;
  player: Player;
  score1: number;
  score2: number;
  team: Team;
}

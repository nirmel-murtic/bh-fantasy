import {Id} from './id';
import {Player} from './player';

export interface Substitution extends Id {
  player: Player;
  substitutePlayer: Player;
  minute: number;
}

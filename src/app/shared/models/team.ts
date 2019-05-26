import {Id} from './id';
import {League} from "./league";
import {Player} from "./player";

export interface Team extends Id {
  name: string;
  profilePicture: string;
  leagues: League[];
  players: Player[];
}

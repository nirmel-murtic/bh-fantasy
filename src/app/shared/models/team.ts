import {Id} from './id';
import {League} from "./league";

export interface Team extends Id {
  name: string;
  profilePicture: string;
  leagues: League[]
}

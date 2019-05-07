import {Id} from './id';
import {Round} from './round';

export interface League extends Id {
  name: string;
  type: LeagueType;
  rounds: Round[];
}

export enum LeagueType {
  RegularLeague = 'RegularLeague',
  FantasyLeague = 'FantasyLeague'
}

import {Id} from './id';
import {Round} from './round';
import {Team} from './team';

export interface League extends Id {
  name: string;
  type: LeagueType;
  rounds: Round[];
  currentRoundId: number;
  teams: Team[];
  groups: League[];
  season: string;
  regularLeague: League;
}

export enum LeagueType {
  RegularLeague = 'RegularLeague',
  FantasyLeague = 'FantasyLeague',
  LeagueGroup = 'LeagueGroup'
}

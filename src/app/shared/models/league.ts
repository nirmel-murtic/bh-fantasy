import {Id} from './id';

export interface League extends Id {
  name: string;
  type: LeagueType
}

export enum LeagueType {
  RegularLeague = "RegularLeague",
  FantasyLeague = "FantasyLeague"
}

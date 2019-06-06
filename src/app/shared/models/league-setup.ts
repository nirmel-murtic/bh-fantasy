import {Id} from './id';
import {League} from "./league";

export interface LeagueSetup extends Id {
  name: string;
  transfermarktUrl: string;
  leagueSetups: LeagueSetup[];
  league: League;
  fantasyLeague: League;
}

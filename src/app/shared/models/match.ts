import {Id} from './id';
import {Team} from './team';
import {Stadium} from './stadium';

export interface Match extends Id {
  score1: number;
  score2: number;
  team1: Team;
  team2: Team;
  stadium: Stadium;
}

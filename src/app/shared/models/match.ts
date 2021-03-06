import {Id} from './id';
import {Team} from './team';
import {Stadium} from './stadium';
import {Lineup} from './lineup';
import {Goal} from './goal';
import {Card} from './card';
import {MissedPenalty} from './missed-penalty';

export interface Match extends Id {
  score1: number;
  score2: number;
  team1: Team;
  team2: Team;
  stadium: Stadium;
  dateTime: Date;
  lineup1: Lineup;
  lineup2: Lineup;
  goals: Goal[];
  cards: Card[];
  missedPenalties: MissedPenalty[];
}

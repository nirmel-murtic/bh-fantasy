import {Id} from './id';

export interface StandingValue extends Id {
  teamId: number;
  teamName: string;
  draw: number;
  lose: number;
  won: number;
  goalsScored: number;
  goalsConceded: number;
  points: number;
  goalsDifference: number;
}

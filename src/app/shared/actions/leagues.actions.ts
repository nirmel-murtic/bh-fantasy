import {Action} from '@ngrx/store';
import {League} from '../models/league';
import {StandingValue} from '../models/standing-value';
export const LOAD_LEAGUES = 'LOAD_LEAGUES';
export const LOAD_STANDINGS = 'LOAD_STANDINGS';

export class LoadLeaguesAction implements Action {
    readonly type = LOAD_LEAGUES;

    constructor(public payload: League[]) {
    }
}

export class LoadStandingsAction implements Action {
  readonly type = LOAD_STANDINGS;

  constructor(public payload: StandingValue[], public leagueId: number) {
  }
}

export type Actions
    = LoadLeaguesAction
    | LoadStandingsAction;

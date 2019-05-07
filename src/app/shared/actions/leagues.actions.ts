import {Action} from '@ngrx/store';
import {League} from '../models/league';
import {StandingValue} from '../models/standing-value';
import {TopPlayerValue} from '../models/top-player-value';
import {Round} from '../models/round';
export const LOAD_LEAGUES = 'LOAD_LEAGUES';
export const LOAD_STANDINGS = 'LOAD_STANDINGS';
export const LOAD_TOP_PLAYERS = 'LOAD_TOP_PLAYERS';
export const LOAD_ROUNDS = 'LOAD_ROUNDS';

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

export class LoadTopPlayersAction implements Action {
  readonly type = LOAD_TOP_PLAYERS;

  constructor(public payload: TopPlayerValue[], public leagueId: number) {
  }
}

export class LoadRoundsAction implements Action {
  readonly type = LOAD_ROUNDS;

  constructor(public payload: Round[], public leagueId: number) {
  }
}

export type Actions
    = LoadLeaguesAction
    | LoadStandingsAction
    | LoadTopPlayersAction
    | LoadRoundsAction;

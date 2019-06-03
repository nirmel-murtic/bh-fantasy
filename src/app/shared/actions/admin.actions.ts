import {Action} from '@ngrx/store';
import {LeagueSetup} from "../models/league-setup";
export const SET_LEAGUE_SETUPS = 'SET_LEAGUE_SETUPS';
export const UPDATE_LEAGUE_SETUP = 'UPDATE_LEAGUE_SETUP';

export class SetLeagueSetupsAction implements Action {
  readonly type = SET_LEAGUE_SETUPS;

  constructor(public payload: LeagueSetup[]) {
  }
}

export class UpdateLeagueSetupAction implements Action {
  readonly type = UPDATE_LEAGUE_SETUP;

  constructor(public payload: LeagueSetup) {
  }
}

export type Actions =
    | SetLeagueSetupsAction
    | UpdateLeagueSetupAction;

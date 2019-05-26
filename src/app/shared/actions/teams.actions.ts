import {Action} from '@ngrx/store';
import {Team} from "../models/team";
export const SET_CURRENT_TEAM = 'SET_CURRENT_TEAM';
export const SET_MY_FANTASY_TEAM = 'SET_MY_FANTASY_TEAM';

export class SetCurrentTeamAction implements Action {
  readonly type = SET_CURRENT_TEAM;

  constructor(public payload: Team) {
  }
}

export class SetMyFantasyTeamAction implements Action {
  readonly type = SET_MY_FANTASY_TEAM;

  constructor(public payload: Team, public leagueId: number) {
  }
}

export type Actions =
    | SetCurrentTeamAction
    | SetMyFantasyTeamAction;

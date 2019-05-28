import {Action} from '@ngrx/store';
import {Team} from "../models/team";
import {Player} from "../models/player";
export const SET_CURRENT_TEAM = 'SET_CURRENT_TEAM';
export const SET_MY_FANTASY_TEAM = 'SET_MY_FANTASY_TEAM';
export const ADD_PLAYER = 'ADD_PLAYER';

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

export class AddPlayerAction implements Action {
  readonly type = ADD_PLAYER;

  constructor(public teamId: number, public player: Player) {
  }
}

export type Actions =
    | SetCurrentTeamAction
    | SetMyFantasyTeamAction
    | AddPlayerAction;

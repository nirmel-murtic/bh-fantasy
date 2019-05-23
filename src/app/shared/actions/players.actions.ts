import {Action} from '@ngrx/store';
import {Player} from '../models/player';
export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';

export class SetCurrentPlayerAction implements Action {
  readonly type = SET_CURRENT_PLAYER;

  constructor(public payload: Player) {
  }
}

export type Actions =
    | SetCurrentPlayerAction;

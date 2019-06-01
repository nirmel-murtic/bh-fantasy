import {Action} from '@ngrx/store';
import {User} from "../models/user";
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export class SetCurrentUserAction implements Action {
  readonly type = SET_CURRENT_USER;

  constructor(public payload: User) {
  }
}

export type Actions =
    | SetCurrentUserAction;

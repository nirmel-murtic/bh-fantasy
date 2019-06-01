import * as user from '../actions/user.actions';
import {User} from "../models/user";

export type Action = user.Actions;

export interface State {
  currentUser: User;
}

export const initialState: State = {
  currentUser : null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case user.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload
      };
    }
    default:
      return state;
  }
}

export const getCurrentUser = (state: State) => state.currentUser;

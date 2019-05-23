import * as players from '../actions/players.actions';
import {Player} from '../models/player';

export type Action = players.Actions;

export interface State {
  currentPlayer: Player;
}

const initialState: State = {
  currentPlayer : null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case players.SET_CURRENT_PLAYER: {
      return {
        ...state,
        currentPlayer: action.payload
      };
    }
    default:
      return state;
  }
}

export const getCurrentPlayer = (state: State) => state.currentPlayer;

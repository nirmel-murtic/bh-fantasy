import * as admin from '../actions/admin.actions';
import {LeagueSetup} from "../models/league-setup";
import {updateModelInModels} from "../utils/utils";

export type Action = admin.Actions;

export interface State {
  leagueSetups: LeagueSetup[];
}

export const initialState: State = {
  leagueSetups : []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case admin.SET_LEAGUE_SETUPS: {
      return {
        ...state,
        leagueSetups: action.payload
      };
    }
    case admin.UPDATE_LEAGUE_SETUP: {
      return {
        ...state,
        leagueSetups: updateModelInModels(state.leagueSetups, action.payload)
      }
    }
    default:
      return state;
  }
}

export const getLeagueSetups = (state: State) => state.leagueSetups;

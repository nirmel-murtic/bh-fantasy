import * as leagues from '../actions/leagues.actions';
import {League} from '../models/league';
import {StandingValue} from '../models/standing-value';
import {TopPlayerValue} from "../models/top-player-value";

export type Action = leagues.Actions;

export interface State {
  leagues: League[];
  standings: Map<number, StandingValue[]>;
  topPlayers: Map<number, TopPlayerValue[]>;
}

const initialState: State = {
  leagues: [],
  standings: new Map(),
  topPlayers: new Map()
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case leagues.LOAD_LEAGUES: {
      return {
        ...state,
        leagues: action.payload
      };
    }
    case leagues.LOAD_STANDINGS: {
      const map = new Map();

      state.standings.forEach((key, value) => {
        map.set(key, value);
      });

      map.set(action.leagueId, action.payload);

      return {
        ...state,
        standings: map
      };
    }
    case leagues.LOAD_TOP_PLAYERS: {
        const map = new Map();

        state.topPlayers.forEach((key, value) => {
          map.set(key, value);
        });

        map.set(action.leagueId, action.payload);

        return {
          ...state,
          topPlayers: map
        };
    }
    default:
      return state;
}
}

export const getLeagues = (state: State) => state.leagues;
export const getStandings = (state: State) => state.standings;
export const getTopPlayers = (state: State) => state.topPlayers;

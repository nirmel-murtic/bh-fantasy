import * as leagues from '../actions/leagues.actions';
import {League} from '../models/league';
import {StandingValue} from '../models/standing-value';
import {TopPlayerValue} from '../models/top-player-value';

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
    case leagues.LOAD_ROUNDS: {
      const newLeagues = [];

      state.leagues.forEach(l => {
        if (l.id === action.leagueId) {
          newLeagues.push({
            ...l,
            rounds: action.payload
          });
        } else {
          newLeagues.push(l);
        }
      });

      return {
        ...state,
        leagues: newLeagues
      };
    }
    case leagues.LOAD_ROUND: {
      const newLeagues = [];

      state.leagues.forEach(league => {
        if (league.id === action.leagueId) {
          const newRounds = [];

          league.rounds.forEach(round => {
            if(round.id == action.roundId) {
              newRounds.push(action.payload)
            } else {
              newRounds.push(round);
            }
          });

          newLeagues.push({
            ...league,
            rounds: newRounds
          });
        } else {
          newLeagues.push(league);
        }
      });

      return {
        ...state,
        leagues: newLeagues
      };
    }
    default:
      return state;
}
}

export const getLeagues = (state: State) => state.leagues;
export const getStandings = (state: State) => state.standings;
export const getTopPlayers = (state: State) => state.topPlayers;

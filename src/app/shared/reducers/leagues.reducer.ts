import * as leagues from '../actions/leagues.actions';
import {League} from '../models/league';
import {StandingValue} from '../models/standing-value';
import {TopPlayerValue} from '../models/top-player-value';
import {Id} from '../models/id';

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

      state.standings.forEach((value, key) => {
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

        state.topPlayers.forEach((value, key) => {
          map.set(key, value);
        });

        map.set(action.leagueId, action.payload);

        return {
          ...state,
          topPlayers: map
        };
    }
    case leagues.LOAD_ROUNDS: {
      const league = {
        ...getLeague(state, action.leagueId),
        rounds: action.payload
      };

      return {
        ...state,
        leagues: updateModelInModels(state.leagues, league)
      };
    }
    case leagues.LOAD_ROUND: {
      let league = getLeague(state, action.leagueId);

      league = {
        ...league,
        rounds: updateModelInModels(league.rounds, action.payload)
      };

      return {
        ...state,
        leagues: updateModelInModels(state.leagues, league)
      };
    }
    case leagues.LOAD_LEAGUE: {
      let league = getLeague(state, action.leagueId);

      if (!league) {
        league = action.payload;
      } else {
        league = {
          ...league,
          currentRoundId: action.payload.currentRoundId,
          teams: action.payload.teams,
          groups: action.payload.groups
        };
      }

      return {
        ...state,
        leagues: updateModelInModels(state.leagues, league)
      };
    }
    case leagues.LOAD_MATCH: {
      let league = getLeague(state, action.leagueId);

      let round = getRound(state, action.leagueId, action.roundId);

      round = {
        ...round,
        matches: updateModelInModels(round.matches, action.payload)
      };

      league = {
        ...league,
        rounds: updateModelInModels(league.rounds, round)
      };

      return {
        ...state,
        leagues: updateModelInModels(state.leagues, league)
      };
    }
    default:
      return state;
  }
}

function getLeague(state: State, leagueId: number) {
  return state.leagues.find(league => league.id === leagueId);
}

function getRound(state: State, leagueId: number, roundId: number) {
  const league = getLeague(state, leagueId);

  return league && league.rounds ? league.rounds.find(round => round.id === roundId) : null;
}

function getMatch(state: State, leagueId: number, roundId: number, matchId: number) {
  const round = getRound(state, leagueId, roundId);

  return round && round.matches ? round.matches.find(match => match.id === matchId) : null;
}

function updateModelInModels(models: Id[], model: Id) {
  if(!models) {
    return [model];
  }

  const newRounds = [];

  let updated = false;

  models.forEach(value => {
    if (value.id === model.id) {
      newRounds.push(model);

      updated = true;
    } else {
      newRounds.push(value);
    }
  });

  if (!updated) {
    newRounds.push(model);
  }

  return newRounds;
}

export const getLeagues = (state: State) => state.leagues;
export const getStandings = (state: State) => state.standings;
export const getTopPlayers = (state: State) => state.topPlayers;

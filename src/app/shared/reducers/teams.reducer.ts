import * as teams from '../actions/teams.actions';
import {Team} from '../models/team';

export type Action = teams.Actions;

export interface State {
  currentTeam: Team;
  myFantasyTeams: Map<number, Team>;
}

const initialState: State = {
  currentTeam : null,
  myFantasyTeams : new Map<number, Team>()
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case teams.SET_CURRENT_TEAM: {
      return {
        ...state,
        currentTeam: action.payload
      };
    }
    case teams.SET_MY_FANTASY_TEAM: {
      const map = new Map();

      state.myFantasyTeams.forEach((value, key) => {
        map.set(key, value);
      });

      map.set(action.leagueId, action.payload);

      return {
        ...state,
        myFantasyTeams: map
      };
    }
    case teams.ADD_PLAYER: {
      const map = new Map();

      state.myFantasyTeams.forEach((value, key) => {
        if(value.id === action.teamId) {
          map.set(key, {
            ...value,
            players: value.players ? [...value.players, action.player].reverse() : [action.player]
          } as Team);
        } else {
          map.set(key, value);
        }
      });

      return {
        ...state,
        myFantasyTeams: map
      };
    }
    default:
      return state;
  }
}

export const getCurrentTeam = (state: State) => state.currentTeam;
export const getFantasyTeams = (state: State) => state.myFantasyTeams;

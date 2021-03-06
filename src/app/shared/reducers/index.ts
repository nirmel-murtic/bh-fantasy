import * as fromLeagues from './leagues.reducer';
import * as fromPlayers from './players.reducer';
import * as fromTeams from './teams.reducer';
import * as fromUser from './user.reducer';
import * as fromAdmin from './admin.reducer';

import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import {TopPlayerValue} from '../models/top-player-value';
import {League, LeagueType} from '../models/league';
import {StandingValue} from '../models/standing-value';
import {Round} from '../models/round';
import {Match} from '../models/match';
import {Player} from '../models/player';
import {Team} from "../models/team";
import {Log} from "../utils/log";

export interface State {
  leagues: fromLeagues.State;
  players: fromPlayers.State;
  teams: fromTeams.State;
  user: fromUser.State;
  admin: fromAdmin.State;
}

export const selectRouterState =
  createFeatureSelector<RouterReducerState>('router');

export const selectRouteParameters = createSelector(
  selectRouterState,
  router => router.state.root.firstChild.params
);

export const getLeaguesState = createFeatureSelector<fromLeagues.State>('leagues');
export const getPlayersState = createFeatureSelector<fromPlayers.State>('players');
export const getTeamsState = createFeatureSelector<fromTeams.State>('teams');
export const getUserState = createFeatureSelector<fromUser.State>('user');
export const getAdminState = createFeatureSelector<fromAdmin.State>('admin');

export const getLeaguesAndGroups = createSelector(getLeaguesState, fromLeagues.getLeagues);

export const getStandings = createSelector(getLeaguesState, fromLeagues.getStandings);

export const getTopPlayers = createSelector(getLeaguesState, fromLeagues.getTopPlayers);

export const getPlayers = createSelector(getLeaguesState, fromLeagues.getPlayers);

export const getCurrentPlayer = createSelector(getPlayersState, fromPlayers.getCurrentPlayer);

export const getCurrentUser = createSelector(getUserState, fromUser.getCurrentUser);

export const getCurrentTeam = createSelector(getTeamsState, fromTeams.getCurrentTeam);

export const getFantasyTeams = createSelector(getTeamsState, fromTeams.getFantasyTeams);

// Admin

export const getLeagueSetups = createSelector(getAdminState, fromAdmin.getLeagueSetups);



// End Admin

export const getFantasyTeam = createSelector(getFantasyTeams,
  (teamsMap, props) => {
    return teamsMap.get(props.leagueId)
  }
);

export const getCurrentPlayerWithId = createSelector(getCurrentPlayer,
  selectRouteParameters,(player, route) => {
      return [player && player.id === +route.playerId ? player : null, +route.playerId] as [Player, number];
    }
);

export const getCurrentTeamWithId = createSelector(getCurrentTeam,
  selectRouteParameters,(team, route) => {
    return [team && team.id === +route.teamId ? team : null, +route.teamId] as [Team, number];
  }
);

export const getLeagues = createSelector(getLeaguesAndGroups, leagues => {
  return leagues.filter(league => league.type !== LeagueType.LeagueGroup);
});

export const getCurrentLeague = createSelector(getLeaguesAndGroups, selectRouteParameters,
  (leagues, route) => leagues.find(league => {
    return league.id === +route.leagueId;
}));

export const getCurrentLeagueWithId = createSelector(getCurrentLeague, selectRouteParameters,
  (league, route) => [league, +route.leagueId] as [League, number]);


export const getCurrentRound = createSelector(getCurrentLeague, selectRouteParameters,
  (league, route) => {
    if (league && league.rounds) {
      if(route.roundId) {
        return [league.rounds.find(round => {
          return round.id === +route.roundId;
        }), league] as [Round, League];
      } else if(league.currentRoundId) {
        return [league.rounds.find(round => {
          return round.id === league.currentRoundId;
        }), league] as [Round, League];
      }
    }

    return [null, null] as [Round, League];
});

export const getCurrentMatch = createSelector(getCurrentRound, selectRouteParameters,
  ([round, league], route) => (round && round.matches ? [round.matches.find(match => {
      return match.id === +route.matchId;
  }), round, league] : [null, null, null]) as [Match, Round, League]);

export const getCurrentTopPlayers = createSelector(getCurrentLeague, getTopPlayers,
  (league, topPlayers) => [league ? topPlayers.get(league.id) : null, league] as [TopPlayerValue[], League]);

export const getCurrentStandings = createSelector(getCurrentLeague, getStandings,
  (league, standings) => [league ? standings.get(league.id) : null, league] as [StandingValue[], League]);

export const getStandingsForLeague = createSelector(getStandings,
  (standings, props) => standings.get(props.id));

export const getLeagueById = createSelector(getLeaguesAndGroups,
  (leagues, props) => leagues.find(league => {
    return league.id === props.id;
  })
);

export const getLeaguePlayers = createSelector(getPlayers,
  (playersMap, props) => playersMap.get(props.leagueId));


export const reducers: ActionReducerMap<State> = {
  leagues: fromLeagues.reducer,
  players: fromPlayers.reducer,
  teams: fromTeams.reducer,
  user: fromUser.reducer,
  admin: fromAdmin.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    Log.action(action);
    return reducer(state, action);
  };
}

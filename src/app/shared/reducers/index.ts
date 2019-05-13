import * as fromLeagues from './leagues.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';

export interface State {
  leagues: fromLeagues.State;
}

export const selectRouterState =
  createFeatureSelector<RouterReducerState>('router');

export const selectRouteParameters = createSelector(
  selectRouterState,
  router => router.state.root.firstChild.params
);

export const getLeaguesState = createFeatureSelector<fromLeagues.State>('leagues');

export const getLeagues = createSelector(getLeaguesState, fromLeagues.getLeagues);
export const getStandings = createSelector(getLeaguesState, fromLeagues.getStandings);

export const getTopPlayers = createSelector(getLeaguesState, fromLeagues.getTopPlayers);

export const getCurrentLeague = createSelector(getLeagues, selectRouteParameters,
  (leagues, route) => leagues.find(league => {
    return league.id === +route.leagueId;
}));

export const getCurrentRound = createSelector(getCurrentLeague, selectRouteParameters,
  (league, route) => {
    if (league && league.rounds) {
      if(route.roundId) {
        return league.rounds.find(round => {
          return round.id === +route.roundId;
        });
      } else if(league.currentRoundId) {
        return league.rounds.find(round => {
          return round.id === league.currentRoundId;
        });
      }
    } else {
      return null;
    }
});

export const getCurrentMatch = createSelector(getCurrentRound, selectRouteParameters,
  (round, route) => round && round.matches ? round.matches.find(match => {
      return match.id === +route.matchId;
  }) : null);

export const getCurrentTopPlayers = createSelector(getTopPlayers, selectRouteParameters,
  (topPlayers, route) => topPlayers.get(+route.leagueId));

export const getCurrentStandings = createSelector(getStandings, selectRouteParameters,
  (standings, route) => standings.get(+route.leagueId));

export const reducers: ActionReducerMap<State> = {
  leagues: fromLeagues.reducer
};

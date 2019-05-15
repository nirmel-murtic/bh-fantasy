import * as fromLeagues from './leagues.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import {TopPlayerValue} from "../models/top-player-value";
import {League} from "../models/league";
import {StandingValue} from "../models/standing-value";
import {Round} from "../models/round";
import {Match} from "../models/match";

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
  (league, topPlayers) => [topPlayers.get(league.id), league] as [TopPlayerValue[], League]);

export const getCurrentStandings = createSelector(getCurrentLeague, getStandings,
  (league, standings) => [standings.get(league.id), league] as [StandingValue[], League]);

export const reducers: ActionReducerMap<State> = {
  leagues: fromLeagues.reducer
};

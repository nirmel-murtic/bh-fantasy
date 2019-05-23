import * as fromLeagues from './leagues.reducer';
import * as fromPlayers from './players.reducer';

import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import {TopPlayerValue} from '../models/top-player-value';
import {League, LeagueType} from '../models/league';
import {StandingValue} from '../models/standing-value';
import {Round} from '../models/round';
import {Match} from '../models/match';
import {Player} from '../models/player';

export interface State {
  leagues: fromLeagues.State;
  players: fromPlayers.State;
}

export const selectRouterState =
  createFeatureSelector<RouterReducerState>('router');

export const selectRouteParameters = createSelector(
  selectRouterState,
  router => router.state.root.firstChild.params
);

export const getLeaguesState = createFeatureSelector<fromLeagues.State>('leagues');
export const getCurrentPlayerState = createFeatureSelector<fromPlayers.State>('players');

export const getLeaguesAndGroups = createSelector(getLeaguesState, fromLeagues.getLeagues);

export const getStandings = createSelector(getLeaguesState, fromLeagues.getStandings);

export const getTopPlayers = createSelector(getLeaguesState, fromLeagues.getTopPlayers);

export const getPlayers = createSelector(getLeaguesState, fromLeagues.getPlayers);

export const getCurrentPlayer = createSelector(getCurrentPlayerState, fromPlayers.getCurrentPlayer);

export const getCurrentPlayerWithId = createSelector(getCurrentPlayer,
  selectRouteParameters,(player, route) => {
      return [player && player.id === +route.playerId ? player : null, +route.playerId] as [Player, number];
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

export const reducers: ActionReducerMap<State> = {
  leagues: fromLeagues.reducer,
  players: fromPlayers.reducer
};

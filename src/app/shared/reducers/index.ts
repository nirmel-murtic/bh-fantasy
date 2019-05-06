import * as fromLeagues from './leagues.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  leagues: fromLeagues.State;
}

export const getLeaguesState = createFeatureSelector<fromLeagues.State>('leagues');

export const getLeagues = createSelector(getLeaguesState, fromLeagues.getLeagues);
export const getStandings = createSelector(getLeaguesState, fromLeagues.getStandings);
export const getTopPlayers = createSelector(getLeaguesState, fromLeagues.getTopPlayers);

export const reducers: ActionReducerMap<State> = {
  leagues: fromLeagues.reducer
};

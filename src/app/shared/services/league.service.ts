import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {getLeagues, State} from '../reducers';
import {Observable} from 'rxjs';
import {League} from '../models/league';
import {Endpoint} from '../constants/endpoints';
import {
  LoadLeagueAction,
  LoadLeaguesAction,
  LoadRoundAction,
  LoadRoundsAction,
  LoadStandingsAction,
  LoadTopPlayersAction
} from '../actions/leagues.actions';
import {StandingValue} from '../models/standing-value';
import {TopPlayerValue} from '../models/top-player-value';
import {Round} from '../models/round';

@Injectable()
export class LeagueService {

  public leagues: Observable<League[]>;

  constructor(private http: HttpClient,
              private store: Store<State>) {
    this.leagues = store.select(getLeagues);
  }

  loadLeagues(): void {
    this.http
      .get<League[]>(Endpoint.LEAGUES)
      .subscribe(data => {
        this.store.dispatch(new LoadLeaguesAction(data));
      });
  }

  loadStandings(leagueId: number): void {
    this.http
      .get<StandingValue[]>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString()).concat(Endpoint.STANDINGS))
      .subscribe(data => {
        this.store.dispatch(new LoadStandingsAction(data, leagueId));
      });
  }

  loadTopPlayers(leagueId: number): void {
    this.http
      .get<TopPlayerValue[]>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString()).concat(Endpoint.TOP_PLAYERS))
      .subscribe(data => {
        this.store.dispatch(new LoadTopPlayersAction(data, leagueId));
      });
  }

  loadRounds(leagueId: number): void {
    this.http
      .get<Round[]>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString()).concat(Endpoint.ROUNDS))
      .subscribe(data => {
        this.store.dispatch(new LoadRoundsAction(data, leagueId));
      });
  }

  loadLeagueDetails(leagueId: number): void {
    this.http
      .get<League>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString()))
      .subscribe(data => {
        this.store.dispatch(new LoadLeagueAction(data, leagueId));
      });
  }

  loadRoundDetails(leagueId: number, roundId: number): void {
    this.http
      .get<Round>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString())
        .concat(Endpoint.ROUNDS).concat('/').concat(roundId.toString()))
      .subscribe(data => {
        this.store.dispatch(new LoadRoundAction(data, leagueId, roundId));
      });
  }
}

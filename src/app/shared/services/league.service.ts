import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {getLeagues, State} from '../reducers';
import {Observable} from 'rxjs';
import {League} from '../models/league';
import {Endpoint} from '../constants/endpoints';
import {LoadLeaguesAction, LoadStandingsAction} from '../actions/leagues.actions';

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
      .get<League[]>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString()).concat(Endpoint.STANDINGS))
      .subscribe(data => {
        this.store.dispatch(new LoadStandingsAction(data, leagueId));
      });
  }
}

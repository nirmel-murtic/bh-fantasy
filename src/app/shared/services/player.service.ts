import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {Endpoint} from '../constants/endpoints';
import {Player} from "../models/player";
import {SetCurrentPlayerAction} from "../actions/players.actions";
import {Router} from "@angular/router";
import {handleApiError} from "../utils/utils";
import {Observable} from "rxjs";
import {share} from "rxjs/operators";
import {LoadPlayersAction} from "../actions/leagues.actions";

@Injectable()
export class PlayerService {

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<State>) {
  }

  loadPlayer(playerId: number): void {
    this.http
      .get<Player>(Endpoint.PLAYERS.concat('/').concat(playerId.toString()))
      .subscribe(data => {
        this.store.dispatch(new SetCurrentPlayerAction(data));
      }, error => handleApiError(error, this.router));
  }

  loadPlayers(leagueId: number): Observable<Player[]> {
    const result: Observable<Player[]> = this.http
      .get<Player[]>(Endpoint.PLAYERS.concat('?leagueId=').concat(leagueId.toString()))
      .pipe(share());

    result.subscribe(data => {
      this.store.dispatch(new LoadPlayersAction(data, leagueId));
    });

    return result;
  }

}

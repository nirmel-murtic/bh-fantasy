import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {Endpoint} from '../constants/endpoints';
import {Player} from "../models/player";
import {SetCurrentPlayerAction} from "../actions/players.actions";
import {Router} from "@angular/router";
import {handleApiError} from "../utils/utils";

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
}

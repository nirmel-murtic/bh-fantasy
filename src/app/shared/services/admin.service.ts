import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {Endpoint} from '../constants/endpoints';
import {Router} from "@angular/router";
import {handleApiError} from "../utils/utils";
import {SetLeagueSetupsAction, UpdateLeagueSetupAction} from "../actions/admin.actions";
import {LeagueSetup} from "../models/league-setup";

@Injectable()
export class AdminService {

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<State>) {
  }

  loadLeagueSetups(): void {
    this.http
      .get<LeagueSetup[]>(Endpoint.ADMIN.concat('/setups'))
      .subscribe(data => {
        this.store.dispatch(new SetLeagueSetupsAction(data));
      }, error => handleApiError(error, this.router));
  }

  processLeagueSetup(setup: LeagueSetup): void {
    this.http
      .post<LeagueSetup>(Endpoint.ADMIN.concat('/setups/'.concat(setup.id.toString()).concat('/process')), null)
      .subscribe(data => {
        this.store.dispatch(new UpdateLeagueSetupAction(data));
      }, error => handleApiError(error, this.router));
  }
}

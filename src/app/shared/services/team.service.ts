import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Endpoint} from '../constants/endpoints';
import {Team} from "../models/team";
import {Observable} from "rxjs";
import {handleApiError} from "../utils/utils";
import {AddPlayerAction, SetCurrentTeamAction} from "../actions/teams.actions";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {State} from "../reducers";
import {share} from "rxjs/operators";
import {Player} from "../models/player";

@Injectable()
export class TeamService {

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<State>) {
  }


  createTeam(team: Team): Observable<Team> {
    return this.http
      .post<Team>(Endpoint.TEAMS.concat('/'), team)
  }

  loadTeam(teamId: number): Observable<Team> {
    const result = this.http
      .get<Team>(Endpoint.TEAMS.concat('/').concat(teamId.toString()))
      .pipe(share());


    result.subscribe(data => {
        this.store.dispatch(new SetCurrentTeamAction(data));
      }, error => handleApiError(error, this.router));

    return result;
  }

  addPlayer(teamId: number, player: Player): void {
    this.http.post(Endpoint.TEAMS.concat('/'.concat(teamId.toString().concat('/add-player'))), player)
      .subscribe(() => {
        this.store.dispatch(new AddPlayerAction(teamId, player));
      });
  }
}

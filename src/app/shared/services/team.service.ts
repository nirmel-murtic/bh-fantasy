import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Endpoint} from '../constants/endpoints';
import {Team} from "../models/team";
import {Observable} from "rxjs";

@Injectable()
export class TeamService {

  constructor(private http: HttpClient) {
  }

  createTeam(team: Team): Observable<Team> {
    return this.http
      .post<Team>(Endpoint.TEAMS.concat('/'), team)
  }
}

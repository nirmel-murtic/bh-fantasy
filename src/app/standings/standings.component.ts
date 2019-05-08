import {Component, Input, OnInit} from '@angular/core';
import {LeagueService} from '../shared/services/league.service';
import {Store} from '@ngrx/store';
import {getStandings, State} from '../shared/reducers';
import {Observable} from 'rxjs';
import {StandingValue} from '../shared/models/standing-value';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent {

  public standings: StandingValue[];

  _leagueId: number;

  @Input()
  set leagueId(value: number) {
    if(value != null && value !== this._leagueId) {
      this.leagueService.loadStandings(value);
    }

    this._leagueId = value;
  }

  get leagueId() {
    return this._leagueId;
  }

  constructor(
    private store: Store<State>,
    private leagueService: LeagueService) {
      store.select(getStandings).subscribe((standings => {
        standings.forEach((value, key) => {
          if (key === this.leagueId) {
            this.standings = value;
          }
        });
      }));
  }
}

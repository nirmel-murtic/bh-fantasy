import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LeagueService} from '../shared/services/league.service';
import {Store} from '@ngrx/store';
import {getStandings, State} from '../shared/reducers';
import {Observable} from 'rxjs';
import {StandingValue} from '../shared/models/standing-value';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, OnDestroy {

  public standings: StandingValue[];

  _leagueId: number;

  private subscription: any;

  public standalone = true;

  @Input()
  set leagueId(value: number) {
    this.standalone = false;

    if(value != null && value !== this._leagueId) {
      this.leagueService.loadStandings(value);
    }

    this._leagueId = value;
  }

  get leagueId() {
    return this._leagueId;
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      if(params.id) {
        this._leagueId = +params.id;

        this.leagueService.loadStandings(this._leagueId);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private leagueService: LeagueService) {
      store.select(getStandings).subscribe((standings => {
        standings.forEach((value, key) => {
          if (key === this._leagueId) {
            this.standings = value;
          }
        });
      }));
  }
}

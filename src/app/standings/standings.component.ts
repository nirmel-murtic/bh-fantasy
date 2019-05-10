import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LeagueService} from '../shared/services/league.service';
import {Store} from '@ngrx/store';
import {getCurrentStandings, State} from '../shared/reducers';
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

  private subscriptions = [];

  public standalone = true;

  @Input()
  set leagueId(value: number) {
    this.standalone = false;
    this._leagueId = value;
  }

  get leagueId() {
    return this._leagueId;
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      if(params.leagueId) {
        this._leagueId = +params.leagueId;

        this.leagueService.loadStandings(this._leagueId);
      }
    }));

    this.subscriptions.push(
      this.store.select(getCurrentStandings).subscribe(value => {
        this.standings = value;
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private leagueService: LeagueService) {
  }
}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LeagueService} from '../shared/services/league.service';
import {Store} from '@ngrx/store';
import {getCurrentLeague, getCurrentStandings, State} from '../shared/reducers';
import {StandingValue} from '../shared/models/standing-value';
import {ActivatedRoute} from "@angular/router";
import {combineLatest} from "rxjs";

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

    if(value !== this._leagueId) {
      this.leagueService.loadStandings(value).subscribe(result => {
        this.standings = result;
      });
    }

    this._leagueId = value;
  }

  ngOnInit() {
    if(this.standalone) {
      combineLatest(
        this.store.select(getCurrentLeague),
        this.store.select(getCurrentStandings)).subscribe(([league, standings]) => {
         if(league && !standings) {
           this.leagueService.loadStandings(league.id);
         }

         this.standings = standings;
      });
    }
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

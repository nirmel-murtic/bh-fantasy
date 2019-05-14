import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LeagueService} from '../shared/services/league.service';
import {Store} from '@ngrx/store';
import {getCurrentStandings, State} from '../shared/reducers';
import {StandingValue} from '../shared/models/standing-value';
import {ActivatedRoute} from "@angular/router";
import {addIfNotExist, removeItem} from "../shared/utils/utils";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, OnDestroy {

  public standings: StandingValue[];

  _leagueId: number;

  private subscriptions = [];

  @Input()
  public showHeader = true;

  public standalone = true;

  private static LOADING_IDS = [];

  @Input()
  set leagueId(value: number) {
    this.standalone = false;

    if(value && value !== this._leagueId) {
      this.leagueService.loadStandings(value).subscribe(result => {
        this.standings = result;
      });
    }

    this._leagueId = value;
  }

  ngOnInit() {
    if(this.standalone) {
        this.subscriptions.push(this.store.select(getCurrentStandings).subscribe(([standings, league]) => {
         if(league && !standings && addIfNotExist(StandingsComponent.LOADING_IDS, league.id)) {
           this.leagueService.loadStandings(league.id);
         }

         this.standings = standings;

         if(this.standings) {
           removeItem(StandingsComponent.LOADING_IDS, league.id);
         }
      }));
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

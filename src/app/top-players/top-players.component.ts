import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getCurrentLeague, getCurrentTopPlayers, State} from '../shared/reducers';
import {LeagueService} from "../shared/services/league.service";
import {TopPlayerValue} from "../shared/models/top-player-value";
import {ActivatedRoute} from "@angular/router";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.css']
})
export class TopPlayersComponent implements OnInit, OnDestroy {

  public topPlayers: TopPlayerValue[];

  _leagueId: number;

  private subscriptions = [];

  @Input()
  public showHeader = true;

  public standalone = true;

  @Input() limit: number;

  @Input()
  set leagueId(value: number) {
    this.standalone = false;

    if(value !== this._leagueId) {
      this.leagueService.loadTopPlayers(value).subscribe(result => {
        this.topPlayers = result;
      });
    }

    this._leagueId = value;
  }

  get leagueId() {
    return this._leagueId;
  }

  ngOnInit() {
    if(this.standalone) {
      combineLatest(
        this.store.select(getCurrentLeague),
        this.store.select(getCurrentTopPlayers)).subscribe(([league, topPlayers]) => {
        if(league && !topPlayers) {
          this.leagueService.loadTopPlayers(league.id);
        }

        this.topPlayers = topPlayers;
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

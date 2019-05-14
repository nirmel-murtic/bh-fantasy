import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getCurrentTopPlayers, State} from '../shared/reducers';
import {LeagueService} from "../shared/services/league.service";
import {TopPlayerValue} from "../shared/models/top-player-value";
import {ActivatedRoute} from "@angular/router";
import {addIfNotExist, removeItem} from "../shared/utils/utils";

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

  private static LOADING_IDS = [];

  @Input() limit: number;

  @Input()
  set leagueId(value: number) {
    this.standalone = false;

    if(value && value !== this._leagueId) {
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
      this.subscriptions.push(this.store.select(getCurrentTopPlayers).subscribe(([topPlayers, league]) => {
        if (league && !topPlayers && addIfNotExist(TopPlayersComponent.LOADING_IDS, league.id)) {
          this.leagueService.loadTopPlayers(league.id);
        }

        this.topPlayers = topPlayers;

        if (this.topPlayers) {
          removeItem(TopPlayersComponent.LOADING_IDS, league.id);
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

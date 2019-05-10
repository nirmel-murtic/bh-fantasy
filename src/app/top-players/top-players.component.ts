import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getCurrentTopPlayers, State} from '../shared/reducers';
import {LeagueService} from "../shared/services/league.service";
import {TopPlayerValue} from "../shared/models/top-player-value";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.css']
})
export class TopPlayersComponent implements OnInit, OnDestroy {

  public topPlayers: TopPlayerValue[];

  _leagueId: number;

  private subscriptions = [];

  public standalone = true;

  @Input() limit: number;

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

        this.leagueService.loadTopPlayers(this._leagueId);
      }
    }));

    this.subscriptions.push(this.store.select(getCurrentTopPlayers).subscribe((value => {
      this.topPlayers = value;

      if (this.limit && this.topPlayers) {
        this.topPlayers = this.topPlayers.slice(0, this.limit);
      }
    })));
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

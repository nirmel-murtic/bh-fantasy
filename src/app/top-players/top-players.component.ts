import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getTopPlayers, State} from "../shared/reducers";
import {LeagueService} from "../shared/services/league.service";
import {TopPlayerValue} from "../shared/models/top-player-value";

@Component({
  selector: 'app-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.css']
})
export class TopPlayersComponent {

  public topPlayers: TopPlayerValue[];

  _leagueId: number;

  @Input()
  set leagueId(value: number) {
    if(value != null && value !== this._leagueId) {
      this.leagueService.loadTopPlayers(value);
    }

    this._leagueId = value;
  }

  get leagueId() {
    return this._leagueId;
  }
  @Input() limit: number;

  constructor(
    private store: Store<State>,
    private leagueService: LeagueService) {
    store.select(getTopPlayers).subscribe((standings => {
      standings.forEach((value, key) => {
        if (key === this.leagueId) {
          this.topPlayers = value;

          if (this.limit) {
            this.topPlayers = this.topPlayers.slice(0, this.limit);
          }
        }
      });
    }));
  }
}

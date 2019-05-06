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
export class TopPlayersComponent implements OnInit {

  public topPlayers: TopPlayerValue[];

  @Input() leagueId : number;

  constructor(
    private store: Store<State>,
    private leagueService: LeagueService) {
    store.select(getTopPlayers).subscribe((standings => {
      standings.forEach((value, key) => {
        if (key === this.leagueId) {
          this.topPlayers = value;
        }
      });
    }));
  }

  ngOnInit() {
    this.leagueService.loadTopPlayers(this.leagueId);
  }
}

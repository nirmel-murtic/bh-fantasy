import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../shared/models/player';
import {PlayerService} from "../shared/services/player.service";
import {Store} from "@ngrx/store";
import {getCurrentPlayerWithId, State} from "../shared/reducers";
import {Team} from "../shared/models/team";
import {League} from "../shared/models/league";
import {BaseComponent} from "../base.component";

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent extends BaseComponent implements OnInit {

  @Input()
  public player: Player;

  public statsLeague: League;

  public statsTeam: Team;

  ngOnInit() {
    this.subscriptions.push(this.store.select(getCurrentPlayerWithId).subscribe(([player, playerId]) => {
      if(player) {
        this.player = player;
      }

      if(!this.player && playerId) {
        this.playerService.loadPlayer(playerId);
      }
    }));
  }

  constructor(private playerService: PlayerService, private store: Store<State>,) {
    super();
  }

  openStats(team: Team, league: League) {
    this.statsTeam = team;
    this.statsLeague = league;

    if(document.body.clientWidth < 1000) {
      window.scroll({
        'left': 0,
        'top': document.body.scrollHeight - 400,
        'behavior': 'smooth'
      });
    }

    //TODO: Load stats
  }
}

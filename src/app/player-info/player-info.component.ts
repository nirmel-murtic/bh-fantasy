import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../shared/models/player';
import {PlayerService} from "../shared/services/player.service";
import {Store} from "@ngrx/store";
import {getCurrentPlayerWithId, State} from "../shared/reducers";

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit, OnDestroy {

  private subscriptions = [];

  @Input()
  public player: Player;

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

  constructor(private playerService: PlayerService, private store: Store<State>,) { }


  ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  getCurrentLeague, getCurrentPlayer, getCurrentTopPlayers,
  State
} from '../shared/reducers';
import {ActivatedRoute} from '@angular/router';
import {LeagueService} from '../shared/services/league.service';
import {StandingValue} from '../shared/models/standing-value';
import {Player} from '../shared/models/player';
import {addIfNotExist, removeItem} from '../shared/utils/utils';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit{
  [x: string]: any;

  _leagueId: number;

  public players: Player[];

  public standalone = true;

  private subscriptions = [];

  private static LOADING_IDS = [];

  @Input()
  public showHeader = true;

  @Input()
  public fullView = true;

  @Input()
  set leagueId(value: number) {
    this.standalone = false;


    if(value && value !== this._leagueId) {
      this.leagueService.loadPlayers(value).subscribe(result => {
        this.players = !this.limit || !result ? result : result.slice(0, this.limit);
      });

      this.subscriptions.push(this.store.select(getCurrentLeague).subscribe(league => {
        this.league = league;
      }));
    }

    this._leagueId = value;
  }

  ngOnInit() {
    if(this.standalone) {
      this.subscriptions.push(this.store.select(getCurrentPlayer).subscribe(([players, league]) => {
        if (league && !players && addIfNotExist(PlayerInfoComponent.LOADING_IDS, league.id)) {
          this.leagueService.loadPlayers(league.id);
        }

        this.league = league;
        this.players = !this.limit || !players ? players : players.slice(0, this.limit);

        if (this.players) {
          removeItem(PlayerInfoComponent.LOADING_IDS, league.id);
        }
      }));
    }
  }
  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private leagueService: LeagueService) {
  }


}

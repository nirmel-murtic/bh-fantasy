import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getCurrentLeague, getCurrentTopPlayers, State} from '../shared/reducers';
import {LeagueService} from "../shared/services/league.service";
import {TopPlayerValue} from "../shared/models/top-player-value";
import {ActivatedRoute} from "@angular/router";
import {addIfNotExist, removeItem} from "../shared/utils/utils";
import {League} from "../shared/models/league";
import {BaseComponent} from "../base.component";

@Component({
  selector: 'app-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.css']
})
export class TopPlayersComponent extends BaseComponent implements OnInit {

  public topPlayers: TopPlayerValue[];

  _leagueId: number;

  @Input()
  public showHeader = true;

  public standalone = true;

  public league: League;

  @Input()
  public fullView = true;

  private static LOADING_IDS = [];

  @Input() limit: number;

  @Input()
  set leagueId(value: number) {
    this.standalone = false;

    if(value && value !== this._leagueId) {
      this.leagueService.loadTopPlayers(value).subscribe(result => {
        this.topPlayers = !this.limit || !result ? result : result.slice(0, this.limit);
      });

      this.subscriptions.push(this.store.select(getCurrentLeague).subscribe(league => {
        this.league = league;
      }));
    }

    this._leagueId = value;
  }

  ngOnInit() {
    if(this.standalone) {
      this.subscriptions.push(this.store.select(getCurrentTopPlayers).subscribe(([topPlayers, league]) => {
        if (league && !topPlayers && addIfNotExist(TopPlayersComponent.LOADING_IDS, league.id)) {
          this.leagueService.loadTopPlayers(league.id);
        }

        this.league = league;
        this.topPlayers = !this.limit || !topPlayers ? topPlayers : topPlayers.slice(0, this.limit);

        if (this.topPlayers) {
          removeItem(TopPlayersComponent.LOADING_IDS, league.id);
        }
      }));
    }
  }

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private leagueService: LeagueService) {
    super();
  }
}

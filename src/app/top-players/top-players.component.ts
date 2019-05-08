import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getTopPlayers, State} from "../shared/reducers";
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

  private subscription: any;

  public standalone = true;

  @Input()
  set leagueId(value: number) {
    this.standalone = false;

    if(value != null && value !== this._leagueId) {
      this.leagueService.loadTopPlayers(value);
    }

    this._leagueId = value;
  }

  get leagueId() {
    return this._leagueId;
  }

  @Input() limit: number;

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      if(params.id) {
        this._leagueId = +params.id;

        this.leagueService.loadTopPlayers(this._leagueId);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private leagueService: LeagueService) {
    store.select(getTopPlayers).subscribe((standings => {
      standings.forEach((value, key) => {
        if (key === this._leagueId) {
          this.topPlayers = value;

          if (this.limit) {
            this.topPlayers = this.topPlayers.slice(0, this.limit);
          }
        }
      });
    }));
  }
}

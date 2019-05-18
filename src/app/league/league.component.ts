import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getCurrentLeague, State} from '../shared/reducers';
import {Store} from '@ngrx/store';
import {League} from '../shared/models/league';
import {LeagueService} from "../shared/services/league.service";

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit, OnDestroy {

  public leagueId: number;

  public league: League;

  private subscriptions = [];

  private loading = false;

  constructor(private store: Store<State>,
              private leagueService: LeagueService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.leagueId = params.leagueId ? +params.leagueId : null;
    }));

    this.subscriptions.push(this.store.select(getCurrentLeague).subscribe(league => {
      if(this.leagueId && (!league || !league.teams) && !this.loading) {
        this.loading = true;
        this.leagueService.loadLeagueDetails(league ? league.id : this.leagueId);
      }

      this.league = league;

      if(this.league && this.league.teams) {
        this.loading = false;
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}

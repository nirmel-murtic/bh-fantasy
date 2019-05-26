import {Component, OnInit} from '@angular/core';
import {getCurrentLeagueWithId, State} from '../shared/reducers';
import {Store} from '@ngrx/store';
import {League} from '../shared/models/league';
import {LeagueService} from "../shared/services/league.service";
import {BaseComponent} from "../base.component";

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent extends BaseComponent implements OnInit {

  public leagueId: number;

  public league: League;

  private loading = false;

  constructor(private store: Store<State>,
              private leagueService: LeagueService) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(this.store.select(getCurrentLeagueWithId).subscribe(([league, leagueId]) => {
      this.leagueId = leagueId;

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
}

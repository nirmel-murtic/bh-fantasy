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

  constructor(private store: Store<State>,
              private leagueService: LeagueService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      if(params.leagueId) {
        this.leagueId = +params.leagueId;

        this.leagueService.loadLeagueDetails(this.leagueId);
      }
    }));

    this.subscriptions.push(this.store.select(getCurrentLeague).subscribe(league => {
      this.league = league;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  scrollOnTop(event) {
    window.scroll(0,0);

    event.preventDefault();
  }
}

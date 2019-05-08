import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getLeagues, State} from '../shared/reducers';
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

  public leagues: League[];

  private subscription: any;

  constructor(private store: Store<State>,
              private leagueService: LeagueService,
              private route: ActivatedRoute) {
    store.select(getLeagues).subscribe(leagues => {
      this.leagues = leagues;

      leagues.forEach(league => {
        if (league.id === this.leagueId) {
          this.league = league;
        }
      });
    });
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      if(params.id) {
        this.leagueId = +params.id;

        this.leagueService.loadLeagueDetails(this.leagueId);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  scrollOnTop(event) {
    window.scroll(0,0);

    event.preventDefault();
  }
}

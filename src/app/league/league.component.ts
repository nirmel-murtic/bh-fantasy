import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {getLeagues, State} from "../shared/reducers";
import {Store} from "@ngrx/store";
import {League} from "../shared/models/league";

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
              private route: ActivatedRoute) {
    store.select(getLeagues).subscribe(leagues => {
      this.leagues = leagues;

      leagues.forEach(league => {
        if(league.id == this.leagueId) {
          this.league = league;
        }
      });
    });
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.leagueId = +params['id'];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

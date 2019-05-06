import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getLeagues, getTopPlayers, State} from "./shared/reducers";
import {LeagueService} from "./shared/services/league.service";
import {League, LeagueType} from "./shared/models/league";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bh-fantasy';

  public leagues: Observable<League[]>;

  constructor(
    private store: Store<State>,
    private leagueService: LeagueService) {
    this.leagues = store.select(getLeagues);
  }

  public ngOnInit() {
    this.leagueService.loadLeagues();
  }

  public get LeagueType() {
    return LeagueType;
}
}

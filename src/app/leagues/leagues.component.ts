import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getLeagues, State} from '../shared/reducers';
import {League} from '../shared/models/league';
import {BaseComponent} from "../base.component";

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent extends BaseComponent implements OnInit {

  public leagues: League[];

  constructor(private store: Store<State>) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(this.store.select(getLeagues).subscribe(leagues => {
      this.leagues = leagues;
    }));
  }
}

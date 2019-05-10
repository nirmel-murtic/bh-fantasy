import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getLeagues, State} from '../shared/reducers';
import {League} from '../shared/models/league';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit, OnDestroy {

  public leagues: League[];

  private subscriptions = [];

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.subscriptions.push(this.store.select(getLeagues).subscribe(leagues => {
      this.leagues = leagues;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}

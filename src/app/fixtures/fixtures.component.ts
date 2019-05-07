import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../shared/reducers';
import {LeagueService} from '../shared/services/league.service';
import {League} from '../shared/models/league';
import {Round} from '../shared/models/round';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  @Input() league: League;

  public visibleRoundIndex = 0;

  public selectedRoundIndex = 0;

  constructor(
    private store: Store<State>,
    private leagueService: LeagueService) {
  }
  ngOnInit() {
    this.leagueService.loadRounds(this.league.id);
  }

  public selectRound(index: number, event) {
    this.selectedRoundIndex = index;
    this.visibleRoundIndex = index;

    event.preventDefault();
  }

  public selectVisibleRound(index: number, event) {
    this.visibleRoundIndex = index;

    event.preventDefault();
  }
}

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

  _league: League;

  @Input('league')
  set league(value: League) {
    this._league = value;

    if (this._league.rounds) {
      this.currentRound = this._league.rounds[this.selectedRoundIndex];

      if(!this.currentRound.matches) {
        this.leagueService.loadRoundDetails(this._league.id, this.currentRound.id);
      }
    }
  }

  get league() {
    return this._league;
  }

  public visibleRoundIndex = 0;

  public selectedRoundIndex = 0;

  public currentRound: Round;

  constructor(
    private store: Store<State>,
    private leagueService: LeagueService) {
  }
  ngOnInit() {
    this.leagueService.loadRounds(this.league.id);
  }

  public selectRound(index: number, event) {
    this.selectedRoundIndex = index;

    this.currentRound = this.league.rounds[this.selectedRoundIndex];

    this.leagueService.loadRoundDetails(this.league.id, this.currentRound.id);

    event.preventDefault();
  }

  public selectVisibleRound(index: number, event) {
    this.visibleRoundIndex = index;

    event.preventDefault();
  }
}

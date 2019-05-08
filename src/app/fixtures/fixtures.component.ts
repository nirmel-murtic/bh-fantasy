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
export class FixturesComponent {

  _league: League;

  @Input('league')
  set league(value: League) {
    if(this._league && value.id !== this._league.id) {
      this.selectedRoundIndex = null;
      this.visibleRoundIndex = null;
    }

    if(!this._league || value.id !== this._league.id) {
      this.leagueService.loadRounds(value.id);
    }

    this._league = value;

    if (this._league.rounds && this._league.teams) {
      if(this.selectedRoundIndex == null) {
        this.selectedRoundIndex = this.getCurrentRoundIndex();
        this.visibleRoundIndex = this.selectedRoundIndex;
      }

      this.currentRound = this._league.rounds[this.selectedRoundIndex];

      if(!this.currentRound.matches) {
        this.leagueService.loadRoundDetails(this._league.id, this.currentRound.id);
      }
    }
  }

  public getCurrentRoundIndex() {
    if (this.league.rounds) {
      for(let i = 0; i < this._league.rounds.length; i++) {
        if(this._league.rounds[i].id === this.league.currentRoundId) {
          return i;
        }
      }
    }

    return 0;
  }

  get league() {
    return this._league;
  }

  public visibleRoundIndex = null;

  public selectedRoundIndex = null;

  public currentRound: Round;

  constructor(
    private store: Store<State>,
    private leagueService: LeagueService) {
  }

  public selectRound(index: number, event) {
    this.selectedRoundIndex = index;

    this.currentRound = this.league.rounds[this.selectedRoundIndex];

    this.leagueService.loadRoundDetails(this.league.id, this.currentRound.id);

    event.preventDefault();
  }

  public selectVisibleRound(index: number, selectIndex: number, event) {
    this.visibleRoundIndex = index;

    this.selectRound(selectIndex, event);
  }
}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getCurrentLeague, getCurrentRound, State} from '../shared/reducers';
import {LeagueService} from '../shared/services/league.service';
import {League} from '../shared/models/league';
import {Round} from '../shared/models/round';
import {ActivatedRoute, Router} from "@angular/router";
import {addIfNotExist, removeItem} from "../shared/utils/utils";

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit, OnDestroy {

  _league: League;

  public visibleRoundIndex = null;

  public selectedRoundIndex = null;

  public currentRound: Round;

  private subscriptions = [];

  private static LOADING_IDS = [];

  private static LOADING_ROUNDS = false;

  @Input('league')
  set league(value: League) {
    if(value) {
      if (this._league && value.id !== this._league.id) {
        this.selectedRoundIndex = null;
        this.visibleRoundIndex = null;
        FixturesComponent.LOADING_ROUNDS = false;
        FixturesComponent.LOADING_IDS = [];
      }

      if (!value.rounds) {
        if (!FixturesComponent.LOADING_ROUNDS) {
          FixturesComponent.LOADING_ROUNDS = true;
          this.leagueService.loadRounds(value.id);
        }
      } else {
        FixturesComponent.LOADING_ROUNDS = false;
      }
    }

    this._league = value;
  }

  public getCurrentRoundIndex() {
    if (this.league && this.league.rounds) {
      const roundId = this.currentRound ? this.currentRound.id : this.league.currentRoundId;

      for(let i = 0; i < this._league.rounds.length; i++) {
        if(this._league.rounds[i].id === roundId) {
          return i;
        }
      }
    }

    return 0;
  }

  get league() {
    return this._league;
  }

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private leagueService: LeagueService) {
  }

  public selectRound(index: number, event) {
    this.currentRound = this.league.rounds[index];

    this.router.navigateByUrl('/leagues/' + this.league.id + '/rounds/' + this.currentRound.id);

    event.preventDefault();
  }

  public selectVisibleRound(index: number, selectIndex: number, event) {
    this.visibleRoundIndex = index;

    this.selectRound(selectIndex, event);
  }

  ngOnInit() {
    this.subscriptions.push(this.store.select(getCurrentLeague).subscribe(league => {
      this.league = league;
    }));

    this.subscriptions.push(
      this.store.select(getCurrentRound).subscribe(([round, league]) => {
        if(round) {
          if(!round.matches) {
            if(addIfNotExist(FixturesComponent.LOADING_IDS, round.id)) {
              this.leagueService.loadRoundDetails(
                league.id, round.id);
            }
          } else {
            removeItem(FixturesComponent.LOADING_IDS, round.id);
          }
        }

        this.currentRound = round;
        this.selectedRoundIndex = this.getCurrentRoundIndex();
        this.visibleRoundIndex = this.selectedRoundIndex;
      }));
  }

  public hasTime(date: Date) {
    const value = new Date(date);

    if (value.getHours() == 0 && value.getMinutes() == 0) {
      return false;
    }

    return true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}

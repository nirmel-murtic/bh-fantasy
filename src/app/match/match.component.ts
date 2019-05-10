import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getCurrentLeague, getCurrentMatch, getCurrentRound, State} from '../shared/reducers';
import {LeagueService} from '../shared/services/league.service';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../shared/models/match';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, OnDestroy {

  public matchId: number;

  public leagueId: number;

  public roundId: number;

  public match: Match;

  private subscriptions = [];

  private leagueSubscription: any;

  private roundSubscription: any;

  private loading = false;

  constructor(private store: Store<State>,
              private route: ActivatedRoute,
              private leagueService: LeagueService) { }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      if(params.matchId) {
        this.matchId = +params.matchId;
        this.leagueId = +params.leagueId;
        this.roundId = +params.roundId;

        this.loadLeagueDetails();
      }
    }));
  }

  loadLeagueDetails() {
    this.leagueSubscription = this.store.select(getCurrentLeague).subscribe(league => {
      if(!league || !league.teams || !league.rounds) {
        if(!this.loading) {
          this.leagueService.loadLeagueDetails(this.leagueId);
          this.leagueService.loadRounds(this.leagueId);
        }

        this.loading = true;
      } else {
        this.loading = false;

        if (this.leagueSubscription) {
          this.leagueSubscription.unsubscribe();
        }

        this.loadRoundDetails();
      }
    });

    this.subscriptions.push(this.leagueSubscription);
  }

  loadRoundDetails() {
    this.roundSubscription = this.store.select(getCurrentRound).subscribe(round => {
      if(!round || !round.matches) {
        if(!this.loading) {
          this.leagueService.loadRoundDetails(this.leagueId, this.roundId);
        }

        this.loading = true;
      } else {
        this.loading = false;

        if(this.roundSubscription) {
          this.roundSubscription.unsubscribe();
        }

        this.loadMatchDetails();
      }
    });
    this.subscriptions.push(this.roundSubscription);
  }

  loadMatchDetails() {
    this.subscriptions.push(this.store.select(getCurrentMatch).subscribe(match => {
      this.match = match;

      if(!match || !this.match.lineup1) {
        if(!this.loading) {
          this.leagueService.loadMatchDetails(this.leagueId, this.roundId, this.matchId);
        }

        this.loading = true;
      } else {
        this.loading = false;
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}

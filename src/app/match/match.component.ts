import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getCurrentLeague, getCurrentMatch, getCurrentRound, State} from '../shared/reducers';
import {LeagueService} from '../shared/services/league.service';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../shared/models/match';
import {Lineup} from '../shared/models/lineup';
import {PlayerEvent} from '../shared/models/player';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
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

  public playerEventsLineup1 = new Map<number, PlayerEvent[]>();
  public playerEventsLineup2 = new Map<number, PlayerEvent[]>();

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

  private getPlayerEvents(lineup: Lineup) {
    const players = [];

    players.push(...lineup.startingPlayers.map(player => player.id));
    players.push(...lineup.availableSubstitutions.map(player => player.id));

    const playerEvents = new Map<number, PlayerEvent[]>();

    if(!this.match) {
      return playerEvents;
    }

    if(this.match.cards) {
      this.match.cards.forEach(card => {
        if (players.indexOf(card.player.id) !== -1) {
          if (!playerEvents.has(card.player.id)) {
            playerEvents.set(card.player.id, []);
          }

          playerEvents.get(card.player.id).push({...card, eventType: 'card'});
        }
      });
    }

    if(this.match.missedPenalties) {
      this.match.missedPenalties.forEach(penalty => {
        if (players.indexOf(penalty.player.id) !== -1) {
          if (!playerEvents.has(penalty.player.id)) {
            playerEvents.set(penalty.player.id, []);
          }

          playerEvents.get(penalty.player.id).push({...penalty, eventType: 'missed-penalty'});
        }

        if (penalty.savedBy && players.indexOf(penalty.savedBy.id) !== -1) {
          if (!playerEvents.has(penalty.savedBy.id)) {
            playerEvents.set(penalty.savedBy.id, []);
          }

          playerEvents.get(penalty.savedBy.id).push({...penalty, eventType: 'missed-penalty'});
        }
      });
    }

    if(this.match.goals) {
      this.match.goals.forEach(goal => {
        if (players.indexOf(goal.player.id) !== -1) {
          if (!playerEvents.has(goal.player.id)) {
            playerEvents.set(goal.player.id, []);
          }

          playerEvents.get(goal.player.id).push({...goal, eventType: 'goal'});
        }

        if (goal.assist) {
          if (players.indexOf(goal.assist.id) !== -1) {
            if (!playerEvents.has(goal.assist.id)) {
              playerEvents.set(goal.assist.id, []);
            }

            playerEvents.get(goal.assist.id).push({...goal, eventType: 'goal'});
          }
        }
      });
    }

    if(lineup.substitutionChanges) {
      lineup.substitutionChanges.forEach(change => {
        if (change.player && players.indexOf(change.player.id) !== -1) {
          if (!playerEvents.has(change.player.id)) {
            playerEvents.set(change.player.id, []);
          }

          playerEvents.get(change.player.id).push({...change, eventType: 'change'});
        }

        if(change.substitutePlayer && players.indexOf(change.substitutePlayer.id) !== -1) {
          if (!playerEvents.has(change.substitutePlayer.id)) {
            playerEvents.set(change.substitutePlayer.id, []);
          }

          playerEvents.get(change.substitutePlayer.id).push({...change, eventType: 'change'});
        }
      });
    }

    if(lineup.capiten) {
      if (!playerEvents.has(lineup.capiten.id)) {
        playerEvents.set(lineup.capiten.id, []);
      }

      playerEvents.get(lineup.capiten.id).push({eventType: 'capiten'});
    }

    playerEvents.forEach(value => {
      value.sort((a,b) => a.minute - b.minute);
    });

    return playerEvents;
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
        this.playerEventsLineup1 = this.getPlayerEvents(this.match.lineup1);
        this.playerEventsLineup2 = this.getPlayerEvents(this.match.lineup2);

        this.loading = false;
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}

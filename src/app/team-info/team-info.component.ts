import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../shared/models/team';
import {
  getCurrentTeamWithId,
  State
} from '../shared/reducers';
import {Store} from '@ngrx/store';
import {TeamService} from '../shared/services/team.service';
import {BaseComponent} from '../base.component';
import {League} from '../shared/models/league';
import {Player, PlayerCoefficients, PlayerType} from '../shared/models/player';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent extends BaseComponent implements OnInit {

  public averageAge: number;

  @Input()
  public team: Team;

  public leagues: League[];

  public players: Player[];



  ngOnInit() {
    this.subscriptions.push(this.store.select(getCurrentTeamWithId).subscribe(([team, teamId]) => {
      if (team) {
        this.team = team;

        this.leagues = [];

        const groupsMap: Map<number, League> = new Map<number, League>();

        this.team.leagues.forEach(
          league => {
            if (league.type === 'LeagueGroup') {
              groupsMap.set(league.id, league);
            }
          }
        );
        this.team.leagues.forEach(
          league => {
            if (league.groups && league.groups.length > 0) {
              this.leagues.push({
                  ...league,
                  groups: league.groups.filter(group => groupsMap.has(group.id))
                }
              );
            } else if (league.type !== 'LeagueGroup') {
              this.leagues.push(league);
              this.getAverageAge(team);
            }
          }
        );

        this.players = this.team.players.sort((a, b) =>
          this.getCoeficient(a) < this.getCoeficient(b) ? -1 : 1);
      }

      if (!this.team && teamId) {
        this.teamService.loadTeam(teamId);
      }
    }));
  }

   getCoeficient(player: Player) {
    if (player.type === PlayerType.DEFENDER) {
      return PlayerCoefficients.DEFENDER;
    } else if (player.type === PlayerType.MIDDLE) {
      return PlayerCoefficients.MIDDLE;
    } else if (player.type === PlayerType.STRIKER) {
      return PlayerCoefficients.STRIKER;
    } else if (player.type === PlayerType.GOALKEEPER) {
      return PlayerCoefficients.GOALKEEPER;
    } else { return 0; }
  }

  constructor(private teamService: TeamService, private store: Store<State>) {
    super();
  }

  getAverageAge(team: Team) {
    var age  = 0;

    for ( const player of this.team.players) {
      age +=  player.yearsCount;
    }

    age = age / team.players.length;

    return age;
  }

}


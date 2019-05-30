import {Component, OnInit} from '@angular/core';
import {Team} from "../shared/models/team";
import {TeamService} from "../shared/services/team.service";
import {Store} from "@ngrx/store";
import {getCurrentLeague, getFantasyTeam, getLeaguePlayers, State} from "../shared/reducers";
import {League} from "../shared/models/league";
import {BaseComponent} from "../base.component";
import {LeagueService} from "../shared/services/league.service";
import {addIfNotExist, removeItem} from "../shared/utils/utils";
import {Player, PlayerType} from "../shared/models/player";
import {PlayerService} from "../shared/services/player.service";
import {SetMyFantasyTeamAction} from "../shared/actions/teams.actions";

@Component({
  selector: 'app-manage-fantasy-team',
  templateUrl: './manage-fantasy-team.component.html',
  styleUrls: ['./manage-fantasy-team.component.css']
})
export class ManageFantasyTeamComponent extends BaseComponent implements OnInit {

  public team: Team;

  public playersMap: Map<number, Player> = new Map<number, Player>();

  public league: League;

  private static LOADING_LEAGUE_IDS = [];

  public filterType: string = null;

  public filteredPlayersMap: Map<number, Player> = new Map<number, Player>();

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private playerService: PlayerService,
    private store: Store<State>) {
    super();

    this.team = {} as Team;
  }

  ngOnInit() {
    this.subscriptions.push(this.store.select(getCurrentLeague).subscribe(league => {
      this.league = league;

      if(this.league) {
        this.subscriptions.push(this.store.select(
          getFantasyTeam, {leagueId: this.league.id}).subscribe(team => {
          if (team) {
            this.team = team;

            this.removePlayersFromAvailablePlayers();
          } else {
            this.team = {} as Team;
          }
        }));

        this.subscriptions.push(this.store.select(getLeaguePlayers,
          {leagueId: this.league.regularLeague.id}).subscribe(
          players => {
            if(!players && addIfNotExist(ManageFantasyTeamComponent.LOADING_LEAGUE_IDS, this.league.id)) {
              this.playerService.loadPlayers(this.league.regularLeague.id);

              //this.loadTeam();
            } else {
              this.playersMap = new Map<number, Player>();
              if(players) {
                players.forEach(player => {
                  this.playersMap.set(player.id, player);
                });
              }

              this.removePlayersFromAvailablePlayers();

              removeItem(ManageFantasyTeamComponent.LOADING_LEAGUE_IDS, this.league.id);
            }
          }
        ));
      }
    }))
  }

  loadTeam(teamId) {
    this.teamService.loadTeam(189).subscribe(team => {
      this.team = team;

      this.store.dispatch(new SetMyFantasyTeamAction(team, this.league.id));
    });
  }

  getPlayerType(player: Player) {
    if(player.type == PlayerType.GOALKEEPER || player.type == 'Goalkeaper') {
      return 'GK';
    } else if(player.type == PlayerType.DEFENDER) {
      return 'DF';
    } else if(player.type == PlayerType.MIDDLE) {
      return 'MD';
    } else if(player.type == PlayerType.STRIKER) {
      return 'ST';
    }
  }

  get playerTypes() {
    return ['All', PlayerType.GOALKEEPER, PlayerType.DEFENDER, PlayerType.MIDDLE, PlayerType.STRIKER];
  }

  removePlayersFromAvailablePlayers() {
    if(this.team.players) {
      this.team.players.forEach(player => {
        this.playersMap.delete(player.id);
        this.filteredPlayersMap.delete(player.id);
      });
    }
  }

  saveTeam(team: Team) {
    if(!team.id) {
      this.subscriptions.push(this.teamService.createTeam(team).subscribe(team => {
        this.leagueService.referenceTeam(this.league, team).subscribe(team => {
          this.team = team;
        });
      }));
    }
  }

  selectPlayer(player: Player) {
    this.teamService.addPlayer(this.team.id, player);
  }

  selectType(type: string) {
    this.filterType = type;

    this.filteredPlayersMap.clear();

    if(this.filterType) {
      this.playersMap.forEach((value, key) => {
        if(this.checkFilter(value)) {
          this.filteredPlayersMap.set(key, value);
        }
      });
    }
  }

  checkFilter(player: Player) {
    if(this.filterType === 'All') {
      return true;
    }

    if(this.filterType === PlayerType.GOALKEEPER && player.type === 'Goalkeaper') {
      return true;
    }

    return !this.filterType || player.type === this.filterType;
  }
}

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

  private static LOADING_LEAGUE_IDS_PLAYERS = [];

  private static LOADING_LEAGUE_DETAILS = [];

  public filterType: string = null;

  public filterTeam: number = null;

  public filteredPlayersMap: Map<number, Player> = new Map<number, Player>();

  public playerTeams: Map<number, Team> = new Map<number, Team>();

  public searchValue: string = null;

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

            if(addIfNotExist(ManageFantasyTeamComponent.LOADING_LEAGUE_DETAILS, this.league.id)) {
              this.teamService.loadTeam(team.id).subscribe(team => {
                this.store.dispatch(new SetMyFantasyTeamAction(team, this.league.id));

                removeItem(ManageFantasyTeamComponent.LOADING_LEAGUE_DETAILS, this.league.id);
              });
            }

            this.removePlayersFromAvailablePlayers();
          } else {
            this.team = {} as Team;
          }
        }));

        this.subscriptions.push(this.store.select(getLeaguePlayers,
          {leagueId: this.league.regularLeague.id}).subscribe(
          players => {
            if(!players && addIfNotExist(ManageFantasyTeamComponent.LOADING_LEAGUE_IDS_PLAYERS, this.league.id)) {
              this.playerService.loadPlayers(this.league.regularLeague.id);
            } else {
              this.playersMap = new Map<number, Player>();
              if(players) {
                players.forEach(player => {
                  this.playersMap.set(player.id, player);

                  player.teams.forEach(team => {
                    if(!this.playerTeams.has(team.id)) {
                      this.playerTeams.set(team.id, team);
                    }
                  });
                });
              }

              this.removePlayersFromAvailablePlayers();

              removeItem(ManageFantasyTeamComponent.LOADING_LEAGUE_IDS_PLAYERS, this.league.id);
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

    this.refreshPlayersMap();
  }

  selectTeam(id: number) {
    this.filterTeam = id;

    this.refreshPlayersMap();
  }

  checkFilter(player: Player) {
    if(this.searchValue && player.fullName.toLocaleLowerCase().indexOf(this.searchValue.toLocaleLowerCase()) === -1) {
      return false;
    }

    if(this.filterTeam && this.filterTeam !== 0) {
      if(player.teams.map(team => team.id).indexOf(this.filterTeam) === -1) {
        return false;
      }
    }

    if(this.filterType === 'All') {
      return true;
    }

    if(this.filterType === PlayerType.GOALKEEPER && player.type === 'Goalkeaper') {
      return true;
    }

    return !this.filterType || player.type === this.filterType;
  }

  search(value: string) {
    this.searchValue = value;

    this.refreshPlayersMap();
  }

  refreshPlayersMap() {
    this.filteredPlayersMap.clear();

    this.playersMap.forEach((value, key) => {
      if(this.checkFilter(value)) {
        this.filteredPlayersMap.set(key, value);
      }
    });
  }
}

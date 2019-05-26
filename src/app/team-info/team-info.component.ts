import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../shared/models/player";
import {League} from "../shared/models/league";
import {Team} from "../shared/models/team";
import {
  getCurrentTeamWithId,
  State
} from "../shared/reducers";
import {Store} from "@ngrx/store";
import {TeamService} from "../shared/services/team.service";

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {

  @Input()
  public team: Team;

  public statsLeague: League;

  public statsPlayer: Player;

  ngOnInit() {
    this.subscriptions.push(this.store.select(getCurrentTeamWithId).subscribe(([team, teamId]) => {
      if(team) {
        this.team = team;
      }

      if(!this.team && teamId) {
        this.teamService.loadTeam(teamId);
      }
    }));
  }

  constructor(private teamService: TeamService, private store: Store<State>, ) {

  }

  openStats(player: Player, league: League) {
    this.statsPlayer = player;
    this.statsLeague = league;

    if(document.body.clientWidth < 1000) {
      window.scroll({
        'left': 0,
        'top': document.body.scrollHeight - 400,
        'behavior': 'smooth'
      });
    }
  }
}

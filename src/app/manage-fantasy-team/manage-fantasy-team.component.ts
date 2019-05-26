import { Component, OnInit } from '@angular/core';
import {Team} from "../shared/models/team";
import {TeamService} from "../shared/services/team.service";
import {Store} from "@ngrx/store";
import {getCurrentLeague, getFantasyTeam, State} from "../shared/reducers";
import {League} from "../shared/models/league";
import {BaseComponent} from "../base.component";
import {LeagueService} from "../shared/services/league.service";

@Component({
  selector: 'app-manage-fantasy-team',
  templateUrl: './manage-fantasy-team.component.html',
  styleUrls: ['./manage-fantasy-team.component.css']
})
export class ManageFantasyTeamComponent extends BaseComponent implements OnInit {

  public team: Team;

  private league: League;

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
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
          } else {
            this.team = {} as Team;
          }
        }));
      }
    }))
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
}

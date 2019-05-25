import { Component, OnInit } from '@angular/core';
import {Team} from "../shared/models/team";

@Component({
  selector: 'app-manage-fantasy-team',
  templateUrl: './manage-fantasy-team.component.html',
  styleUrls: ['./manage-fantasy-team.component.css']
})
export class ManageFantasyTeamComponent implements OnInit {

  public team: Team;

  constructor() {
    this.team = {} as Team;
  }

  ngOnInit() {
  }

  saveTeam(team: Team) {

  }
}

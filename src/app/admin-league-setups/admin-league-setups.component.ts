import { Component, OnInit } from '@angular/core';
import {AdminService} from "../shared/services/admin.service";
import {BaseComponent} from "../base.component";
import {Store} from "@ngrx/store";
import {getLeagueSetups, State} from "../shared/reducers";
import {LeagueSetup} from "../shared/models/league-setup";

@Component({
  selector: 'app-admin-league-setups',
  templateUrl: './admin-league-setups.component.html',
  styleUrls: ['./admin-league-setups.component.css']
})
export class AdminLeagueSetupsComponent extends BaseComponent implements OnInit {

  public leagueSetups: LeagueSetup[];

  constructor(private adminService: AdminService, private store: Store<State>) {
    super();
  }

  ngOnInit() {
    this.adminService.loadLeagueSetups();

    this.subscriptions.push(this.store.select(getLeagueSetups).subscribe(
      leagueSetups => {
        this.leagueSetups = leagueSetups;
      }
    ));
  }

  process(setup: LeagueSetup) {
    this.adminService.processLeagueSetup(setup);
  }
}

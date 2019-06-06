import { Component, OnInit } from '@angular/core';
import {User} from "../shared/models/user";
import {getCurrentUser, State} from "../shared/reducers";
import {BaseComponent} from "../base.component";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  public user: User;

  constructor(private store: Store<State>) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(this.store.select(getCurrentUser).subscribe(user => {
      this.user = user;
    }));
  }

  get hasTeams() {
    return this.user && this.user.teams && this.user.teams.length;
  }
}

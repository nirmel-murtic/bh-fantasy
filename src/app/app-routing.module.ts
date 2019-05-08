import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeagueComponent} from "./league/league.component";
import {StandingsComponent} from "./standings/standings.component";
import {TopPlayersComponent} from "./top-players/top-players.component";

const routes: Routes = [
  {
    path: '',
    component: LeagueComponent
  },
  {
    path: 'leagues/:id',
    component: LeagueComponent
  },
  {
    path: 'leagues/:id/standings',
    component: StandingsComponent
  },
  {
    path: 'leagues/:id/top-players',
    component: TopPlayersComponent
  },
  {
    path: 'leagues',
    component: LeagueComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

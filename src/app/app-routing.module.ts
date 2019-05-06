import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LeagueComponent} from "./league/league.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'leagues/:id',
    component: LeagueComponent
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

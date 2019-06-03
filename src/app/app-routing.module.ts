import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeagueComponent} from "./league/league.component";
import {StandingsComponent} from "./standings/standings.component";
import {TopPlayersComponent} from "./top-players/top-players.component";
import {MatchComponent} from "./match/match.component";
import {LeaguesComponent} from './leagues/leagues.component';
import {PlayerInfoComponent} from './player-info/player-info.component';
import {ManageFantasyTeamComponent} from "./manage-fantasy-team/manage-fantasy-team.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MaintenanceComponent} from "./maintenance/maintenance.component";
import {TeamInfoComponent} from "./team-info/team-info.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {
    path: '',
    component: LeaguesComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent
  },
  {
    path: 'leagues/:leagueId',
    component: LeagueComponent
  },
  {
    path: 'leagues/:leagueId/standings',
    component: StandingsComponent
  },
  {
    path: 'leagues/:leagueId/top-players',
    component: TopPlayersComponent
  },
  {
    path: 'leagues/:leagueId/rounds/:roundId/matches/:matchId',
    component: MatchComponent
  },
  {
    path: 'leagues',
    component: LeaguesComponent
  },
  {
    path: 'leagues/:leagueId/manage-team',
    component: ManageFantasyTeamComponent
  },
  {
    path: 'leagues/:leagueId/rounds/:roundId',
    component: LeagueComponent
  },
  {
    path: 'players/:playerId',
    component: PlayerInfoComponent
  },
  {
    path: 'teams/:teamId',
    component: TeamInfoComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

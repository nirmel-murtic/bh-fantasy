import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeagueComponent} from "./league/league.component";
import {StandingsComponent} from "./standings/standings.component";
import {TopPlayersComponent} from "./top-players/top-players.component";
import {MatchComponent} from "./match/match.component";
import {LeaguesComponent} from './leagues/leagues.component';
import {PlayerInfoComponent} from './player-info/player-info.component';

const routes: Routes = [
  {
    path: '',
    component: LeaguesComponent
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
    path: 'leagues/:leagueId/rounds/:roundId',
    component: LeagueComponent
  },
  {path: 'players/:playerId',
    component: PlayerInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandingsComponent } from './standings/standings.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {ApiInterceptor} from './shared/http/api-interceptor';
import {LeagueService} from './shared/services/league.service';
import {ActionReducerMap, META_REDUCERS, MetaReducer, StoreModule} from '@ngrx/store';
import {logger} from './shared/reducers';
import { LeagueComponent } from './league/league.component';
import { TopPlayersComponent } from './top-players/top-players.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { LineupComponent } from './lineup/lineup.component';
import { MatchComponent } from './match/match.component';
import { LeaguesComponent } from './leagues/leagues.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PlayerInfoComponent } from './player-info/player-info.component';
import {PlayerService} from "./shared/services/player.service";
import { ManageFantasyTeamComponent } from './manage-fantasy-team/manage-fantasy-team.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { TeamService } from "./shared/services/team.service";
import { FormsModule } from '@angular/forms';
import { TeamInfoComponent } from './team-info/team-info.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import * as fromRoot from './shared/reducers';
import {AuthService} from "./shared/services/auth.service";
import { LoginButtonComponent } from './login-button/login-button.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLeagueSetupsComponent } from './admin-league-setups/admin-league-setups.component';
import {AdminService} from "./shared/services/admin.service";
import { DashboardComponent } from './dashboard/dashboard.component';

export const REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<fromRoot.State>
  >('Registered Reducers');

export function getMetaReducers(): MetaReducer<fromRoot.State>[] {
  return [logger];
}

export function getReducers() {
  return {...fromRoot.reducers, router: routerReducer};
}

@NgModule({
  declarations: [
    AppComponent,
    StandingsComponent,
    LeagueComponent,
    TopPlayersComponent,
    FixturesComponent,
    LineupComponent,
    MatchComponent,
    LeaguesComponent,
    PlayerInfoComponent,
    ManageFantasyTeamComponent,
    PageNotFoundComponent,
    MaintenanceComponent,
    TeamInfoComponent,
    LoginButtonComponent,
    AdminComponent,
    AdminLeagueSetupsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(REDUCER_TOKEN),
    StoreRouterConnectingModule.forRoot(),
    NgbModule,
    FormsModule,
    ScrollingModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'})
  ],
  providers: [
    LeagueService,
    PlayerService,
    TeamService,
    AuthService,
    AdminService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: META_REDUCERS, useFactory: getMetaReducers},
    {provide: REDUCER_TOKEN, useFactory: getReducers}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

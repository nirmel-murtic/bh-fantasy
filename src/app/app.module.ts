import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandingsComponent } from './standings/standings.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInterceptor} from './shared/http/api-interceptor';
import {LeagueService} from './shared/services/league.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from './shared/reducers/index';
import { LeagueComponent } from './league/league.component';
import { TopPlayersComponent } from './top-players/top-players.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { LineupComponent } from './lineup/lineup.component';
import { MatchComponent } from './match/match.component';
import { LeaguesComponent } from './leagues/leagues.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    StandingsComponent,
    LeagueComponent,
    TopPlayersComponent,
    FixturesComponent,
    LineupComponent,
    MatchComponent,
    LeaguesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({...reducers,
      router: routerReducer,
    }),
    StoreRouterConnectingModule.forRoot(),
    NgbModule
  ],
  providers: [
    LeagueService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

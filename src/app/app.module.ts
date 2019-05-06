import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StandingsComponent } from './standings/standings.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInterceptor} from './shared/http/api-interceptor';
import {LeagueService} from './shared/services/league.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from './shared/reducers/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StandingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    LeagueService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

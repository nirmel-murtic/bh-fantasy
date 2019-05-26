import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {Observable} from 'rxjs';
import {League} from '../models/league';
import {Endpoint} from '../constants/endpoints';
import {
  LoadLeagueAction,
  LoadLeaguesAction, LoadMatchAction, LoadPlayersAction,
  LoadRoundAction,
  LoadRoundsAction,
  LoadStandingsAction,
  LoadTopPlayersAction,
  LoadTeamsAction
} from '../actions/leagues.actions';
import {StandingValue} from '../models/standing-value';
import {TopPlayerValue} from '../models/top-player-value';
import {Round} from '../models/round';
import {Match} from '../models/match';
import {map, share} from "rxjs/operators";
import {Player} from '../models/player';
import {Router} from "@angular/router";
import {handleApiError} from "../utils/utils";
import {Team} from "../models/team";
import {SetCurrentTeamAction, SetMyFantasyTeamAction} from "../actions/teams.actions";

@Injectable()
export class LeagueService {

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<State>) {
  }

  loadLeagues(): void {
    this.http
      .get<League[]>(Endpoint.LEAGUES)
      .subscribe(data => {
        this.store.dispatch(new LoadLeaguesAction(data));
      }, error => handleApiError(error, this.router));
  }

  loadStandings(leagueId: number): Observable<StandingValue[]> {
    const result: Observable<StandingValue[]> = this.http
      .get<StandingValue[]>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString()).concat(Endpoint.STANDINGS))
      .pipe(share());

    result.subscribe(data => {
      this.store.dispatch(new LoadStandingsAction(data, leagueId));
    }, error => handleApiError(error, this.router));

    return result;
  }

  loadTopPlayers(leagueId: number): Observable<TopPlayerValue[]> {
    const result: Observable<TopPlayerValue[]> = this.http
      .get<TopPlayerValue[]>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString()).concat(Endpoint.TOP_PLAYERS))
      .pipe(share());

    result.subscribe(data => {
      this.store.dispatch(new LoadTopPlayersAction(data, leagueId));
    }, error => handleApiError(error, this.router));

    return result;
  }

  loadPlayers(leagueId: number): Observable<Player[]> {
    const result: Observable<Player[]> = this.http
      .get<Player[]>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString()).concat(Endpoint.PLAYERS))
      .pipe(share());

    result.subscribe(data => {
      this.store.dispatch(new LoadPlayersAction(data, leagueId));
    });

    return result;
  }
  loadTeam(leagueId: number): Observable<Team[]> {
    const result: Observable<Team[]> = this.http
      .get<Team[]>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString()).concat(Endpoint.TEAMS))
      .pipe(share());

    result.subscribe(data => {
      this.store.dispatch(new LoadTeamsAction(data, leagueId));
    });

    return result;
  }

  loadRounds(leagueId: number): void {
    this.http
      .get<Round[]>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString()).concat(Endpoint.ROUNDS))
      .subscribe(data => {
        this.store.dispatch(new LoadRoundsAction(data, leagueId));
      }, error => handleApiError(error, this.router));
  }

  loadLeagueDetails(leagueId: number): void {
    this.http
      .get<League>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString()))
      .subscribe(data => {
        this.store.dispatch(new LoadLeagueAction(data, leagueId));
      }, error => handleApiError(error, this.router));
  }

  loadRoundDetails(leagueId: number, roundId: number): void {
    this.http
      .get<Round>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString())
        .concat(Endpoint.ROUNDS).concat('/').concat(roundId.toString()))
      .subscribe(data => {
        this.store.dispatch(new LoadRoundAction(data, leagueId, roundId));
      }, error => handleApiError(error, this.router));
  }

  loadMatchDetails(leagueId: number, roundId: number, matchId: number): void {
    this.http
      .get<Match>(Endpoint.LEAGUES.concat('/').concat(leagueId.toString())
        .concat(Endpoint.ROUNDS).concat('/').concat(roundId.toString())
        .concat(Endpoint.MATCHES).concat('/').concat(matchId.toString()))
      .subscribe(data => {
        this.store.dispatch(new LoadMatchAction(data, leagueId, roundId, matchId));
      }, error => handleApiError(error, this.router));
  }

  referenceTeam(league: League, team: Team): Observable<Team> {
    const result = this.http
      .post(Endpoint.LEAGUES.concat('/').concat(league.id.toString()).concat('/add-team'), team)
      .pipe(share())
      .pipe(map(
      () => {
        if(!team.leagues) {
          team.leagues = [];
        }

        return {
          ...team,
          leagues: [...team.leagues, league]
        } as Team;
      }
    ));

    result
      .subscribe((team) => {
        this.store.dispatch(new SetMyFantasyTeamAction(team, league.id));
      }, error => handleApiError(error, this.router));

    return result;
  }
}

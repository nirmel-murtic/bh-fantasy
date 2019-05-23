import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  State
} from '../shared/reducers';
import {ActivatedRoute} from '@angular/router';
import {LeagueService} from '../shared/services/league.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {

  @Input()
  public showHeader = true;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private leagueService: LeagueService) {
  }

  ngOnInit(): void {
  }
}

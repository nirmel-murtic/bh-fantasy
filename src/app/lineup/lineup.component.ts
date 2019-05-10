import {Component, Input, OnInit} from '@angular/core';
import {Lineup} from '../shared/models/lineup';
import {Player} from '../shared/models/player';

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent implements OnInit {

  _lineup: Lineup;

  public startingPlayers: Map<string, Player[]> = new Map();

  public startingPlayersKeys: IterableIterator<string>;

  public playerTypeClasses = [];

  @Input()
  public set lineup(value) {
    this._lineup = value;

    if(value) {
      this.populatePlayersMap();
    }
  }

  public get lineup() {
    return this._lineup;
  }

  constructor() { }

  ngOnInit() {
  }

  public populatePlayersMap() {
    this.startingPlayers.clear();

    this.lineup.startingPlayers.forEach(player => {
      if(!this.startingPlayers.has(player.type)) {
        this.startingPlayers.set(player.type, []);
      }

      this.startingPlayers.get(player.type).push(player);
    });

    this.startingPlayersKeys = this.startingPlayers.keys()
  }

  public get formation() {
    if(!this.lineup || !this.lineup.formation) {
      return '-';
    }

    return this.lineup.formation.replace(/_/g, '-').replace('F-', '');
  }
}

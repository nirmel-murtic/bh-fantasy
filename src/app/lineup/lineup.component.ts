import {Component, Input, OnInit} from '@angular/core';
import {Lineup} from '../shared/models/lineup';
import {Player, PlayerPosition, PlayerType} from '../shared/models/player';

declare var $: any;

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent implements OnInit {

  _lineup: Lineup;

  public startingPlayers: Array<Player[]> = [[], [], [], [], [], []];

  public playerTypeClasses = [];

  @Input()
  public set lineup(value) {
    this._lineup = value;

    if(value) {
      this.populatePlayers();

      setTimeout(() => {
        $('[data-toggle="popover"]').popover();
      });
    }
  }

  public get lineup() {
    return this._lineup;
  }

  constructor() { }

  ngOnInit() {
  }

  public populatePlayers() {
    const getSortCoeficient = (p: Player): number => {
      if(p.position == PlayerPosition.CF) {
        return 0;
      } else if(p.position == PlayerPosition.SS) {
        return 1;
      } else if(p.position == PlayerPosition.LW) {
        return 2;
      } else if(p.position == PlayerPosition.RW) {
        return 4;
      } else if(p.type == PlayerType.STRIKER) {
        return 3;
      } else if(p.position == PlayerPosition.AM) {
        return 5;
      } else if(p.position == PlayerPosition.DM) {
        return 9;
      } else if(p.position == PlayerPosition.LM) {
        return 6;
      } else if(p.position == PlayerPosition.RM) {
        return 8;
      } else if(p.type == PlayerType.MIDDLE) {
        return 7;
      } else if(p.position == PlayerPosition.LB) {
        return 10;
      } else if(p.position == PlayerPosition.RB) {
        return 12;
      } else if(p.type == PlayerType.DEFENDER) {
        return 11;
      } else if(p.type == PlayerType.GOALKEEPER || p.type == 'Goalkeaper') {
        return 13;
      }
    };


    this.startingPlayers = [[], [], [], [], [], []];

    const sorted = this.lineup.startingPlayers.sort((p1, p2) => getSortCoeficient(p2) - getSortCoeficient(p1));

    console.log(sorted);

    let formationParts = this.lineupFormation.split("-").filter(
      value => value.length > 0).map(value => parseInt(value));

    if(formationParts.length > 0) {
      formationParts.unshift(1);

      let counter = 0;

      for(let i = 0; i < formationParts.length; i++) {
        for(let j = 0; j < formationParts[i]; j++) {
          this.startingPlayers[i].push(sorted[counter]);

          counter++;
        }
      }
    } else {
      const defensiveMiddle = [];
      const attackingMiddle = [];

      sorted.forEach(player => {
        switch (player.type) {
          case 'Goalkeaper':
          case PlayerType.GOALKEEPER:
            this.startingPlayers[0].push(player);
            break;
          case PlayerType.DEFENDER:
            this.startingPlayers[1].push(player);
            break;
          case PlayerType.MIDDLE:
            if(player.position == PlayerPosition.DM) {
              defensiveMiddle.push(player);
            } else if(player.position == PlayerPosition.AM) {
              attackingMiddle.push(player);
            } else {
              this.startingPlayers[2].push(player);
            }
            break;
          case PlayerType.STRIKER:
            this.startingPlayers[3].push(player);
        }
      });

      if(defensiveMiddle.length > 0) {
        this.startingPlayers.splice(2, 0, defensiveMiddle);
      }

      if(attackingMiddle.length > 0) {
        this.startingPlayers.splice(this.startingPlayers.length - 3, 0, attackingMiddle);
      }
    }

    this.startingPlayers = this.startingPlayers.filter(value => value.length > 0);

    if(this.startingPlayers.length < 5) {
      this.startingPlayers.splice(2, 0, []);
      this.startingPlayers.splice(4, 0, []);
    }
  }

  public get lineupFormation() {
    if(!this.lineup || !this.lineup.formation) {
      return '-';
    }

    return this.lineup.formation.replace(/_/g, '-').replace('F-', '');
  }

  public get formation() {
    if(!this.lineup || !this.lineup.formation) {
      return this.calculateFormation(this.startingPlayers) + ' (unconfirmed)';
    }

    return this.lineup.formation.replace(/_/g, '-').replace('F-', '');
  }

  public calculateFormation(playerLines: Player[][]) : string{
    let formation = '';

    for(let i = 1; i < playerLines.length; i++) {
      formation += playerLines[i].length;

      if(i < playerLines.length - 1) {
        formation += '-';
      }
    }

    return formation;
  }

  public getPlayerInfo(player: Player) {
    return `
        <div class="player-info">
          <div class="row mb-2">
             <div class="col-12">
              ${player.fullName}
             </div>
          </div>
          <div class="row">
             <div class="profile-image">
              <img src="${player.profilePicture}" class="img-fluid image rounded-circle">
             </div>
             <div class="info">
                <div>Date of birth: <span>${player.birthDate}</span></div>
                <div>Position: <span>${player.positionName}</span></div>
                <div>Market value: <span>${player.marketValueRaw}</span></div>
              </div>
          </div>
        </div>
    `
  }
}


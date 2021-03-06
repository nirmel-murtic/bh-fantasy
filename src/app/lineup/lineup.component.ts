import {Component, Input, OnInit} from '@angular/core';
import {Lineup} from '../shared/models/lineup';
import {Player, PlayerEvent, PlayerPosition, PlayerType} from '../shared/models/player';
import {CardType} from '../shared/models/card';
import {detectTouch} from "../shared/utils/utils";

declare var $: any;

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent implements OnInit {

  _lineup: Lineup;

  @Input()
  public playerEvents: Map<number, PlayerEvent[]>;

  public startingPlayers: Array<Player[]> = [[], [], [], [], [], []];

  public CardType = CardType;

  public touch = false;

  @Input()
  public set lineup(value) {
    this._lineup = value;

    if(value) {
      this.populatePlayers();
    }
  }

  public get lineup() {
    return this._lineup;
  }

  constructor() { }

  ngOnInit() {
    this.touch = detectTouch();
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

    let formationParts = this.lineupFormation.split("-").filter(
      value => value.length > 0).map(value => parseInt(value));

    if(formationParts.length > 0) {
      formationParts.unshift(1);

      let counter = 0;

      for(let i = 0; i < formationParts.length; i++) {
        for(let j = 0; j < formationParts[i]; j++) {
          if(sorted[counter]) {
            this.startingPlayers[i].push(sorted[counter]);
          }

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

  public getEventClass(event: PlayerEvent, player: Player) {
    if(event.eventType === 'goal') {
      if(event.player.id === player.id && event.ownGoal) {
        return "icon-own-goal";
      } else if(event.player.id === player.id && event.penalty) {
        return "icon-penalty";
      } else if(event.player.id === player.id) {
        return "icon-goal";
      } else if(event.assist && event.assist.id === player.id && !event.ownAssist && !event.penalty) {
        return "icon-assist";
      } else if(event.assist && event.assist.id === player.id && event.ownAssist && event.penalty) {
        return "icon-own-assist";
      }
    } else if(event.eventType === 'card') {
      if(event.cardType === CardType.RED) {
        return "icon-red-card";
      } else if(event.cardType === CardType.YELLOW) {
        return "icon-yellow-card";
      }
    } else if(event.eventType === 'capiten') {
      return "icon-capiten";
    } else if(event.eventType === 'change') {
      if(event.substitutePlayer && event.substitutePlayer.id == player.id) {
        return "icon-change-out";
      } else if(event.player && event.player.id == player.id) {
        return "icon-change-in";
      }
    } else if(event.eventType === 'missed-penalty') {
      return 'icon-penalty-missed';
    }
  }
}


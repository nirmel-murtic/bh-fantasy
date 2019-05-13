import {Id} from './id';
import {Player, PlayerEvent} from './player';

export interface Card extends Id, PlayerEvent {
  cardType: CardType;
  player: Player;
  minute: number;
}

export enum CardType {
  YELLOW = 'YELLOW',
  RED = 'RED'
}

import {Id} from './id';
import {Team} from "./team";

export interface Player extends Id {
  firstName: string;
  lastName: string;
  fullName: string;
  numberoOnDress: number;
  marketValueRaw: string;
  profilePicture: string;
  birthDate: Date;
  yearsCount: number;
  position: PlayerPosition;
  positionName: string;
  type: string;
  teams: Team[];
}

export enum PlayerType {
  GOALKEEPER = 'Goalkeeper',
  DEFENDER = 'Defender',
  STRIKER = 'Striker',
  MIDDLE = 'Middle'
}

export enum PlayerCoefficients {
  GOALKEEPER = 1,
  DEFENDER = 2,
  MIDDLE = 3,
  STRIKER = 4
}

export interface PlayerEvent {
  eventType: string;
  [key: string]: any;
}

export enum PlayerPosition {
  SS = 'SS',
  CF = 'CF',
  CM = 'CM',
  CB = 'CB',
  RB = 'RB',
  LB = 'LB',
  GK = 'GK',
  RM = 'RM',
  LM = 'LM',
  AM = 'AM',
  DM = 'DM',
  LW = 'LW',
  RW = 'RW'
}

import {Id} from './id';

export interface Player extends Id {
  firstName: string;
  lastName: string;
  fullName: string;
  numberoOnDress: number;
  marketValueRaw: string;
  profilePicture: string;
  birthDate: Date;
  position: PlayerPosition;
  positionName: string;
  type: string;
}

export enum PlayerType {
  GOALKEEPER = 'Goalkeeper',
  DEFENDER = 'Defender',
  STRIKER = 'Striker',
  MIDDLE = 'Middle'
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

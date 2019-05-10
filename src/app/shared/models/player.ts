import {Id} from './id';

export interface Player extends Id {
  firstName: string;
  lastName: string;
  fullName: string;
  numberoOnDress: number;
  marketValueRaw: string;
  profilePicture: string;
  birthDate: Date;
  position: string;
  positionName: string;
  type: string;
}

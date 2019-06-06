import {Id} from './id';
import {Team} from "./team";

export interface User extends Id {
  fullName: string;
  email: string;
  principalId: string;
  photo: string;
  created: Date;
  lastLogin: Date;
  loginType: LoginType;
  admin: boolean;
  teams: Team[];
}

export enum LoginType {
  GOOGLE = 'GOOGLE',
  FB = 'FB'
}


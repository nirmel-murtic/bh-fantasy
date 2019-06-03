import {Id} from './id';

export interface User extends Id {
  fullName: string;
  email: string;
  principalId: string;
  photo: string;
  created: Date;
  lastLogin: Date;
  loginType: LoginType;
  admin: boolean;
}

export enum LoginType {
  GOOGLE = 'GOOGLE',
  FB = 'FB'
}


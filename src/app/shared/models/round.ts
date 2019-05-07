import {Id} from './id';
import {Match} from './match';

export interface Round extends Id {
  name: string;
  matches: Match[];
}

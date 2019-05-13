import {Id} from './id';
import {Player} from './player';
import {Substitution} from './substitution';

export interface Lineup extends Id {
  formation: string;
  startingPlayers: Player[];
  availableSubstitutions: Player[];
  substitutionChanges: Substitution[];
  capiten: Player;
  viceCapiten: Player;
}

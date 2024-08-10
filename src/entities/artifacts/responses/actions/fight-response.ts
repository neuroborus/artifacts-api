import { ActionResponse } from './action-response';
import { Fight } from '../../fight';
import { Character } from '../../character';

export interface FightResponse extends ActionResponse {
  fight: Fight;
  character: Character;
}

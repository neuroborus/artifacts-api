import { ActionResponse } from './action-response';
import { Destination } from '../../destination';
import { Character } from '../../character';

export interface MoveResponse extends ActionResponse {
  destination: Destination;
  character: Character;
}

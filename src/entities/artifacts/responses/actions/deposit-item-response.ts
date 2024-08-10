import { ActionResponse } from './action-response';
import { Item } from '../../item';
import { BankItem } from '../../bank-item';
import { Character } from '../../character';

export interface DepositItemResponse extends ActionResponse {
  item: Item;
  bank: BankItem[];
  character: Character;
}

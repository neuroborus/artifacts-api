import { Craft } from './craft';
import { Effect } from './effect';

export interface Item {
  name: string;
  code: string;
  level: number;
  type: string;
  subtype: string;
  description: string;
  effects: Effect[];
  craft: Craft;
}

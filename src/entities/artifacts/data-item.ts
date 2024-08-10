import { Effect } from './effect';
import { Craft } from './craft';

export interface DataItem {
  name: string;
  code: string;
  level: number;
  type: string;
  subtype: string;
  description: string;
  effects: Effect[];
  craft: Craft;
}

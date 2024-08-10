import { CraftItem } from './craft-item';

export interface Craft {
  skill: string;
  level: number;
  items: CraftItem[];
  quantity: number;
}

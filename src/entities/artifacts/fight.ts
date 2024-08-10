import { Drop } from './drop';
import { BlockedHits } from './blocked-hits';

export interface Fight {
  xp: number;
  gold: number;
  drops: Drop[];
  turns: number;
  monster_blocked_hits: BlockedHits;
  player_blocked_hits: BlockedHits;
  logs: string[];
  result: string;
}

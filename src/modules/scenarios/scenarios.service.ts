import { Injectable, Logger } from '@nestjs/common';
import { CharactersService } from '@/services/characters';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ScenariosService {
  private readonly logger = new Logger(ScenariosService.name);
  private readonly prefixes: Record<string, string> = {};
  private readonly characterNames: string[] = [];
  constructor(
    private readonly characters: CharactersService,
    private readonly config: ConfigService,
  ) {
    this.prefixes = this.config.getOrThrow('account.prefixes');
    this.characterNames = this.config.getOrThrow('account.characters');
  }

  async bankAllItemsForAll(): Promise<void> {
    const promises: Promise<void>[] = [];
    for (const character of this.characterNames) {
      promises.push(this.bankAllItems(character));
    }
    await Promise.allSettled(promises);
  }

  async bankAllItems(character: string): Promise<void> {
    const characterData = await this.characters.characterData(character);
    if (!characterData) {
      throw new Error('characterData does not exist');
    }

    for (const inventoryItem of characterData.inventory) {
      if (!inventoryItem.quantity) continue;
      await this.characters.depositItem(
        character,
        inventoryItem.code,
        inventoryItem.quantity,
      );
    }

    this.logger.log(`${this.prefixes[character]}All items banked!`);
  }
}

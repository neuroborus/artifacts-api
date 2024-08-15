import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ActionsCalls } from '@/calls/actions';
import { DataCalls } from '@/calls/data';
import { ActionsProcessor } from '@/processors/actions-processors';
import { DataProcessor } from '@/processors/data-processors';
import { CharactersService } from './characters.service';
import * as Queue from 'bee-queue';

export const CharactersProvider: Provider<CharactersService> = {
  provide: CharactersService,
  async useFactory(
    ActionsProcessor,
    DataProcessor,
    config: ConfigService,
    ActionCalls,
    DataCalls,
    ConfigService,
  ): Promise<CharactersService> {
    const characters = config.getOrThrow<string[]>('account.characters');
    const queues = characters.reduce((acc, ch) => {
      const i = Object.keys(acc).length;
      const settings = config.getOrThrow('queue.characterQueueDefaults');
      settings.name = ch;
      settings.settings.prefix = `${ch}`;
      settings.settings.redis.db += i;
      return {
        ...acc,
        [ch]: new Queue(ch, settings),
      };
    }, {} as Record<string, Queue>);

    return new CharactersService(
      queues,
      ActionsProcessor,
      DataProcessor,
      ActionCalls,
      DataCalls,
      ConfigService,
    );
  },
  inject: [
    ActionsProcessor,
    DataProcessor,
    ConfigService,
    ActionsCalls,
    DataCalls,
    ConfigService,
  ],
};

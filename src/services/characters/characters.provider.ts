import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ActionsCalls } from '@/calls/actions';
import { DataCalls } from '@/calls/data';
import { ActionsProcessor } from '@/processors/actions-processors';
import { DataProcessor } from '@/processors/data-processors';
import { TasksQueueService } from 'tasks-mad-queue';
import { CharactersService } from './characters.service';

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
      return {
        ...acc,
        [ch]: new TasksQueueService({
          delayMS: 0,
          label: ch,
          logger: new Logger(`${ch}Queue`),
        }),
      };
    }, {} as Record<string, TasksQueueService>);

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

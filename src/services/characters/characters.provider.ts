import { Provider } from '@nestjs/common';
import { ActionsProcessor } from '@/processors/actions-processors';
import { DataProcessor } from '@/processors/data-processors';
import { TasksQueueService } from 'tasks-mad-queue';
import { CHARACTERS } from '@/config';
import { CharactersService } from './characters.service';

export const CharactersProvider: Provider<CharactersService> = {
  provide: CharactersService,
  async useFactory(
    ActionsProcessor,
    DataProcessor,
  ): Promise<CharactersService> {
    const queues = CHARACTERS.reduce((acc, ch) => {
      return {
        ...acc,
        [ch]: new TasksQueueService({
          delayMS: 0,
          label: ch,
          logger: console,
        }),
      };
    }, {} as Record<string, TasksQueueService>);

    return new CharactersService(queues, ActionsProcessor, DataProcessor);
  },
  inject: [ActionsProcessor, DataProcessor],
};

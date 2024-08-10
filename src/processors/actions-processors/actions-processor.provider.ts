import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TasksQueueService } from 'tasks-mad-queue';
import { ActionsProcessor } from './actions-processor';

export const ActionsProcessorProvider: Provider<ActionsProcessor> = {
  provide: ActionsProcessor,
  async useFactory(config: ConfigService): Promise<ActionsProcessor> {
    const defaults = config.getOrThrow('processors.actionsQueueDefaults');
    return new ActionsProcessor(
      new TasksQueueService({
        ...defaults,
        logger: new Logger(defaults.label),
      }),
    );
  },
  inject: [ConfigService],
};

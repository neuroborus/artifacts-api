import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Queue from 'bee-queue';
import { ActionsProcessor } from './actions-processor';

export const ActionsProcessorProvider: Provider<ActionsProcessor> = {
  provide: ActionsProcessor,
  async useFactory(config: ConfigService): Promise<ActionsProcessor> {
    const defaults = config.getOrThrow('queue.actionsQueueDefaults');
    const queue = new Queue(defaults.name, defaults.settings);
    return new ActionsProcessor(queue, defaults.delay);
  },
  inject: [ConfigService],
};

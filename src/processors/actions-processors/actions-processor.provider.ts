import { Provider } from '@nestjs/common';
import { TasksQueueService } from 'tasks-mad-queue';
import { ACTIONS_QUEUE_DEFAULTS } from '@/config';
import { ActionsProcessor } from './actions-processor';

export const ActionsProcessorProvider: Provider<ActionsProcessor> = {
  provide: ActionsProcessor,
  async useFactory(): Promise<ActionsProcessor> {
    return new ActionsProcessor(new TasksQueueService(ACTIONS_QUEUE_DEFAULTS));
  },
};

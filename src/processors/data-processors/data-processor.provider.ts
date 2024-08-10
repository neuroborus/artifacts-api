import { Provider } from '@nestjs/common';
import { TasksQueueService } from 'tasks-mad-queue';
import { DATA_QUEUE_DEFAULTS } from '@/config';
import { DataProcessor } from './data-processor';

export const DataProcessorProvider: Provider<DataProcessor> = {
  provide: DataProcessor,
  async useFactory(): Promise<DataProcessor> {
    return new DataProcessor(new TasksQueueService(DATA_QUEUE_DEFAULTS));
  },
};

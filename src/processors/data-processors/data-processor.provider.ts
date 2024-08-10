import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TasksQueueService } from 'tasks-mad-queue';
import { DataProcessor } from './data-processor';

export const DataProcessorProvider: Provider<DataProcessor> = {
  provide: DataProcessor,
  async useFactory(config: ConfigService): Promise<DataProcessor> {
    const defaults = config.getOrThrow('processors.dataQueueDefaults');
    return new DataProcessor(
      new TasksQueueService({
        ...defaults,
        logger: new Logger(defaults.label),
      }),
    );
  },
  inject: [ConfigService],
};

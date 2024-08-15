import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Queue from 'bee-queue';
import { DataProcessor } from './data-processor';

export const DataProcessorProvider: Provider<DataProcessor> = {
  provide: DataProcessor,
  async useFactory(config: ConfigService): Promise<DataProcessor> {
    const defaults = config.getOrThrow('queue.dataQueueDefaults');
    const queue = new Queue(defaults.name, defaults.settings);
    return new DataProcessor(queue, defaults.delay);
  },
  inject: [ConfigService],
};

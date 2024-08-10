import { Module } from '@nestjs/common';
import { DataProcessor } from './data-processor';
import { DataProcessorProvider } from './data-processor.provider';

@Module({
  providers: [DataProcessorProvider],
  exports: [DataProcessor],
})
export class DataProcessorModule {}

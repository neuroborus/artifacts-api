import { Module } from '@nestjs/common';
import { ActionsProcessor } from './actions-processor';
import { ActionsProcessorProvider } from './actions-processor.provider';

@Module({
  providers: [ActionsProcessorProvider],
  exports: [ActionsProcessor],
})
export class ActionsProcessorModule {}

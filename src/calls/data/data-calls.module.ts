import { Module } from '@nestjs/common';
import { DataCalls } from './data-calls';

@Module({
  providers: [DataCalls],
  exports: [DataCalls],
})
export class DataCallsModule {}

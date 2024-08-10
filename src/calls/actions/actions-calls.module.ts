import { Module } from '@nestjs/common';
import { ActionsCalls } from './actions-calls';

@Module({
  providers: [ActionsCalls],
  exports: [ActionsCalls],
})
export class ActionsCallsModule {}

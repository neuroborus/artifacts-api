import { Module } from '@nestjs/common';
import { ActionsCallsModule } from '@/calls/actions';
import { DataCallsModule } from '@/calls/data';
import { ActionsProcessorModule } from '@/processors/actions-processors';
import { DataProcessorModule } from '@/processors/data-processors';
import { CharactersService } from './characters.service';
import { CharactersProvider } from './characters.provider';

@Module({
  imports: [
    ActionsProcessorModule,
    DataProcessorModule,
    ActionsCallsModule,
    DataCallsModule,
  ],
  providers: [CharactersProvider],
  exports: [CharactersService],
})
export class CharactersModule {}

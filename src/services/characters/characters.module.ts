import { Module } from '@nestjs/common';
import { ActionsProcessorModule } from '@/processors/actions-processors';
import { DataProcessorModule } from '@/processors/data-processors';
import { CharactersService } from './characters.service';
import { CharactersProvider } from './characters.provider';

@Module({
  imports: [ActionsProcessorModule, DataProcessorModule],
  providers: [CharactersProvider],
  exports: [CharactersService],
})
export class CharactersModule {}

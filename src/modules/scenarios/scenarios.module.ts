import { Module } from '@nestjs/common';
import { CharactersModule } from '@/services/characters';
import { ScenariosService } from './scenarios.service';

@Module({
  imports: [CharactersModule],
  providers: [ScenariosService],
  exports: [ScenariosService],
})
export class ScenariosModule {}

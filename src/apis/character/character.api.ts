import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharactersModule } from '@/services/characters';

@Module({
  imports: [CharactersModule],
  controllers: [CharacterController],
})
export class CharacterApi {}

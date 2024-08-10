import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Character } from '@/entities/artifacts';
import { CharactersService } from '@/services/characters';
import { CharacterPipe } from '../character-pipe';

@Controller('/character')
@ApiTags('character')
export class CharacterController {
  constructor(private readonly service: CharactersService) {}

  @Get('/:character/data')
  getData(
    @Param('character', CharacterPipe) character: string,
  ): Promise<Character | null> {
    return this.service.characterData(character);
  }
}

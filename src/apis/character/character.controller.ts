import { Body, Controller, Get, Header, Headers, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CharactersService } from '@/services/characters';
import { CharacterPipe } from './character-pipe';

@Controller('/character')
@ApiTags('character', 'actions')
export class CharacterController {
  constructor(private readonly service: CharactersService) {}

  @Get('/:character/data')
  async getData(
    @Param('character'/*, CharacterPipe*/) character: string,
  ): Promise<any> {
    return this.service.characterData(character);
  }
}

import { Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScenariosService } from '@/modules/scenarios';
import { ScenariosPipe } from './scenarios-pipe';

@Controller('/scenarios')
@ApiTags('scenarios')
export class ScenariosController {
  constructor(private readonly service: ScenariosService) {}

  @Post('/:character/bank-all-items')
  bankAllItems(
    @Param('character', ScenariosPipe) character: string,
  ): Promise<void> {
    return this.service.bankAllItems(character);
  }

  @Post('/bank-all-items')
  bankAllItemsForAll(): Promise<void> {
    return this.service.bankAllItemsForAll();
  }
}

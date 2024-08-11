import {
  Body,
  Controller,
  Param,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScenariosService } from '@/modules/scenarios';
import { ScenariosPipe } from './scenarios-pipe';
import { PositionDto } from '../position.dto';

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

  @Post('/move-all')
  @SerializeOptions({ type: PositionDto })
  moveForAll(@Body() request: PositionDto): Promise<void> {
    return this.service.moveForAll(request.posX, request.posY);
  }
}

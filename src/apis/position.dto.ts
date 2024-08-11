import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';
import { IPosition } from './i-position';

@Exclude()
export class PositionDto implements IPosition {
  @Expose()
  @Max(11)
  @Min(-5)
  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty({ type: Number })
  posX: number;

  @Expose()
  @Max(15)
  @Min(-5)
  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty({ type: Number })
  posY: number;
}

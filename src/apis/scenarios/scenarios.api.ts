import { Module } from '@nestjs/common';
import { ScenariosController } from './scenarios.controller';
import { ScenariosModule } from '@/modules/scenarios';

@Module({
  imports: [ScenariosModule],
  controllers: [ScenariosController],
})
export class ScenariosApi {}

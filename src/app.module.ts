import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { CharacterApi } from '@/apis/character';
import { ScenariosApi } from '@/apis/scenarios';
import { WinstonOptions } from '@/winston';
import { configuration } from '@/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    WinstonModule.forRoot(WinstonOptions),

    CharacterApi,
    ScenariosApi,
  ],
})
export class AppModule {}

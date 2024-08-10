import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { CharacterApi } from '@/apis/character';
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
  ],
})
export class AppModule {}

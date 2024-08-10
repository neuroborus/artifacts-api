import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CharacterApi } from '@/apis/character';

@Module({
  imports: [ConfigModule.forRoot(), CharacterApi],
})
export class AppModule {}

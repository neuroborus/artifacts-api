import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CharacterPipe implements PipeTransform<string> {
  private readonly characters: string[];

  constructor(private readonly configService: ConfigService) {
    this.characters =
      this.configService.getOrThrow<string[]>('account.characters');
  }
  transform(character: string, metadata: ArgumentMetadata) {
    if (this.characters.includes(character)) {
      return character;
    }

    throw new BadRequestException('Unknown or invalid character name.');
  }
}

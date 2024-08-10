import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CHARACTERS } from '@/config';

@Injectable()
export class CharacterPipe implements PipeTransform<string> {
  transform(character: string, metadata: ArgumentMetadata) {
    console.log(JSON.stringify(CHARACTERS));
    console.log(character);
    if (CHARACTERS.includes(character)) {
      return character;
    }

    throw new BadRequestException('Unknown or invalid character name.');
  }
}

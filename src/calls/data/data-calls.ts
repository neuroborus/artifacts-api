import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetCharacterResponse } from '@/entities/artifacts';

@Injectable()
export class DataCalls {
  constructor(private readonly config: ConfigService) {}

  public async character(
    character: string,
  ): Promise<GetCharacterResponse | null> {
    const url =
      this.config.getOrThrow('requests.server') + '/characters/' + character;
    const options = {
      method: 'GET',
    };

    try {
      const response = await fetch(url, options);
      const { data } = await response.json();
      return data as GetCharacterResponse;
    } catch (error) {
      console.error(
        this.config.getOrThrow('account.prefixes')[character] +
          'getting character ->' +
          error,
      );
    }
    return null;
  }
}

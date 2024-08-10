import { GetCharacterResponse } from '@/entities/artifacts';
import { PREFIXES, SERVER } from '@/config';

export async function character(
  character: string,
): Promise<GetCharacterResponse | null> {
  const url = SERVER + '/characters/';
  const options = {
    method: 'GET',
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    return data as GetCharacterResponse;
  } catch (error) {
    console.error(PREFIXES[character] + 'getting character ->' + error);
  }
  return null;
}

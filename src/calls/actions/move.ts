import { HEADERS, SERVER, PREFIXES } from '@/config';
import { MoveResponse } from '@/entities/artifacts';

export async function move(
  character: string,
  posX: number,
  posY: number,
): Promise<MoveResponse | null> {
  const url = SERVER + '/my/' + character + '/action/move';
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: `{"x":${posX},"y":${posY}}`,
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(PREFIXES[character] + `moved to [${posX}, ${posY}]`);
    return data as MoveResponse;
  } catch (error) {
    console.error(PREFIXES[character] + error);
  }
  return null;
}

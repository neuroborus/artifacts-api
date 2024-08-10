import { HEADERS, PREFIXES, SERVER } from '@/config';
import { FightResponse } from '@/entities/artifacts';

export async function fight(character: string): Promise<FightResponse | null> {
  const url = SERVER + '/my/' + character + '/action/fight';

  const fightResponse = await fetch(url, {
    method: 'POST',
    headers: HEADERS,
  });

  const prefix = PREFIXES[character];
  if (fightResponse.status === 498) {
    console.warn(prefix + 'The character cannot be found on your account.');
  } else if (fightResponse.status === 497) {
    console.log(prefix + "Your character's inventory is full.");
  } else if (fightResponse.status === 499) {
    console.warn(prefix + 'Your character is in cooldown.');
  } else if (fightResponse.status === 598) {
    console.warn(prefix + 'No monster on this map.');
  } else if (fightResponse.status !== 200) {
    console.error(prefix + 'An error occurred during the fight.');
  } else {
    const { data } = await fightResponse.json();
    console.log(
      prefix +
        'The fight ended successfully. You have ' +
        data.fight.result +
        '.',
    );
    return data as FightResponse;
  }
  return null;
}

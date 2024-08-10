import * as dotenv from 'dotenv';

import { ACTIONS_QUEUE_DEFAULTS } from './config-actions-processor';
import { DATA_QUEUE_DEFAULTS } from './config-data-processor';

dotenv.config();

export const configuration = () => {
  const port = 3000;

  const characters = process.env.CHARACTERS?.split(',') || [];
  const prefixes = characters.reduce(
    (acc: Record<string, string>, el: string) => {
      acc[el] = `[${el}]${' '.repeat(10 - el.length)}`;
      return acc;
    },
    {},
  );

  const server = 'https://api.artifactsmmo.com';
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + process.env.BEARER,
  };
  return {
    port,
    account: {
      characters,
      prefixes,
    },
    requests: {
      server,
      headers,
    },
    processors: {
      actionsQueueDefaults: ACTIONS_QUEUE_DEFAULTS,
      dataQueueDefaults: DATA_QUEUE_DEFAULTS,
    },
  };
};

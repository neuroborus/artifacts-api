import { BEARER } from './config-account';

export const SERVER = 'https://api.artifactsmmo.com';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: 'Bearer ' + BEARER,
};

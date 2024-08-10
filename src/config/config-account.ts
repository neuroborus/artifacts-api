import * as process from 'node:process';

export const BEARER = process.env.BEARER || '';
export const CHARACTERS = process.env.CHARACTERS
  ? process.env.CHARACTERS.split(',')
  : [];
export const PREFIXES: Record<string, string> = CHARACTERS.reduce(
  (acc: Record<string, string>, el: string) => {
    acc = {
      ...acc,
      [el]: `[${el}]${(() => {
        let suffix = '';
        for (let i = el.length; i < 10; ++i) {
          suffix += ' ';
        }
        return suffix;
      })()}`,
    };
    return acc;
  },
  {},
);

console.debug(JSON.stringify(process.env.CHARACTERS));
console.debug(JSON.stringify(CHARACTERS));

import chalk from 'chalk';

/**
 * Colorize string sentences
 *
 * @param {string} sentence string to colorize
 * @returns {string}
 */
export function colorize(sentence: string): string {
  const colors: string[] = [
    'red',
    'green',
    'redBright',
    'yellow',
    'blue',
    'greenBright',
    'magenta',
    'cyan',
    'yellowBright',
    'white',
    'blueBright',
    'magentaBright',
    'cyanBright',
    'whiteBright',
  ];

  const parts: string[] = sentence.split(/(\s+)/);

  return parts
    .map((part: string) => {
      if (/\S/.test(part)) {
        return chalk[colors[Math.floor(Math.random() * colors.length)]](part);
      }

      return part;
    })
    .join('');
}

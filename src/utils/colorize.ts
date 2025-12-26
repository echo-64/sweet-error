import chalk from 'chalk';

/**
 * Randomly colors each word in a string using terminal color codes.
 * * The function splits the sentence into words and whitespace, then applies
 * a random color from a predefined list (using the `chalk` library) to
 * each non-whitespace segment.
 *
 * @param {string} sentence - The text to be colorized.
 * @returns {string} The string with embedded ANSI escape codes for coloring.
 */
export function colorize(
  /** The text to be colorized. */
  sentence: string
): string {
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

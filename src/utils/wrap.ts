/**
 * Controls how lines should wrap
 *
 * @param {string} text
 * @param {number} width
 * @returns {string}
 */
export function wrap(
  /** The string to wrap */
  text: string,
  /** Line width to break the words at */
  width: number = Math.min(Math.max(20, process.stdout.columns) || 80, 80)
): string {
  let result: string = '';
  let lineLength: number = 0;

  for (const word of text.split(' ')) {
    if (lineLength + word.length > width) {
      result += '\n' + word;
      lineLength = word.length;
    } else {
      if (lineLength > 0) {
        result += ' ';
        lineLength++;
      }
      result += word;
      lineLength += word.length;
    }
  }

  return result;
}

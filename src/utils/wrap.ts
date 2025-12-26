/**
 * Wraps a string into multiple lines based on a specified maximum width.
 * * This function splits the input text by spaces and rebuilds it line by line,
 * ensuring that no line exceeds the provided width unless a single word is
 * longer than the width itself.
 *
 * @param {string} text - The input text to be wrapped.
 * @param {number} [width] - The maximum character width per line.
 * @default "Math.min(Math.max(20, process.stdout.columns) || 80, 80)"
 * @returns {string} The wrapped text with newline characters inserted.
 * @example
 * const longText = "This is a very long sentence that needs to be wrapped.";
 * wrap(longText, 20);
 * // Output might look like:
 * // "This is a very long"
 * // "sentence that needs"
 * // "to be wrapped."
 */
export function wrap(
  /** The input text to be wrapped. */
  text: string,
  /** The maximum character width per line. */
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

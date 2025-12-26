/**
 * Adds a specified number of leading spaces to each line of a string.
 * * The function trims the input string first, then splits it into individual lines
 * and prepends the specified padding to each line.
 *
 * @param {string} string - The multi-line string to be indented.
 * @param {number} [padding=0] - The number of spaces to add to the start of each line.
 * @returns {string} The indented string.
 *
 * @example
 * const text = "Hello\nWorld";
 * indent(text, 2);
 * // Returns:
 * // "  Hello"
 * // "  World"
 */
export function indent(string: string, padding?: number): string {
  return string
    .trim()
    .split('\n')
    .map((line: string) => {
      return `${' '.repeat(padding || 0)}${line}`;
    })
    .join('\n');
}

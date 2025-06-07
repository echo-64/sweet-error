/**
 * Add string indentation
 *
 * @param {string} string
 * @param {number} padding indentation lavel
 * @returns {string}
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

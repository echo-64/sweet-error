import StackUtils from 'stack-utils';
import { StackData } from '../node_modules/@types/stack-utils';
import { colorize } from './utils/colorize';
import { format } from './utils/format';
import { indent } from './utils/indent';
import { wrap } from './utils/wrap';
import { logger } from './utils/logger';
import { LocationStyle, ErrorConfig } from './types';

class SweetError {
  /** An array of messages, each index represents a line */
  public messages: any[];

  /**
   * The instance name e.g., `SomeError`
   *
   * @default undefined
   * */
  public name?: string;

  /**
   * The instance code e.g., `SomeError.SomethingWrong`
   *
   * @default undefined
   * */
  public code?: string;

  /**
   * The exit code or signal name used when the Node process terminates.
   *
   * @default undefined
   * */
  public exitCode?: number | string;

  /**
   * Whether to automatically terminate the process after logging.
   *
   * @default true
   */
  public autoExit: boolean;

  /**
   * Determines how line and column information is displayed:
   * - `label`: For readable, human-friendly format.
   *   > `line: 3 column: 1 file: index.ts`
   * - `coords`: Clickable links for IDEs / Standard IDE format.
   *   > `file: index.ts:3:1`
   * - `full`: For most formal and complete format.
   *   > `line: 3 column: 1 file: index.ts:3:1`
   *
   * @default 'label'
   */
  public locationStyle: LocationStyle;

  /**
   * Enables or disables text colorization
   *
   * @default true
   * */
  public colorize: boolean;

  /**
   * The instance captured stack.
   *
   * @readonly
   * */
  readonly stack: StackData[];

  /**
   * A collection of string formatting and transformation utilities.
   *
   * @readonly
   * */
  readonly func: {
    /**
     * Applies random terminal colors to each word in a sentence.
     *
     * @param {string} sentence - The string to colorize.
     * @returns {string} The colorized string with ANSI codes.
     */
    colorize: (sentence: string) => string;

    /**
     * Serializes an object into a JSON5 formatted string.
     *
     * @param {any} object - The object to stringify.
     * @returns {string} The formatted JSON5 string.
     */
    format: (object: any) => string;

    /**
     * Prepends a specific number of spaces to every line in a string.
     *
     * @param {string} string - The multiline string to indent.
     * @param {number} padding - The number of spaces to add.
     * @returns {string}
     */
    indent: (string: string, padding: number) => string;

    /**
     * Breaks a long string into multiple lines based on character width.
     *
     * @param {string} text - The text to wrap.
     * @param {number} width - The maximum line length.
     * @returns {string}
     */
    wrap: (text: string, width: number) => string;
  };

  /**
   * Creates a new `SweetError` instance.
   */
  constructor(messages: any[], config?: ErrorConfig) {
    if (!Array.isArray(messages)) {
      throw new Error(
        `[SweetError.messages] must be of type 'array'
        Received argument of type: '${typeof messages}'`
      );
    }

    if (config?.logger && typeof config.logger !== 'function') {
      throw new Error(
        `[SweetError.config.logger] must be of type 'function'
        Received argument of type: '${typeof config.logger}'`
      );
    }

    const stackUtils = new StackUtils({ cwd: process.cwd() });

    this.messages = messages;
    this.name = config?.name;
    this.code = config?.code;
    this.exitCode = config?.exitCode;
    this.autoExit = config?.autoExit ?? true;
    this.colorize = config?.colorize ?? true;
    this.locationStyle = config?.locationStyle || 'label';
    this.func = { colorize, format, indent, wrap };
    this.stack = stackUtils
      .captureString()
      .split('\n')
      .filter((line: string) => line && typeof line === 'string')
      .map((line: string) => {
        const object: StackData = stackUtils.parseLine(line);

        if ('file' in object) {
          object['file'] = object['file'].replace('file://', '');
        }

        return object;
      });

    config?.logger ? config.logger.call(this) : logger.call(this);

    if (this.autoExit !== false) {
      this.exitCode ? process.exit(this.exitCode) : process.exit();
    }
  }
}

export default SweetError;
export { LocationStyle, ErrorConfig } from './types';

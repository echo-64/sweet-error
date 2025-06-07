import StackUtils from 'stack-utils';
import { colorize } from './utils/colorize';
import { format } from './utils/format';
import { indent } from './utils/indent';
import { wrap } from './utils/wrap';
import { logger } from './utils/logger';

const stackUtils = new StackUtils({ cwd: process.cwd() });

interface SweetErrorOptions {
  /** The instance name e.g `SomeError` */
  name?: string;
  /** The instance code e.g `SomeError.SomethingWrong` */
  code?: string;
  /** The code to exit the `node.js` process with */
  exitCode?: string | number;
  /** Enables or disables text colorization - (default is true) */
  colorize?: boolean;
  /** Controls how should `SweetError` output looks and organized */
  logger?: () => void;
};

/**
 * Initializ a new `SweetError` instance
 */
export class SweetError {
  /** An array of messages, each index represents a line */
  messages: any[];

  /** SweetError options object */
  options?: SweetErrorOptions;

  /** The instance name e.g `SomeError` */
  name?: string;

  /** The instance code e.g `SomeError.SomethingWrong` */
  code?: string;

  /** The number or string to exit the `node.js` process with */
  exitCode?: number | string;

  /** The instance captured stack */
  stack?: any[];

  /** SweetError utils */
  func: {
    /**
     * Colorize string sentences
     *
     * @param {string} sentence string to colorize
     * @returns {string}
     */
    colorize: (sentence: string) => string;

    /**
     * json5 stringifier
     *
     * @param {object} obj
     * @returns {string}
     */
    format: (object: any) => string;

    /**
     * Add string indentation
     *
     * @param {string} string
     * @param {number} padding indentation lavel
     * @returns {string}
     */
    indent: (string: string, padding: number) => string;

    /**
     * Controls how lines should wrap
     *
     * @param {string} text
     * @param {number} width
     * @returns {string}
     */
    wrap: (text: string, width: number) => string;
  };

  constructor(messages: any[], options?: SweetErrorOptions) {
    if (!Array.isArray(messages)) {
      throw new Error('SweetError.messages is not array');
    }

    this.messages = messages;

    if (Object.prototype.toString.call(options) === '[object Object]') {
      this.options = options;

      if (!('logger' in this.options)) {
        this.options.logger = logger;
      }

      if (!('colorize' in this.options)) {
        this.options.colorize = true;
      }

      Object.keys(options).forEach(opt => {
        if (options[opt] && opt != 'colorize' && opt != 'logger') {
          this[opt] = options[opt];
        }
      });
    } else {
      this.options = { logger, colorize: true };
    }

    this.stack = stackUtils
      .captureString()
      .split('\n')
      .map((line: string) => {
        return stackUtils.parseLine(line);
      });

    this.func = { colorize, format, indent, wrap };

    this.options.logger.call(this);

    return process.exit(this?.exitCode || 0);
  }
}

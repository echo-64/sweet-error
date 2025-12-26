import chalk from 'chalk';
import SweetError from '../SweetError';
import { colorize } from './colorize';
import { indent } from './indent';
import { wrap } from './wrap';
import { format } from './format';

/**
 * A customizable logging orchestrator that defines the visual structure and
 * sequence of the error output.
 * - This function is intended to be called with a {@link SweetError} context,
 * providing access to the error's data (messages, stack, code) and internal
 * formatting utilities.
 *
 * @example
 * ```js
 * // Customizing the output via the logger option
 * const customLogger = function () {
 *   const { messages, exitCode, func } = this;
 *   const { colorize, indent } = func;
 *   console.log(colorize('--- ERROR REPORT ---'));
 *   messages.forEach(msg => console.log(indent(msg, 4)));
 *   console.log('Exit Status:', exitCode);
 * };
 *
 * new SweetError(['Failed to connect'], { logger: customLogger });
 * ```
 */
export function logger(this: SweetError): void {
  logName(this);

  for (let i = 0; i < this.messages.length; i++) {
    const message = this.messages[i];
    const lastIndex = this.messages.length - 1;

    if (typeof message === 'string') {
      if (this?.name) {
        if (this.colorize === true) {
          console.log(colorize(indent(wrap(message), 2)));
        } else {
          console.log(indent(wrap(message), 2));
        }
      } else {
        if (this.colorize === true) {
          console.log(colorize(wrap(message)));
        } else {
          console.log(wrap(message));
        }
      }
    } else if (typeof message === 'object') {
      if (i != 0) {
        console.log('');
      }

      console.log(indent(format(message), 2));

      if (i != lastIndex) {
        console.log('');
      }
    } else {
      console.log('  ' + message);
    }
  }

  logStack(this);

  logCode(this);

  logExitCode(this);
}

/**
 * Logs the error name.
 *
 * @param {SweetError} error - The error object containing the name.
 */
function logName(error: SweetError): void {
  if (!error?.name) {
    return;
  }

  return console.log('🔴', chalk.red.bold.underline(error.name));
}

/**
 * Logs the error code.
 *
 * @param {SweetError} error - The error object containing the code.
 */
function logCode(error: SweetError): void {
  if (!error?.code) {
    return;
  }

  console.log('');

  return error?.colorize
    ? console.log(indent(chalk.gray.underline(`${error.code}`), 2))
    : console.log(indent(chalk.underline(`${error.code}`), 2));
}

/**
 * Logs the code used to exit the node.js process.
 *
 * @param {SweetError} error - The error object containing the exit code.
 */
function logExitCode(error: SweetError): void {
  if (typeof error?.exitCode === 'undefined') {
    return;
  }

  console.log('');

  error.colorize
    ? console.log('🟡', chalk.yellow('Exit code:'), error.exitCode)
    : console.log('🟡', 'Exit code:', error.exitCode);
}

/**
 * Logs the stack trace of an error, with options for different location styles.
 *
 * @param {SweetError} error - The error object containing the stack trace.
 */
function logStack(error: SweetError): void {
  error.stack.shift();

  console.log('');

  error.stack.forEach(stackObject => {
    const { line, column, file, ...rest } = stackObject;

    switch (error.locationStyle) {
      case 'label':
        console.log(
          indent(
            '→ ' +
              formatStackLine({
                line,
                column,
                file,
                ...rest,
              }),
            2
          )
        );
        break;
      case 'coords':
        console.log(
          indent(
            '→ ' +
              formatStackLine({
                file: `${stackObject['file']}:${line}:${column}`,
                ...rest,
              }),
            2
          )
        );
        break;
      case 'full':
        console.log(
          indent(
            '→ ' +
              formatStackLine({
                line,
                column,
                file: `${stackObject['file']}:${line}:${column}`,
                ...rest,
              }),
            2
          )
        );
        break;
      default:
        break;
    }
  });

  /**
   * Formats a property string from an object.
   *
   * This function takes an object and returns a formatted string that includes each key-value pair,
   * optionally colorizing the output based on a provided error configuration.
   *
   * @param {Object} stackLine - The object containing properties to format.
   * @returns {string} A formatted string representing the key-value pairs.
   */
  function formatStackLine(stackLine: any): string {
    return Object.keys(stackLine)
      .map(prop =>
        error?.colorize == true
          ? `${chalk.bold(prop)}: ${colorize(chalk.italic(stackLine[prop]))} `
          : `${chalk.bold(prop)}: ${chalk.italic(stackLine[prop])} `
      )
      .join('')
      .trim();
  }
}

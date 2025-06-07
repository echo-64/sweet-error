import chalk from 'chalk';
import { colorize } from './colorize';
import { indent } from './indent';
import { wrap } from './wrap';
import { format } from './format';
import { SweetError } from '../SweetError';

/**
 * The function that controls how the Error appears and how its parts are arranged
 *
 * @memberof SweetError
 * @example ```js
 * function logger() {
 *   // you have access to all the properties of the SweetError to customize the way it appears
 *   const { messages, name, code, stack, func } = this;
 *   // also some utils may be helpful
 *   const { format, indent, wrap } = func;
 * }
 *
 * const opts = { logger };
 *
 * new SweetError([], opts);
 * ```
 */
export function logger(): void {
  logName(this);

  for (let i = 0; i < this.messages.length; i++) {
    const message = this.messages[i];
    const lastIndex = this.messages.length - 1;

    if (typeof message === 'string') {
      if (this?.name) {
        if (this?.options?.colorize === true) {
          console.log(colorize(indent(wrap(message), 2)));
        } else {
          console.log(indent(wrap(message), 2));
        }
      } else {
        if (this?.options?.colorize === true) {
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

  console.log('');

  logStack(this);

  console.log('');

  logCode(this);

  if (this?.exitCode) {
    console.log('');

    this?.options?.colorize
      ? console.log('🟡', chalk.yellow('Exit:'), this.exitCode)
      : console.log('🟡', 'Exit:', this.exitCode);
  }
}

/**
 * Log the SweetError name
 *
 * @memberof logger
 * @param {SweetError} error
 */
function logName(error: SweetError): void {
  if (!error?.name) return;
  return console.log('🔴', chalk.red.bold.underline(error.name));
}

/**
 * Log the SweetError code
 * @memberof logger
 * @param {SweetError} error
 */
function logCode(error: SweetError): void {
  if (!error?.code) return;

  return error?.options?.colorize
    ? console.log(indent(chalk.gray.underline(`${error.code}`), 2))
    : console.log(indent(chalk.underline(`${error.code}`), 2))
}

/**
 * Log the SweetError stack trace lines
 * @memberof logger
 * @param {SweetError} error
 */
function logStack(error: SweetError): void {
  error.stack.shift();

  error.stack.forEach((object: any) => {
    if (!object) return;

    let stackLine = '';

    Object.keys(object).forEach((key: any) => {
      if (error?.options?.colorize === true) {
        stackLine += `${chalk.bold(key)}: ${colorize(
          chalk.italic(object[key])
        )} `;
      } else {
        stackLine += `${chalk.bold(key)}: ${chalk.italic(object[key])} `;
      }
    });

    return console.log(indent('→ ' + stackLine.trim(), 2));
  });
}

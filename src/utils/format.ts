import json5 from "json5";

/**
 * json5 stringifier
 *
 * @param {object} obj
 * @returns {string}
 */
export function format(object: any): string {
  return json5.stringify(object, null, 2);
}

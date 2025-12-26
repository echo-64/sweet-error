import SweetError from './SweetError';

export interface ErrorConfig {
  /**
   * The instance name e.g `SomeError`
   *
   * @default undefined
   * */
  name?: string;

  /**
   * The instance error code e.g `SomeError.SomethingWrong`
   *
   * @default undefined
   * */
  code?: string;

  /**
   * The exit code or signal name used when the Node process terminates.
   *
   * @default 0
   * */
  exitCode?: string | number;

  /**
   * Whether to automatically terminate the process after logging.
   *
   * @default true
   */
  autoExit?: boolean;

  /**
   * Enables or disables text colorization
   *
   * @default true
   * */
  colorize?: boolean;

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
  locationStyle?: LocationStyle;

  /** Controls how should `SweetError` output looks and organized */
  logger?: (this: SweetError) => void;
}

/**
 * Determines how line and column information is displayed:
 * - `label`: For readable, human-friendly format.
 *   > `line: 3 column: 1 file: index.ts`
 * - `coords`: Clickable links for IDEs / Standard IDE format.
 *   > `file: index.ts:3:1`
 * - `full`: For most formal and complete format.
 *   > `line: 3 column: 1 file: index.ts:3:1`
 */
export type LocationStyle = 'label' | 'coords' | 'full';

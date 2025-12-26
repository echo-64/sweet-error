# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-12-24

### Added

- New configuration option: `autoExit` to control process termination.
- New configuration option `locationStyle` for additional output formats.
- Exported shared types from `types.ts`

### Changed

- Improved JSDoc documentation.
- Refined console rendering to avoid unnecessary blank lines of missing optional properties.

### Removed

- Removed the `options` instance property.
- Removed the `logger` instance property.
- Renamed `SweetErrorOptions` to `Config`.
- Removed named export `SweetError`, the package now uses a default export.

### Migration Notes

- The `error.options` property has been removed.
  Replace any usage of `error.options` with the corresponding instance properties
  (e.g. `error.autoExit`, `error.locationStyle`, `error.colorize`).

- The `logger` function is no longer exposed as an instance property.
  Custom logging logic must be provided through the configuration object at initialization.

- Update TypeScript imports from `SweetErrorOptions` to `ErrorConfig`

- Update imports to use the default export instead of a named export.

## [1.0.1] - 2025-06-7

### Added

- Initial release of `sweet-error`

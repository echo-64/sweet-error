import pkg from './package.json' with { type: 'json' };
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';

const tsconfig = {
  sourceMap: true,
  tsconfig: './tsconfig.json',
};

const external = ['json5', 'chalk', 'stack-utils'];

export default [
  {
    input: './src/SweetError.ts',
    external,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        strict: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [typescript(tsconfig), nodeResolve()],
  },
];

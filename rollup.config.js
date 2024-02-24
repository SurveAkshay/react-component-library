import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,// since we are adding line we need to make change into package.json to the main keyword's value "dist/cjs/index.js"
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,// since we are adding line we need to add module keyword into package.json with value "dist/esm/index.js"
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.ts'] }),
      postcss({ extensions: ['.css'], inject: true, extract: false }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
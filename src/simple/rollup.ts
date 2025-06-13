import { dataStore } from '../data-store/index';
import { writeFileSync } from 'node:fs';

/**
 *  生成 rollup 打包工具的配置文件信息
 */
export function rollup(): void {
  const { dependencies: de } = dataStore.local;
  const ts = de.includes('typescript');

  writeFileSync(
    dataStore.pkgFile('rollup.config.js'),
    `${ts ? "import typescript from '@rollup/plugin-typescript'" : ''};
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import { external } from '@qqi/rollup-external';

export default {
  input: './index.${ts ? 'ts' : 'js'}',
  output: ${
    dataStore.bin !== 1
      ? `[
    {
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/',
    },
    {
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/',
    },
  ],`
      : `{
       format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: false,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/',
   },`
  }
  // 配置需要排除或包含的包
  external: external(),
  plugins: [
    resolve(),
    commonjs(),
    json(),${ts ? 'typescript(),' : ''}
    cleanup(),
    copy({
      targets: [
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
  ],
};`,
  );
}

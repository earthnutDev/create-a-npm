import { writeFileSync } from 'node:fs';
import data from 'src/data';

/**
 *  生成 rollup 打包工具的配置文件信息
 */
export function rollup(): void {
  rollupJs();
  rollupConfigTestJs();
}

/** 导出生成 rollup.config.js 文件  */
export function rollupJs(): void {
  writeFileSync(
    data.fileName('rollup.config.js'),
    `import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
// import terser from '@rollup/plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';

export default {
  input: './index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/mjs',
    },
    //  若是生成 \`bin\` 类型，或是生成的文件不包含 commonJs，下面导出 commonJs 的配置可是删除
    {
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/cjs',
    },
  ],
  // 配置需要排除的包
  external: id =>
    /^(node:)|^(tslib)|^(a-js-tools)|^(a-node-tools)|^(a-command)/.test(id),
  plugins: [
    resolve(),
    commonjs(),
    // 可打包 json 内容
    json(),
    typescript({
      // compilerOptions: {},
      // exclude: ["./node_modules", "./test"],
    }),
    // 打包压缩，自动去注释
    // terser(),
    // 去除无用代码
    cleanup(),
    copy({
      targets: [
        { src: 'package.json', dest: 'dist' },
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
        // 若是生成 bin 类型的包，可以将下面的代码打开 
        // { src: 'bin', dest: 'dist' },
      ],
    }),
  ],
};`,
  );
}

/** 导出配置 rollup.config.test.js 文件 */
export function rollupConfigTestJs(): void {
  writeFileSync(
    data.fileName('rollup.config.test.js'),
    `import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';

/** 配置需要不打包进生产包的包名配置  */
const externalList = [
  'nodejs',
  'tslib',
  'a-js-tools',
  'a-node-tools',
  'a-command',
];

export default {
  input: 'test/index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'test/out',
    },
  ],
  // 配置需要排除的包
  external: id => externalList.some(i => id.startsWith(i)),
  plugins: [
    resolve(),
    commonjs(),
    // 打包压缩，自动去注释
    // terser(),
    // 可打包 json 内容
    json(),
    typescript({}),
    // 去除无用代码
    cleanup(),
  ],
};
`,
  );
}

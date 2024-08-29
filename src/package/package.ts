/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @FileName package.ts
 * @Date  周三  08/28/2024
 * @Description 生成 package.json 文件内容
 *
 * 每次调用时都会访问本地的 npm 信息并返回，每一次版本更新都会导致包的更新
 ****************************************************************************/
import data from 'src/data';
import { writeToJsonFile } from 'src/tools';

/**
 *  这里之前返回的是一个对象，导致 js 在预编译的时候直接生成一个静态数据
 *  而无法在调用 packageJson 的时候真正的将 data 的最新值带入
 *  这便是现在以函数的形式进行返回，能够在调用时直接获取 data 的最新值
 *
 */
/**  除了 data 中提供的数据以外的数据   */
const initData = () => ({
  name: '',
  type: 'module',
  version: '0.0.0',
  main: 'cjs/index.cjs',
  typings: 'types/index.d.ts',
  author: '___  <___@___.___>  (https://___.___)',
  description:
    'here is the project description, please change the content with double underline',
  scripts: {
    b: 'rollup --config rollup.config.js && tsc -p tsconfig.types.json',
    build: 'npx ixxx rm dist run b',
    diff: 'npx ixxx pkg diff',
    eslint: 'npx ixxx cls && eslint src',
    beautify: 'npm run prettier',
    prettier: 'npx ixxx cls && prettier . --write',
    test: 'npx ixxx cls && rollup --config rollup.config.test.js && node test/out/test/index.mjs',
  },
  files: ['mjs', 'cjs', 'types'],
  exports: {
    '.': {
      import: {
        default: './mjs/index.mjs',
        types: './types/index.d.ts',
      },
      require: {
        default: './cjs/index.cjs',
        types: './types/index.d.ts',
      },
    },
  },
  keywords: [data.name],
  license: 'ISC',
  homepage: 'https://___.___',
  bugs: {
    url: `https://github.com/__/${data.name}/issues`,
    email: '__@__.__',
  },
  repository: {
    type: 'git',
    url: `git+https://github.com/___/${data.name}.git')`,
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
});

/** 生成 package.json 文件内容  */
export function packageJson() {
  const bin: { [a: string]: string } = {};
  bin[``] = 'bin/index.js';

  const finalData = Object.assign(initData(), data.package, { bin });

  writeToJsonFile('package.json', finalData);
}

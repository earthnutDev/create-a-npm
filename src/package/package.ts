import data from 'src/data';

/**  除了 data 中提供的数据以外的数据  */
const initData = {
  type: 'module',
  version: '0.0.0',
  author: '___ <___@___.___>  (https://___.___)',
  description: '这里是项目描述，请更改文件内 `___` 的内容',
  script: {
    b: 'rollup --config rollup.config.js && tsc -p tsconfig.types.json',
    build: 'ixxx rm dist run b',
    diff: 'ixxx pkg diff',
    prettier: 'ixxx cls && prettier . --write',
    test: 'rollup --config rollup.config.test.js',
  },
  files: ['mjs/', 'cjs', 'types'],
  keywords: [data.name],
  license: 'ISC',
  repository: {
    type: 'git',
    url: `git+https://github.com/___/${data.name}.git')`,
  },
  homepage: 'https://___.___',
  bugs: {
    url: `https://github.com/__/${data.name}/issues`,
    email: '__@__.__',
  },
  publishConfig: {
    access: 'publish',
    registry: 'https://registry.npmjs.org/',
  },
};

/** 生成 package.json 文件内容  */
export function packageJson() {
  /** 最终整合的数据 */
  const finalData = Object.assign(initData, data.package);
  console.log(finalData);
}

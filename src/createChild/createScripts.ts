import { pathJoin } from 'a-node-tools';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';

/**  构建脚本域  */
export function createScripts() {
  mkdirSync(pathJoin(dataStore.pkgFile('scripts')), { recursive: true });

  const { author } = dataStore.local;

  const name = dataStore.name.replace(/^@/, '');

  writeFileSync(
    dataStore.pkgFile('scripts/clean-package-json.js'),
    `
import {
  pathJoin,
  readFileToJsonSync,
  getDirectoryBy,
  writeJsonFile,
} from 'a-node-tools';

let packageJson = readFileToJsonSync('./package.json');

['scripts', 'devDependencies', 'lint-staged', 'private'].forEach(
  key => delete packageJson[key],
);

packageJson = {
  main: 'index.cjs',
  module: 'index.mjs',
  types: 'index.d.ts',
  ...packageJson,
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  files: ['index.d.ts', 'index.mjs', 'index.cjs', 'src'],
  exports: {
    '.': {
      import: {
        default: './index.mjs',
        types: './index.d.ts',
      },
      require: {
        default: './index.cjs',
        types: './index.d.ts',
      },
    },
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/${author.name}/${name}.git',
  },
  author: {
    name: '${author.name}',
    email: '${author.email}',
    url: '${author.url}',
  },
  browserslist: ['node>=18.0.0'],
  engines: {
    node: '>=18.0.0',
  },
  keywords: ['${name}'],
  homepage: '${author.url}',
  bugs: {
    url: 'https://github.com/${author.name}/${name}/issues',
    email: '${author.email}',
  },${
    dataStore.bin !== 0
      ? `
    bin: {
    ${dataStore.name} : './bin.mjs',
     },
      `
      : ''
  }
};

{
  const distPath = getDirectoryBy('dist', 'directory');

  const distPackagePath = pathJoin(distPath, './dist/package.json');

  writeJsonFile(distPackagePath, packageJson);
}
`,
  );
}

import { PackageJson } from 'a-node-tools';
import { dataStore } from '../data-store';
import { writeToJsonFile } from '../utils';
import { commandParameters } from 'src/data-store/commandParameters';

/** 生成 package.json 文件内容  */
export function packageJson() {
  const { manager } = commandParameters;
  const { dependencies: de } = dataStore.local;
  const ts = de.includes('typescript');

  const pkgInfo: PackageJson<{
    scripts: {
      [x: string]: string;
    };
    devDependencies: {
      [x: string]: string;
    };
    'lint-staged'?: {
      [x: string]: string[];
    };
    type: string;
    private: boolean;
  }> = {
    name: dataStore.name,
    version: '0.0.0',
    type: 'module',
    private: true,
    description: '',
    scripts: {
      b: `rollup --config rollup.config.js${dataStore.bin !== 1 && ts ? ' && tsc -p tsconfig.types.json' : ''}`,
      build: `jja cls rm dist && ${manager.value} run b && ${manager.value} run clean:package`,
      'clean:package': 'node scripts/clean-package-json.js',
      diff: 'jja pkg --diff=官方',
      prepublishOnly: 'pjj',
      push: 'gvv',
      'push:version': 'gvv',
      test: 'jja rm .eg && rollup --config rollup.config.eg.js && node .eg/index.mjs',
      vjj: 'vjj',
    },
    license: 'MIT',
    devDependencies: dataStore.buildDevDependencies(),
  };

  if (de.includes('husky') && de.includes('prettier')) {
    pkgInfo['lint-staged'] = {
      '*.{js,ts}': ['prettier --write'],
    };
    pkgInfo.scripts.prepare = 'husky';
  }

  // eslint 脚本
  if (de.includes('eslint'))
    pkgInfo.scripts['eslint'] = 'jja cls && eslint packages';

  if (de.includes('prettier'))
    pkgInfo.scripts['prettier'] = 'jja cls && prettier . --write';

  writeToJsonFile('package.json', pkgInfo);
}

import { dataStore } from 'src/data-store';
import { eslintConfig } from './eslint';
import { packageJson } from './package';
import { prettier } from './prettier';
import { rollup } from './rollup';
import { tsconfigJson } from './tsconfig';
import { createRollupEg } from './createRollupEg';
import { createReadMe } from '../createChild/createReadMe';
import { createLicense } from '../createChild/createLicense';
import { createChangeLog } from '../createChild/createChangeLog';
import { markdown } from './markdown';
import { gitIgnore } from './gitIgnore';
import { createTest } from '../createChild/createTest';
import { createIndex } from '../createChild/createIndex';
import { createScripts } from '../createChild/createScripts';
import { createAction } from './createAction';
import { createPub } from './createPub';

/**
 *
 * 导出 package 的主文件
 */
export function packageIndex() {
  const { dependencies: de } = dataStore.local;
  if (de.includes('action')) {
    createAction();
    createPub();
  }
  if (de.includes('typescript')) tsconfigJson();
  rollup();
  createRollupEg();
  createReadMe();
  packageJson();
  createLicense();
  createIndex();
  if (de.includes('eslint')) eslintConfig();
  if (de.includes('prettier')) prettier();
  markdown();
  createChangeLog();
  gitIgnore();
  createScripts();
  createTest();
}

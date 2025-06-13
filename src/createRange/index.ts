import { dataStore } from 'src/data-store';
import { createAction } from './createAction';
import { createTs } from './createTs';
import { createReadMe } from './createReadMe';
import { createPackage } from './createPackage';
import { createLicense } from './createLicense';
import { eslintConfig } from './eslint-config';
import { prettier } from './prettier';
import { markdown } from './markdown';
import { gitIgnore } from './git-ignore';
import { createScripts } from './createScripts';

/**  创建边界  */
export function createRange() {
  const { dependencies: de } = dataStore.local;
  if (de.includes('action')) {
    createAction();
    createScripts();
  }
  if (de.includes('typescript')) createTs();
  createReadMe();
  createPackage();
  createLicense();
  if (de.includes('eslint')) eslintConfig();
  if (de.includes('prettier')) prettier();
  markdown();
  gitIgnore();
}

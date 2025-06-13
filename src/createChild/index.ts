import { dataStore } from 'src/data-store';
import { createTs } from './createTs';
import { createRollup } from './createRollup';
import { createReadMe } from './createReadMe';
import { createPackage } from './createPackage';
import { createLicense } from './createLicense';
import { createIndex } from './createIndex';
import { createChangeLog } from './createChangeLog';
import { writeFileSync } from 'node:fs';
import { createScripts } from './createScripts';
import { createTest } from './createTest';
import { createRollupEg } from './createRollupEg';

/**    */
export function createChild() {
  const { dependencies: de } = dataStore.local;

  if (de.includes('typescript')) createTs();
  createRollup();
  createRollupEg();
  createReadMe();
  createPackage();
  createLicense();
  createIndex();
  createChangeLog();
  writeFileSync(dataStore.pkgFile('todo.md'), '# 代办\n\n');
  createScripts();
  createTest();
}

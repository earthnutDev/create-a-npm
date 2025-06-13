import { mkdirSync, writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';

/**  创建跟文件的主文件  */
export function createIndex() {
  const { dependencies: de } = dataStore.local;

  /**  是否为 ts  */
  const typescript = de.includes('typescript');

  mkdirSync(dataStore.pkgFile('src'), { recursive: true });

  writeFileSync(
    dataStore.pkgFile(`index.${typescript ? 'ts' : 'js'}`),
    `${dataStore.bin !== 0 ? '#!/usr/bin/env node\n\n' : ''}export { sayHello } from './src/index';`,
  );

  writeFileSync(
    dataStore.pkgFile(`src/index.${typescript ? 'ts' : 'js'}`),
    `
  \rexport function sayHello() {
    console.log('哈喽');
  }
  `,
  );
}

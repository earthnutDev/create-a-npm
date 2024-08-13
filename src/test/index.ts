/**
 *
 * 添加 test 文件夹
 *
 * 及其下面的 index.ts 文件
 */

import { pathJoin } from 'a-node-tools';
import { mkdirSync, writeFileSync } from 'node:fs';
import data from '../data';

/** 创建 test 及相关的文件 */
export function testFile() {
  const testCwd = pathJoin(data.cwd, 'test');

  mkdirSync(testCwd);

  writeFileSync(pathJoin(testCwd, 'index.ts'), `import '../index'';`);
}

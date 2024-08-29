/**
 *
 * 添加 test 文件夹
 *
 * 及其下面的 index.ts 文件
 */

import { pathJoin } from 'a-node-tools';
import { mkdirSync, writeFileSync } from 'node:fs';
import data from '../data';
import { testFunction } from './testFunction';

console.log('====================================');
console.log(999999);
console.log('====================================');

/** 创建 test 及相关的文件 */
export function testFile() {
  createIndexTs();
  // 创建 test testFunction 文件
  testFunction();
}

function createIndexTs() {
  const testCwd = pathJoin(data.cwd, 'test');
  console.log('====================================');
  console.log(data.cwd);
  console.log('====================================');
  mkdirSync(testCwd);
  /**  写入测试跟文件  */
  writeFileSync(pathJoin(testCwd, 'index.ts'), "import './testTestFunction';");
}

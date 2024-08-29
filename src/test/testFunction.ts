/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @FileName testFunction.ts
 * @Date  周三  08/28/2024
 * @Description 测试函数的测试文件，仅做测试用
 * 倘若后期删除 `testFunction` 测试函数，该文件亦当移除
 ****************************************************************************/

import { pathJoin } from 'a-node-tools';
import { writeFileSync } from 'node:fs';
import data from 'src/data';

export function testFunction() {
  /**  写入  */
  writeFileSync(
    pathJoin(data.cwd, 'test/testTestFunction.ts'),
    `import test from 'node:test';
import assert from 'node:assert'; 
import { testFunction }  from  '../index';


test('测试测试函数', () => {
  assert.equal(testFunction(), undefined ,'当两者不相等的我会被打印出来');
})`,
  );
}

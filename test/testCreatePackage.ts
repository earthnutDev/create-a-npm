import { runOtherCode } from 'a-node-tools';
import { mkdirSync } from 'node:fs';
import test from 'node:test';
import { createNpm } from 'src/createNpm';
import data from 'src/data';

/**
 *
 * 测试生成的文件库及相关的数据
 *
 * 测试之前先清理旧的文件，然后再重新创建
 *
 * 因为是测试，特定测试文件名为  test/test
 *  (因为工作目录在上级，所以这里的 test/test 实际为兄弟文件夹 test )
 *
 */

/// 这里重置了该文件夹，并在该文件夹下进行操作
data.name = 'test/test';

/**
 *
 * 实际在测试的是否清理了在 test 文件夹的内容
 *
 * 并在清理后进行了新建
 */
test.skip('测试生成文件库相关数据', async () => {
  /// 测试清理旧的创建的文件
  await runOtherCode(`npx ixxx rm ${data.cwd}`);
  /// 创建新的文件
  mkdirSync(data.cwd);

  createNpm();
});

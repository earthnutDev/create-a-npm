import assert from 'node:assert';
import test from 'node:test';
import askForName from 'src/askForName';
import data from 'src/data';

/**
 *
 * 测试当前的
 */
test.skip('检测当前包名问询', async () => {
  /**
   *
   * 储存旧的数据，这里应当是空字符
   */
  const oldNameLength = data.name.length;
  assert.equal(oldNameLength, 0);
  await askForName();
  // 当输入包名后就会赋值给 data 对象的 name 属性
  assert.notEqual(data.name.length, oldNameLength);
  // _p(data);
});

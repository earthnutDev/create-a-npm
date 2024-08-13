import test from 'node:test';
import custom from 'src/custom';

test.skip('测试自定义', async () => {
  custom();
});

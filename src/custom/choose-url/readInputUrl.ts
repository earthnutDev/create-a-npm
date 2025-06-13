import { isUndefined } from 'a-type-of-js';
import { command } from 'src/command';
import { exitProgram } from 'src/utils';

/**  读取用户输入的用户名  */
export async function readInputUrl() {
  const result = await command.question({
    text: '请输入您将配置的网址',
    maxLen: 50,
    minLen: 5,
    verify: [
      {
        reg: /^https?:\/{2}.+/,
        info: '需符合网址基本模式',
      },
    ],
  });

  if (isUndefined(result)) {
    return await exitProgram();
  }
  return result;
}

import { isUndefined } from 'a-type-of-js';
import { command } from 'src/command';
import { exitProgram } from 'src/utils';

/**  读取用户输入的用户名  */
export async function readInputUserName() {
  const result = await command.question({
    text: '请输入您将配置的用户名',
    maxLen: 16,
  });

  if (isUndefined(result)) {
    return await exitProgram();
  }
  return result;
}

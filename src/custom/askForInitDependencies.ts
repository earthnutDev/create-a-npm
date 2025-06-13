import { isUndefined } from 'a-type-of-js';
import { command } from 'src/command';
import { dataStore } from 'src/data-store';

/**  询问是否安装依赖  */
export async function askForInitDependencies() {
  const tip = ['安装', '跳过'];
  const result = await command.question({
    text: '是否安装依赖',
    tip,
  });
  if (isUndefined(result) || result === tip[1]) {
    return;
  }

  dataStore.install = true;
}

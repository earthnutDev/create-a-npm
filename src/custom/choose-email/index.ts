import { SelectionParamObjectData } from 'a-command';
import { getGitConfigUserEmail } from './getGitConfigUserEmail';
import { appendDiy } from '../appendDiy';
import { choose } from './choose';
import { createByName } from './createByName';
import { readLocalValue } from '../readLocalValue';

/**  配置使用邮箱   */
export async function chooseEmail() {
  const data: SelectionParamObjectData<string | symbol>[] = [];
  // 获取本地 git  中配置的邮箱
  await getGitConfigUserEmail(data);
  createByName(data);
  readLocalValue(data, 'email');
  const value = appendDiy(data);

  await choose(data, value);
}

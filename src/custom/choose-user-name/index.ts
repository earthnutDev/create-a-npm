import { SelectionParamObjectData } from 'a-command';
import { getGitConfigUserName } from './getGitConfigUserName';
import { getMachineUsername } from './getMachineUserName';
import { appendDiy } from '../appendDiy';
import { choose } from './choose';
import { readLocalValue } from '../readLocalValue';

/** 获取本地的 git username  */
export async function chooseUserName() {
  const data: SelectionParamObjectData<string | symbol>[] = [];
  await getGitConfigUserName(data); // 获取本地 git 中配置的用户名
  getMachineUsername(data); // 获取机器配的用户名
  const value = appendDiy(data);
  /**  读取配置  */
  readLocalValue(data, 'name');
  await choose(data, value);
}

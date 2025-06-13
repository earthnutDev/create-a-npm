import { SelectionParamObjectData } from 'a-command';
import { runOtherCode } from 'a-node-tools';
import { isBusinessEmptyString } from 'a-type-of-js';
import { exitProgram } from 'src/utils';

/**  获取 git 配置的用户邮箱  */
export async function getGitConfigUserEmail(
  data: SelectionParamObjectData<string | symbol>[],
) {
  const result = await runOtherCode('git config user.email');

  if (!result.success) {
    return await exitProgram(
      '获取本地的 git config user.email 出错\n'.concat(
        result.error || result.data,
      ),
    );
  }

  /**   邮箱  */
  const userEmail = result.data.replace(/\n$/, '') || '';

  if (!isBusinessEmptyString(userEmail)) {
    data.push({
      value: userEmail,
      tip: '该值从 git 全局配置读取',
      label: userEmail,
    });
  }
}

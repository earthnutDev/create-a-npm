import { SelectionParamObjectData } from 'a-command';
import { runOtherCode } from 'a-node-tools';
import { isBusinessEmptyString } from 'a-type-of-js';

/**  从 git 配置文件读取用户名  */
export async function getGitConfigUserName(
  data: SelectionParamObjectData<string | symbol>[],
) {
  /**  从 git 中读取姓名值  */
  const result = await runOtherCode('git config user.name');

  if (result.success) {
    /**   用户名  */
    const git_user_name = result.data?.replace(/\n$/, '') || '';

    if (!isBusinessEmptyString(git_user_name)) {
      data.push({
        label: `${git_user_name}`,
        value: git_user_name,
        tip: '由 git 全局配置读取',
      });
    }
  }
}

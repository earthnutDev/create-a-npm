import { SelectionParamObjectData } from 'a-command';
import { userInfo } from 'node:os';

/**  获取机器配置的项  */
export function getMachineUsername(
  data: SelectionParamObjectData<string | symbol>[],
) {
  /**  机器名称  */
  const local_user_name =
    process.env.USER ?? process.env.USERNAME ?? userInfo().username;

  data.push({
    label: `${local_user_name}`,
    value: local_user_name,
    tip: '设备用户名',
  });
}

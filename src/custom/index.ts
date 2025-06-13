/************************************************
 * @Author earthnut
 * @Email earthnut.dev@outlook.com
 * @FileName custom.ts
 * @Date  周三  08/28/2024
 * @Description
 ************************************************/
import { chooseUserName } from './choose-user-name';
import { chooseEmail } from './choose-email';
import { chooseUrl } from './choose-url';
import { askForLastConfig } from './askForLastConfig';
import { dog } from 'src/dog';
import { askForDependencies } from './askForDependencies';
import { askForInitDependencies } from './askForInitDependencies';
import { askForWithBin } from './askForWithBin';

/**  自定义 */
export default async function custom(): Promise<void> {
  // 如果有上次的配置时，用户选择时候上次的配置
  const result = await askForLastConfig();

  dog('获取需要更改的项', result);
  /**  获取用户名  */
  if (result.includes('name')) await chooseUserName();
  if (result.includes('email')) await chooseEmail();
  if (result.includes('url')) await chooseUrl();
  await askForWithBin();
  await askForDependencies();
  await askForInitDependencies();
}

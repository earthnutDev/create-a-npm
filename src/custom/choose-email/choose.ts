import { isType, isUndefined } from 'a-type-of-js';
import { brightBlackPen } from 'color-pen';
import { command } from 'src/command';
import { dataStore } from 'src/data-store';
import { dog, dun } from 'src/dog';
import { qqi } from 'src/qqi';
import { exitProgram } from 'src/utils';
import { SelectionParamObjectData } from 'a-command';
import { readInputEmail } from './readInputEmail';

/**  选择要使用的用户名  */
export async function choose(
  data: SelectionParamObjectData<string | symbol>[],
  value: symbol,
) {
  const { author } = dataStore.local;
  /**  保留最后的 email 值  */
  const lastEmail = author.email;
  /**  让用户选择用户名  */
  let email = await command.selection<string | symbol>({
    data,
    info: '请选择您的通讯邮箱',
  });

  if (isUndefined(email)) return await exitProgram();

  // 选择了手动触发收订选择
  if (isType<symbol>(email, i => i === value)) email = await readInputEmail();

  if (!dun) dog(brightBlackPen('获取当前的用户名 '), email);

  dog('是否执行写入', qqi.available);
  dataStore.package.author.email = author.email = email;
  /**  保证可写  */
  if (qqi.available && lastEmail !== email) {
    dog('写入的值', dataStore.local);
    qqi.write('config', dataStore.local);
  }
}

import { isType, isUndefined } from 'a-type-of-js';
import { brightBlackPen } from 'color-pen';
import { command } from 'src/command';
import { dataStore } from 'src/data-store';
import { dog, dun } from 'src/dog';
import { qqi } from 'src/qqi';
import { exitProgram } from 'src/utils';
import { SelectionParamObjectData } from 'a-command';
import { readInputUrl } from './readInputUrl';

/**  选择要使用的用网址  */
export async function choose(
  data: SelectionParamObjectData<string | symbol>[],
  value: symbol,
) {
  const { author } = dataStore.local;
  /**  保留最后的 url 值  */
  const lastUrl = author.url;

  /**  让用户选择用户名  */
  let url = await command.selection<string | symbol>({
    data,
    info: '请配置您的个人网站',
  });

  if (isUndefined(url)) return await exitProgram();

  // 选择了手动触发收订选择
  if (isType<symbol>(url, i => i === value)) url = await readInputUrl();

  if (!dun) dog(brightBlackPen('获取当前的网址 '), url);

  dog('是否执行写入', qqi.available);
  dataStore.package.author.url = author.url = url;
  /**  保证可写  */
  if (qqi.available && lastUrl !== url) {
    dog('写入的值', dataStore.local);
    qqi.write('config', dataStore.local);
  }
}

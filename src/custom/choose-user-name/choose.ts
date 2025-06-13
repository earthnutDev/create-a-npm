import { isType, isUndefined } from 'a-type-of-js';
import { brightBlackPen } from 'color-pen';
import { command } from 'src/command';
import { dataStore } from 'src/data-store';
import { dog, dun } from 'src/dog';
import { qqi } from 'src/qqi';
import { exitProgram } from 'src/utils';
import { readInputUserName } from './readInputUserName';
import { SelectionParamObjectData } from 'a-command';

/**  选择要使用的用户名  */
export async function choose(
  data: SelectionParamObjectData<string | symbol>[],
  value: symbol,
) {
  const { author } = dataStore.local;
  const lastUsername = author.name;
  /**  让用户选择用户名  */
  let name = await command.selection<string | symbol>({
    data,
    info: '请选择要使用的用户名',
  });

  if (isUndefined(name)) return await exitProgram();

  // 选择了手动触发收订选择
  if (isType<symbol>(name, i => i === value)) {
    name = await readInputUserName();
  }

  if (!dun) dog(brightBlackPen('获取当前的用户名 '), name);

  dog('是否执行写入', qqi.available);
  dataStore.package.author.name = author.name = name;
  /**  保证可写  */
  if (qqi.available && lastUsername !== name) {
    dog('写入的值', dataStore.local);
    qqi.write('config', dataStore.local);
  }
}

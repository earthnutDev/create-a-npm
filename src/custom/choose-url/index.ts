import { SelectionParamObjectData } from 'a-command';
import { createByName } from './createByName';
import { appendDiy } from '../appendDiy';
import { choose } from './choose';
import { readLocalValue } from '../readLocalValue';

/**  选择使用 url  */
export async function chooseUrl() {
  const data: SelectionParamObjectData<string | symbol>[] = [];

  createByName(data);
  readLocalValue(data, 'url');
  const value = appendDiy(data);

  await choose(data, value);
}

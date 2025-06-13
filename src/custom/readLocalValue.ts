import { SelectionParamObjectData } from 'a-command';
import { isBusinessEmptyString } from 'a-type-of-js';
import { greenPen } from 'color-pen';
import { dataStore } from 'src/data-store';
import { qqi } from 'src/qqi';
import { LocalConfig } from 'src/types';

/** 读取本地的用户名  */
export function readLocalValue(
  data: SelectionParamObjectData<string | symbol>[],
  pro: 'name' | 'email' | 'url',
) {
  if (!qqi.available) return;
  const config = qqi.read<LocalConfig>('config');
  const value = config?.author?.[pro] ?? '';
  if (isBusinessEmptyString(value)) {
    return;
  }
  // 储存到本地
  dataStore.local.author[pro] = value;
  /**  是否有该值  */
  let hasLocalValue: boolean = false;
  for (const i in data) {
    const ele = data[i];
    if (ele.value === value) {
      ele.tip += greenPen`(上次使用该值)`;
      hasLocalValue = true;
      data.unshift(data.splice(Number(i), 1)[0]);
      break;
    }
  }
  if (!hasLocalValue) {
    data.unshift({
      label: `${value}`,
      value,
      tip: '上次使用',
    });
  }
}

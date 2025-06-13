import { SelectionParamObjectData } from 'a-command';
import { isBusinessEmptyString } from 'a-type-of-js';
import { dataStore } from 'src/data-store';

/**  由用户名构建  */
export function createByName(
  data: SelectionParamObjectData<string | symbol>[],
) {
  const { author } = dataStore.local;

  if (isBusinessEmptyString(author.name)) {
    return;
  }
  const email = `${author.name.replace(/\s+/g, '_')}@outlook.com`;

  data.push({
    value: email,
    label: email,
    tip: '该值由 name 值合成而来',
  });
}

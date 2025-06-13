import { isUndefined } from 'a-type-of-js';
import { greenPen } from 'color-pen';
import { command } from 'src/command';
import { dataStore } from 'src/data-store';
import { exitProgram } from 'src/utils';

/**  携带域时候的判断  */
export async function carryRange(pkgName: string) {
  const result = await command.selection<number>({
    info: '检测到当前文件包含域',
    data: [
      {
        value: 0,
        label: '子包模式',
        tip: `默认您是在${greenPen(pkgName.replace(/^@(.*)\/.*$/, '$1').concat('/packages'))}目录下`,
      },
      {
        value: 1,
        label: '嵌套模式',
        tip: `默认为您创建 ${greenPen(pkgName.replace(/@/, '').replace(/\//, '/packages/'))}`,
      },
    ],
  });
  if (isUndefined(result)) return await exitProgram();
  dataStore.carryRange = Boolean(result);
}

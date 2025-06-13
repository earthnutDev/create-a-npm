/************************************************
 * @Author earthnut
 * @Email earthnut.dev@outlook.com
 * @ProjectName crate-a-npm
 * @FileName createNpm.ts
 * @CreateDate  周五  08/30/2024
 * @Description 创建 npm 主要内容
 * 该操作出现在命名完成后
 ************************************************/
import { askForName } from './ask-for-name';
import custom from './custom';
import { packageIndex } from './simple';
import { dataStore } from './data-store';
import { dog } from './dog';
import { createRange } from './createRange';
import { createChild } from './createChild';

/**
 *
 * 开始根据数据创建包  */
export async function createNpm(): Promise<void> {
  dog('开始构建应用');
  /**
   *
   *  检测是否遗漏了询问包名
   *
   * 倘若并没有配置 name 属性值，则
   * */
  if (dataStore.name == '') {
    await askForName();
    await custom();
    await createNpm();
    return;
  }

  if (dataStore.childPkg) {
    if (dataStore.carryRange) createRange();
    createChild();
    return;
  }

  // 包下文件
  packageIndex();
}

import askForName from './askForName';
import data from './data';

/**
 *
 * 开始根据数据创建包  */
export async function createPackage(): Promise<void> {
  /**
   *
   *  检测是否遗漏了询问包名  */
  if (data.name == '') {
    await askForName();
    await createPackage();
    return;
  }
}

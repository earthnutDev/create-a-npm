import { runOtherCode } from 'a-node-tools';
import { dataStore } from './data-store';

/**  安装依赖  */
export async function installDependencies() {
  if (dataStore.childPkg) {
    await runOtherCode({
      code: 'npm install',
      cwd: dataStore.rangeFile(''),
      printLog: true,
      waiting: '请稍等，正在安装依赖',
    });
  }
  await runOtherCode({
    code: 'npm install',
    cwd: dataStore.pkgFile(''),
    printLog: true,
    waiting: '请稍等，正在安装依赖',
  });
}

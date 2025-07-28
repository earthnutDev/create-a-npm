import { runOtherCode } from 'a-node-tools';
import { dataStore } from './data-store';
import { commandParameters } from './data-store/commandParameters';

/**  安装依赖  */
export async function installDependencies() {
  const { manager } = commandParameters;
  await runOtherCode({
    code: `${manager.value} install`,
    cwd: dataStore.childPkg ? dataStore.rangeFile('') : dataStore.pkgFile(''),
    printLog: true,
    waiting: '请稍等，正在安装依赖',
  });
}

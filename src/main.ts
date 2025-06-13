import { _p, colorLine, pathJoin, writeJsonFile } from 'a-node-tools';
import { askForName } from './ask-for-name';
import { createNpm } from './createNpm';
import custom from './custom';
import { dog } from './dog';
import { unlinkSync } from 'node:fs';
import { exitProgram } from './utils';
import { dataStore } from './data-store';
import { installDependencies } from './installDependencies';
import {
  brightBlackPen,
  brightGreenPen,
  greenPen,
  magentaPen,
} from 'color-pen';

(async () => {
  // 可写校验
  try {
    try {
      const testFile = pathJoin('test_write' + Date.now());
      writeJsonFile(testFile, {});
      unlinkSync(testFile);
    } catch (error) {
      dog.error(error);
      console.log(error);
      return await exitProgram('您没有当前目录的写文件的权限，请确认后再试');
    }

    colorLine('华丽开始分割', true);
    /// 设定包名
    await askForName();

    /// 参看是否自定义包的内容，这里会自定义是否使用 eslint 等相关内容
    await custom();

    /// 开始包创建
    await createNpm();
    if (dataStore.install) await installDependencies();

    if (dataStore.childPkg) {
      _p(greenPen`创建项目完毕`);
      _p(`请 cd 到 ${magentaPen`./${dataStore.range}`} 目录下`);
      _p();
      if (!dataStore.install) _p(`执行 ${brightBlackPen`npm install`}`);
      _p(brightBlackPen`简单测试使用 ${brightGreenPen`npm test`}`);
      _p(brightBlackPen`简单打包使用 ${brightGreenPen`npm run build`}`);
    } else {
      _p(greenPen`创建项目完毕`);
      _p(`请 cd 到 ${magentaPen(dataStore.cwd)} 目录下`);
      _p();
      if (!dataStore.install) _p(`执行 ${brightBlackPen`npm install`}`);
      _p(brightBlackPen`简单测试使用 ${brightGreenPen`npm test`}`);
      _p(brightBlackPen`简单打包使用 ${brightGreenPen`npm run build`}`);
    }

    /// 退出
    await exitProgram('');
  } catch (error) {
    dog.error(error);
  }
})();

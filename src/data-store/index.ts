/************************************************
 * @Author
 * @Email earthnut.dev@outlook.com
 * @ProjectName create-a-npm
 * @FileName data.ts
 * @CreateDate  周五  08/30/2024
 * @Description  数据中心
 * 当配置包名时，后自动创建包的工作路径
 ************************************************/
import {
  getDirectoryBy,
  initializeFile,
  PackageJson,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { DataType } from 'src/types';
import { originDependencies } from './origin-dependencies';
import { dog } from 'src/dog';
import { isUndefined } from 'a-type-of-js';

/** 初始化当前工作文件路径  */
const [__dirname] = initializeFile();

/** 根据当前被调用文件查找当前包的 package.json  文件配置 */
let cwd = getDirectoryBy('package.json', 'file', __dirname);

dog('获取到的地址为', cwd);

/** 这里好像难以避免 cwd 为 undefined */
if (isUndefined(cwd)) {
  cwd = process.cwd();
}

/** 读取当前包的 package.json 文件内容  */
const packageJsonData = readFileToJsonSync<PackageJson>(
  pathJoin(cwd, 'package.json'),
);

dog('获取到的数据为：', packageJsonData);
/** 导出构建数据 */
export const dataStore: DataType = {
  cwd: '',
  range: '',
  pkgFile(...str: string[]): string {
    return pathJoin(this.cwd, ...str);
  },
  rangeFile(...str: string[]): string {
    return pathJoin(this.range, ...str);
  },
  get name(): string {
    return this.package.name;
  },

  set name(name: string) {
    if (this.childPkg) {
      if (this.carryRange) {
        this.range = name.replace(/^@(.*)\/.*$/g, '$1');
        this.cwd = name.replace(/@/, '').replace(/\//, '/packages/');
      } else this.cwd = name.replace(/^.*\/(.*)$/g, '$1');
    } else this.cwd = name;
    this.package.name = name;
  },

  bin: 0,

  local: {
    author: {
      name: '',
      email: '',
      url: '',
    },
    dependencies: originDependencies,
  },

  package: {
    name: '',
    version: '0.0.0',
    description: '',
    author: {
      name: '',
      email: '',
      url: '',
    },
    dependencies: packageJsonData?.dependencies || {},
    devDependencies: packageJsonData?.devDependencies || {},
  },
  install: false,
  carryRange: false,
  childPkg: false,
  buildDevDependencies() {
    const { dependencies: de } = this.local;
    const { devDependencies: devPen, dependencies: pen } = this.package;

    dog('获取的本地的包信息', de);
    dog('获取本地的');

    const result: {
      [x: string]: string;
    } = {
      '@qqi/check-version': devPen['@qqi/check-version'] || '^1.0.2',
      '@qqi/rollup-external': devPen['@qqi/rollup-external'] || '^1.0.6',
      '@rollup/plugin-commonjs': devPen['@rollup/plugin-commonjs'] || '^28.0.3',
      '@rollup/plugin-json': devPen['@rollup/plugin-json'] || '^6.1.0',
      '@rollup/plugin-node-resolve':
        devPen['@rollup/plugin-node-resolve'] || '^16.0.1',
      '@rollup/plugin-terser': devPen['@rollup/plugin-terser'] || '^0.4.4',
      'a-command': pen['a-command'] || '^2.3.8',
      'a-node-tools': pen['a-node-tools'] || '^4.2.6',
      gvv: devPen['gvv'] || '^0.0.7',
      jja: devPen['jja'] || '^2.3.8',
      pjj: devPen['pjj'] || '^1.0.1',
      vjj: devPen['vjj'] || '^1.0.5',
      rollup: devPen['rollup'] || '^4.43.0',
      'rollup-plugin-cleanup': devPen['rollup-plugin-cleanup'] || '^3.2.1',
      'rollup-plugin-copy': devPen['rollup-plugin-copy'] || '^3.5.0',
    };

    if (de.includes('husky') && de.includes('prettier')) {
      result['husky'] = devPen['husky'] || '^9.1.7';
      result['lint-staged'] = devPen['lint-staged'] || '^16.1.0';
    }

    if (de.includes('eslint')) {
      // eslint 核型
      result['eslint'] = devPen['eslint'] || '^9.28.0';
      // 注释审视
      result['eslint-plugin-jsdoc'] =
        devPen['eslint-plugin-jsdoc'] || '^51.0.1';
      // 其他需要的两个依赖
      result['globals'] = devPen['globals'] || '^16.2.0';
      result['@eslint/js'] = devPen['@eslint/js'] || '^9.28.0';

      // eslint typescript 支持
      if (de.includes('typescript'))
        result['typescript-eslint'] = devPen['typescript-eslint'] || '^8.34.0';

      // eslint prettier 支持
      if (de.includes('prettier'))
        result['eslint-config-prettier'] =
          devPen['eslint-config-prettier'] || '^10.1.5';
    }

    // 如果需要格式化
    if (de.includes('prettier'))
      result['prettier'] = devPen['prettier'] || '^3.5.3';

    // 如果需要 ts
    if (de.includes('typescript')) {
      result['@types/node'] = devPen['@types/node'] || '^24.0.1';
      result['@rollup/plugin-typescript'] =
        devPen['@rollup/plugin-typescript'] || '^12.1.2';
      result['typescript'] = devPen['typescript'] || '^5.8.3';
    }
    dog('构建的依赖图', result);
    return result;
  },
};

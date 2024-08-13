import {
  getDirectoryBy,
  initializeFile,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { basename } from 'node:path';

/** 初始化当前工作文件路径  */
const [__dirname] = initializeFile();

/** 根据当前被调用文件查找当前包的 package.json  文件配置 */
let cwd = getDirectoryBy('package.json', 'file', __dirname);

/** 这里好像难以避免 cwd 为 undefined */
if (cwd == undefined) {
  cwd = process.cwd();
}

/** 读取当前包的 package.json 文件内容  */
const packageJsonData = readFileToJsonSync(pathJoin(cwd, 'package.json'));

/** 导出构建数据 */
export default {
  /** 工作目录 */
  cwd: '',
  /** 创建文件的路径 */
  fileName(str: string): string {
    return pathJoin(this.cwd, str);
  },
  /** 项目名称
   *
   * 该值在 askForName 中进行赋值
   */
  get name(): string {
    return this.package.name;
  },
  set name(name: string) {
    let finalName: string;
    /** 将创建路径储存起来  */
    this.cwd = name;
    /** 查看创建路径和基础根路径是否相同 */
    if (basename(name) == name) {
      finalName = name;
    } else {
      finalName = basename(name);
    }
    this.package.name = finalName;
  },
  /** 是否携带 npx 指令
   *  该值将在 custom 过程中进行赋值 */
  bin: false,
  /** 包中需要的内容  */
  package: {
    /**包名称  */
    name: '',
    /** 依赖 */
    dependencies: packageJsonData.dependencies || {},
    /** 开发依赖 */
    devDependencies: packageJsonData.devDependencies || {},
  },
};

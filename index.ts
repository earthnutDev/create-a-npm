import askForName from './src/askForName';
import { createPackage } from './src/createPackage';
import custom from './src/custom';

/// 设定包名
await askForName();

/// 参看是否自定义包的内容
custom();

/// 开始包创建
createPackage();

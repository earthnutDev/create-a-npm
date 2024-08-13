import askForName from './src/askForName';
import { createNpm } from './src/createNpm';
import custom from './src/custom';

/// 设定包名
await askForName();

/// 参看是否自定义包的内容，这里会自定义是否使用 eslint 等相关内容
await custom();

/// 开始包创建
await createNpm();

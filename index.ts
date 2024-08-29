/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @FileName index.ts
 * @Date  周三  08/28/2024
 * @Description 包源文件的跟文件，该文件暴露相应的接口
 ****************************************************************************/
import askForName from './src/askForName';
import { createNpm } from './src/createNpm';
import custom from './src/custom';

/// 设定包名
await askForName();

/// 参看是否自定义包的内容，这里会自定义是否使用 eslint 等相关内容
await custom();

/// 开始包创建
await createNpm();

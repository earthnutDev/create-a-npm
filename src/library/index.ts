/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @FileName index.ts
 * @Date  周三  08/28/2024
 * @Description 生成 sec 文件夹，并导入其他生成项目文件的模块
 ****************************************************************************/
import data from '../data';
import { pathJoin } from 'a-node-tools';
import { mkdirSync } from 'node:fs';
import { indexTs } from './indexTs';
import { srcIndexTs } from './srcIndexTs';
/**
 * 导出生成 src 的主文件
 */

export function src() {
  // 创建 src 文件夹
  mkdirSync(pathJoin(data.cwd, 'src'));
  /// index.ts
  indexTs();
  //
  srcIndexTs();
}

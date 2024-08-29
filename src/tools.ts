/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName create-a-npm
 * @FileName tools.ts
 * @Date  周三  08/28/2024
 * @Description 工具函数文件
 *
 * - printSome                打印彩色信息
 * - writeToJsonFile          将 json 写入新的文件
 ****************************************************************************/
import { _p, Color, writeJsonFile } from 'a-node-tools';
import data from './data';

/**
 * 打印一些内容
 *
 * @param message  {@link  String} 将要打印的信息
 * @returns void
 */
export function printSome(message: string): undefined {
  _p(Color.random(new Date().toLocaleTimeString().concat(message)));
}

/**
 * 向文件写入 json 数据
 *
 * @param fileName  {@link string} 写入的文件名
 * @param jsonData  写入的数据
 */
export function writeToJsonFile(fileName: string, jsonData: unknown): void {
  writeJsonFile(data.fileName(fileName), jsonData as never);
}

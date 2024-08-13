import { _p, Color, writeJsonFile } from 'a-node-tools';
import data from './data';

/**
 * 打印一些内容
 *
 * @param message  {@link  String} 将要打印的信息
 */
export function printSome(message: string) {
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

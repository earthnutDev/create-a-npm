/************************************************
 * @Author earthnut
 * @Email earthnut.dev@outlook.com
 * @ProjectName create-a-npm
 * @FileName tools.ts
 * @Date  周三  08/28/2024
 * @Description 工具函数文件
 *
 ************************************************/
import {
  _p,
  colorLine,
  cursorAfterClear,
  cursorShow,
  typewrite,
  writeJsonFile,
} from 'a-node-tools';
import { dataStore } from './data-store';
import { randomPen } from 'color-pen';
import { command } from './command';
import { waiting } from './waiting';

/**
 *
 *  打印一些内容
 *
 * @param message  {@link  String} 将要打印的信息
 * @returns void
 *
 */
export function printSome(message: string): undefined {
  _p(randomPen(new Date().toLocaleTimeString().concat(message)));
}

/**
 *
 *  写入 json 文件
 *
 * @param fileName  {@link string} 写入的文件名
 * @param jsonData  写入的数据
 * @returns void
 *
 */
export function writeToJsonFile(fileName: string, jsonData: unknown): void {
  writeJsonFile(dataStore.pkgFile(fileName), jsonData as never);
}

/**
 *
 * 退出程序
 *
 */
export async function exitProgram(
  message: string = '好的，正在做退出前最后的工作，请稍等',
): Promise<never> {
  await typewrite(message);
  waiting.destroyed();
  cursorAfterClear();
  cursorShow();
  colorLine('终结线', true);
  return command.end();
}

/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @FileName custom.ts
 * @Date  周三  08/28/2024
 * @Description
 ****************************************************************************/
/*** 自定义插件的安装  */

import { ArgsMapType, ArgsType } from 'a-command/types/args';
import { command } from './command';
import { _p, cursorMoveUp, runOtherCode } from 'a-node-tools';
// import { homedir } from 'node:os';

/**  TODO
 *
 *  后期这里要添加 配置文件的读取和配置
 *
 *  思路：
 *  - 从  node:os 的 homedir 获取用户的文件夹目录
 *
 */

/**
 *
 * 自定义
 */
export default async function custom(): Promise<void> {
  const { data } = await runOtherCode({ code: 'git config user.name' });

  console.log(data?.replace(/(.*)\n$/, '$1'));

  cursorMoveUp(3);

  /** 用户文件的根目录  */
  // const userDir: string = homedir();
  /**  判断当前文件是否存在（应该是存在的吧，这里验证有点多此一举） */
  // const testDir = dirEmpty(userDir) > -1;

  // if (testDir) {
  //   console.log(userDir);

  //   console.log(dirEmpty(userDir));
  // }

  return;
  /** 拿到数据 */
  const args: ArgsType = command.args;

  /** 取到处理后的 map 类型数据，用于判断用户是否要自定义配置创建 */
  const arrMap: ArgsMapType = args.$map;

  /// 没有匹配到命令，则直接退出该函数
  if (arrMap.custom == undefined) return;

  const tip = ['yes', 'no'];

  const typeScriptUse = await command.question({
    text: '您是否需要搭配 typeScript 创建',
    tip,
    resultText: 'typescript',
    private: true,
  });
  /** 用户选择使用 typescript */
  if (typeScriptUse == tip[0]) {
    _p(tip);
  }

  console.log(typeScriptUse);
}

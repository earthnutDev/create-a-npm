/*** 自定义插件的安装  */

import { ArgsMapType, ArgsType } from 'a-command/types/args';
import { command } from './command';
import { _p } from 'a-node-tools';

/**
 *
 * 自定义
 */
export default async function (): Promise<void> {
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

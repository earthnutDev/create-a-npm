/*** 自定义插件的安装  */

import { ArgsMapType } from 'a-command/types/args';
import { command } from './command';
/**
 *
 * 自定义
 */
export default function (): void {
  const args: ArgsMapType = command.args.$map;

  console.log('arg custom', args, args.custom);
}

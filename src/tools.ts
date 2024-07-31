import { _p, Color } from 'a-node-tools';

/**
 * 打印一些内容
 *
 * @param message  {@link  String} 将要打印的信息
 */
export function printSome(message: string) {
  _p(Color.random(new Date().toLocaleTimeString().concat(message)));
}

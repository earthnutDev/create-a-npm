import { command } from 'src/command';
import data from './data';
import {
  _p,
  Color,
  cursorAfterClear,
  cursorMoveUp,
  dirEmpty,
} from 'a-node-tools';
import { mkdirSync } from 'node:fs';

/** Inquire about the current package name  \
 * 查看是否当前有项目名
 */
export default async function askForName(): Promise<void> {
  /** The name of the package to be created  \
   * 将创建的包的名称
   */
  let commandName: string = await command.question({
    text: '您即将创建的包名',
    tip: '请使用空格/连字符(-)做分隔符',
    private: true,
  });
  /** Clean up spaces and convert hyphens
   *
   * 清理空格即转换连字符 */
  commandName = commandName.trim().replace(/\s+/gm, '-');
  /**  */
  if (commandName.length == 0 || commandName[0].match(/[^a-z]/)) {
    _p(Color.fromRgb('您的输入为空或首字符非法 \n', '#ff0'));
    await aslForAgainOrQuit('您的输入有误，请重试', '重试或退出');
    return;
  }
  const dirIsEmpty = dirEmpty(commandName);
  /** Detected that the current directory contains a package with the same name
   *
   * 检测出当前目录下包含同名包且不为空
   */
  if (dirIsEmpty == 0) {
    _p(Color.fromRgb('当前目录下存在非空同名文件夹 \n', '#ff0'));
    await aslForAgainOrQuit('更换为其他名称', '更换为其他的名称或退出');
    /**
     *
     * 当前任务已完成，避免数据污染，需要 return 结束
     */
    return;
  }
  /** 先进行赋值 */
  data.name = commandName;
  /*** 根据刚才的判断参看是否为非 */
  if (dirIsEmpty == -1) {
    /** In the current state,
     *  it indicates that there is no folder with the same name in the working directory.
     * In this case, create an empty folder
     *
     *  当前状态下表明该工作目录下并没有同名文件夹，这时候创建一个空的文件夹  */
    mkdirSync(commandName, { recursive: true });
  }
}

/**
 *
 * 问询当前不符合的情况下是否要重试或直接退出
 *
 * @param askMessage {@link String}  询问的文本
 *
 * @param [text=''] {@link String} 展示的文本
 *
 * @returns  Promise<void>>  {@link  Promise} 没有返回值
 */
async function aslForAgainOrQuit(
  askMessage: string,
  text: string = '',
): Promise<void> {
  const tip = [askMessage, '退出'];
  text = text == '' ? `${askMessage}或退出` : text;
  const select = await command.question(
    {
      text,
      tip,
      private: true,
    },
    true,
  );
  // Cover the printed information on top
  // 覆盖上面的打印信息
  cursorMoveUp(2);
  cursorAfterClear();
  // If the user chooses to exit
  // 倘若用户选择了退出
  if (select === tip[1]) {
    // _p('好的，即将退出');
    command.end;
  } else {
    // The user calls himself to restart the query after selecting Continue
    // 用户选择了继续后调用自己重新开始问询
    await askForName();
    return;
  }
}

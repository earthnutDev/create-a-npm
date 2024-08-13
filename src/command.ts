import { Command } from 'a-command';

const command: Command = new Command('create-a-npm');

/** 暂未配置自定义项，后续会跟上   */
// command.bind({ 'custom <cm>  (自定义)': [] });

// 执行，并在触发 -h、-v 时直接结束应用
command.run().isEnd.end;

export { command };

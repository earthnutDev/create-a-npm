import { writeFileSync } from 'node:fs';
import data from 'src/data';
import { writeToJsonFile } from 'src/tools';
/**
 * 导出 prettier 的相关配置文件
 */

export function prettier(): void {
  // 写入 prettier ignore 忽略规则
  writeFileSync(
    data.fileName('.prettierignore'),
    `node_modules/*

*/node_modules

## 打包文件

list

test/out

.DS_Store`,
  );

  /// 写入规则
  writeToJsonFile('.prettierrc', {
    // 屏幕单行的宽度
    printWidth: 80,
    // tab 宽度，默认是 2 ，但是我觉得不太明显
    tabWidth: 2,

    useTabs: false,
    semi: true,
    // 单引号
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'avoid',
    endOfLine: 'auto',
  });
}

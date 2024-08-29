/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @FileName prettier.ts
 * @Date  周三  08/28/2024
 * @Description 生成 prettier 规则的文件
 *
 * 包含：
 * - .prettierignore  prettier 执行忽略文件
 * - .prettierrc      prettier 配置文件
 ****************************************************************************/
import { writeFileSync } from 'node:fs';
import data from 'src/data';
import { writeToJsonFile } from 'src/tools';

/**
 * 导出 prettier 的相关配置文件
 *
 * 生成包含：
 * - .prettierignore  prettier 执行忽略文件
 * - .prettierrc      prettier 配置文件
 */
export function prettier(): void {
  // 写入 prettier ignore 忽略规则
  writeFileSync(
    data.fileName('.prettierignore'),
    `node_modules

**/node_modules

## 打包文件

dist

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

/************************************************
 * @Author earthnut
 * @Email earthnut.dev@outlook.com
 * @FileName prettier.ts
 * @Date  周三  08/28/2024
 * @Description 生成 prettier 规则的文件
 *
 * 包含：
 * - .prettierignore  prettier 执行忽略文件
 * - .prettierrc      prettier 配置文件
 ************************************************/
import { writeFileSync } from 'node:fs';
import { dataStore } from '../data-store';
import { gitIgnoreText } from '../data-store/gitIgnoreText';
import { prettierText } from '../data-store/prettierText';

/**
 * 导出 prettier 的相关配置文件
 *
 * 生成包含：
 * - .prettierignore  prettier 执行忽略文件
 * - .prettierrc      prettier 配置文件
 */
export function prettier(): void {
  // 写入 prettier ignore 忽略规则
  writeFileSync(dataStore.pkgFile('.prettierignore'), gitIgnoreText());

  writeFileSync(dataStore.pkgFile('.prettierrc'), prettierText());
}

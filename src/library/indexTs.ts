import { writeFileSync } from 'node:fs';
import data from '../data';

/** 导出生成 index.ts 文件  */
export function indexTs() {
  /// index.ts
  writeFileSync(
    data.fileName('index.ts'),
    `import './src/index';
/**  测试函数 
 * 
 *   仅做初始化后测试用
 *    
 *  @returns {@link undefined}
 */
export function testFunction() {
  console.log('**********************');
  console.log('测试函数打印内容');
  console.log('**********************');
  return;
}
  `,
  );
}

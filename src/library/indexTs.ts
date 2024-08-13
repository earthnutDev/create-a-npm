import { writeFileSync } from 'node:fs';
import data from '../data';

/** 导出生成 index.ts 文件  */
export function indexTs() {
  /// index.ts
  writeFileSync(data.fileName('index.ts'), `import './src/index.ts';`);
}

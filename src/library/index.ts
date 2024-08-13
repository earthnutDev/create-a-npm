import data from '../data';
import { pathJoin } from 'a-node-tools';
import { mkdirSync, writeFileSync } from 'node:fs';
/**
 * 导出生成 src 的主文件
 */

export function src() {
  /// index.ts
  writeFileSync(
    data.fileName('index.ts'),
    `import { _p } from 'a-node-tools';\n _p('hello world');`,
  );

  // 创建文件
  mkdirSync(pathJoin(data.cwd, 'src'));
  //
  writeFileSync(
    data.fileName('src/index.ts'),
    `import { _p } from 'a-node-tools';
// print 'hello ${data.name} on the terminal'  
_p(\`hello , ${data.name}\`)`,
  );
}

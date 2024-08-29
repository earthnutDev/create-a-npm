import { writeFileSync } from 'node:fs';
import data from '../data';

/**  */
export function srcIndexTs() {
  writeFileSync(
    data.fileName('src/index.ts'),
    `import { _p } from 'a-node-tools';

// print 'hello ${data.name} on the terminal'
// 向终端输出 "你好 ${data.name}"
_p('welcome ${data.name}');
`,
  );
}

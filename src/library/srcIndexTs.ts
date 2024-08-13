import { pathJoin } from 'a-node-tools';
import { mkdirSync, writeFileSync } from 'node:fs';
import data from '../data';

/**  */
export function srcIndexTs() {
  mkdirSync(pathJoin(data.cwd, 'src'));

  writeFileSync(
    data.fileName('src/index.ts'),
    `import { _p } from 'a-node-tools';
    
_p('welcome ${data.name}');
`,
  );
}

import { writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';

/**  构建嵌套的读我  */
export function createReadMe() {
  writeFileSync(
    dataStore.rangeFile('README.md'),
    `# 你会更改这里的内容的
    
毕竟，我猜你有很多话要说
记录下来，哪怕不会有人看见
  `,
  );
}

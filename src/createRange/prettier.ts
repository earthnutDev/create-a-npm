import { writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';
import { gitIgnoreText } from '../data-store/gitIgnoreText';
import { prettierText } from '../data-store/prettierText';

/**  构建美化  */
export function prettier() {
  writeFileSync(dataStore.rangeFile('.prettierrc'), prettierText());

  writeFileSync(dataStore.rangeFile('.prettierignore'), gitIgnoreText());
}

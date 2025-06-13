import { gitIgnoreText } from '../data-store/gitIgnoreText';
import { writeFileSync } from 'node:fs';
import { dataStore } from '../data-store';

/**  写入 gitignore  */
export function gitIgnore() {
  writeFileSync(dataStore.rangeFile('.gitignore'), gitIgnoreText());
}

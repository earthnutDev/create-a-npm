import { writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';
import { gitIgnoreText } from '../data-store/gitIgnoreText';

/**  写入 gitignore  */
export function gitIgnore() {
  writeFileSync(dataStore.pkgFile('.gitignore'), gitIgnoreText());
}

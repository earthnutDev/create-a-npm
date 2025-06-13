import { writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';
import { eslintText } from '../data-store/eslintText';

/**  eslint 的配置  */
export function eslintConfig() {
  writeFileSync(dataStore.pkgFile('eslint.config.js'), eslintText());
}

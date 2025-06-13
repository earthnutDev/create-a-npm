import { eslintText } from '../data-store/eslintText';
import { writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';

/**  eslint 的配置  */
export function eslintConfig() {
  writeFileSync(dataStore.rangeFile('eslint.config.js'), eslintText());
}

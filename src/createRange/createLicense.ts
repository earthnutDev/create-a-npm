import { writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';
import { licenseText } from 'src/data-store/licenseText';

/**  构建  */
export function createLicense() {
  writeFileSync(dataStore.rangeFile('LICENSE'), licenseText());
}

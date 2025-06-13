import { writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';
import { licenseText } from 'src/data-store/licenseText';

/**  license  */
export function createLicense() {
  writeFileSync(dataStore.pkgFile('LICENSE'), licenseText());
}

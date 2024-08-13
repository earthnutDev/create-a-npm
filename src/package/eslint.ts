import { writeFileSync } from 'node:fs';
import data from 'src/data';
/**
 * eslint 配置
 *
 */

export function eslintConfig(): void {
  writeFileSync(
    data.fileName('eslint.config.js'),
    `import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
];
`,
  );
}

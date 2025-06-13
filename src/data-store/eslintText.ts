import { dataStore } from '.';

/**  构建 eslint 文本  */
export function eslintText() {
  const { dependencies: de } = dataStore.local;
  const mark = '++++';
  const prettier = de.includes('prettier');
  const typescript = de.includes('typescript');
  return `import globals from 'globals';
import pluginJs from '@eslint/js';
${prettier ? "import tseslint from 'typescript-eslint';" : mark}
${typescript ? "import eslintConfigPrettier from 'eslint-config-prettier';" : mark}
import jsdocPlugin from 'eslint-plugin-jsdoc';

export default [
  { files: ['**/*.{js,mjs,cjs${typescript ? '.ts' : ''}}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ${typescript ? '...tseslint.configs.recommended,' : mark}

  {
    plugins: {
      jsdoc: jsdocPlugin,
    },
    rules: {
      // 基础规则
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': [
        'error',
        {
          // 配置允许的标签
          definedTags: ['packageDocumentation'],
        },
      ],
      'jsdoc/check-types': 'error',

      ${
        typescript
          ? `
          // TypeScript 适配规则
        'jsdoc/no-types': 'error',
        'jsdoc/require-param-type': 'off', // 使用 TS 类型
        'jsdoc/require-returns-type': 'off', // 使用 TS 类型`
          : ''
      }

      // 文档质量规则
      'jsdoc/require-description': [
        'error',
        {
          contexts: ['TSInterfaceDeclaration', 'TSTypeAliasDeclaration'],
        },
      ],
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
    },
  },
  ${prettier ? 'eslintConfigPrettier,' : mark}
];
`.replace(/\+{3,}\n?/gm, '');
}

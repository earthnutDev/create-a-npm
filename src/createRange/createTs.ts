import { writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';

/**  构建多层包与 ts 相关的  */
export function createTs() {
  writeFileSync(
    dataStore.rangeFile('tsconfig.json'),
    `{
  "extends": "./tsconfig.base.json",
  "include": [
    "packages/**/index.ts",
    "packages/**/src/**/*.ts",
    "packages/**/eg/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "packages/**/node_modules",
    "packages/**/**/*.test.ts",
    "jest.setup.ts"
  ]
}
`,
  );

  writeFileSync(
    dataStore.rangeFile('tsconfig.base.json'),
    `{
  "compilerOptions": {
    "baseUrl": ".",
    "jsx": "preserve",
    "strict": false,
    "target": "ESNext",
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    "lib": ["ESNext", "DOM"],
    "sourceMap": false
  }
}
`,
  );
}

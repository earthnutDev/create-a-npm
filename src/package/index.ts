import { eslintConfig } from './eslint';
import { packageJson } from './package';
import { prettier } from './prettier';
import { readme } from './readme';
import { rollup } from './rollup';
import { tsconfigJson } from './tsconfig';

/**
 *
 * 导出 package 的主文件
 */
export function packageIndex() {
  packageJson();

  tsconfigJson();

  rollup();

  readme();

  eslintConfig();

  prettier();
}

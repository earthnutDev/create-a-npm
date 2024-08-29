import { writeFileSync } from 'node:fs';
import data from 'src/data';

/** 当前的时间  */
const now = new Date();

/** 月份  */
const month = now.getMonth() + 1;
/** 日期  */
const day = now.getDate();
/** 年份  */
const year = now.getFullYear();

/**
 * 导出生成一些琐碎而又必须的文件
 */
export function readme(): void {
  /// readme.md
  writeFileSync(data.fileName('README.md'), `# ${data.name}`);
  /// 自述文件.md
  writeFileSync(data.fileName('自述文件.md'), `# ${data.name}`);

  /// changeLog.md
  writeFileSync(
    data.fileName('CHANGELOG.md'),
    `# ${data.name}\n\n## 0.0.0 (${month} 月 ${day} ${year} 年)\n\n- 初始化项目`,
  );

  /// LICENSE
  license();

  /// 生成 .gitignore 文件
  writeFileSync(
    data.fileName('.gitignore'),
    `node_modules

**/node_modules

## 打包文件

dist

test/out

.DS_Store`,
  );
}

/** 导出生成 license 文件  */
export function license(): void {
  writeFileSync(
    data.fileName('LICENSE'),
    `Copyright (c) <${year}> <${data.name}>
    
    Permission to use, copy, modify, and/or distribute this software for any  
    purpose with or without fee is hereby granted, provided that the above  
    copyright notice and this permission notice appear in all copies.
    
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES  
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF  
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR  
    ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES  
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN  
    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF  
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`,
  );
}

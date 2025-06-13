import { mkdirSync, writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';

/**  创建 github action  */
export function createAction() {
  const dir = '.github/workflows';
  // 创建外层目录
  mkdirSync(dataStore.rangeFile(dir), { recursive: true });
  writeFileSync(
    dataStore.rangeFile(dir, '发布.yml'),
    `name: 发布到 npm
on:
  push:
    branches: '*'
    paths:
      - 'packages/**' # 主包更新
      - 'package.json' # 全局依赖

  workflow_dispatch: # 手动触发
    inputs:
      version:
        description: '触发原因（选填）'
        required: false
        default: '手动触发'
      ref:
        description: '分支（选填）'
        required: false
        default: ''
        type: string
      package:
        description: '子包'
        required: true
        type: choice
        options:
          - core
          - all
        default: 'all'

jobs:
  pub:
    # 在提交的代码包含 \`version\` 字样时才运行该动作
    # 或者手动触发
    name: |
      发布到 npm
    runs-on: ubuntu-latest
    permissions:
      packages: write
      contents: write
      id-token: write
    # 复合条件判断（自动触发检查提交信息，手动触发直接放行）
    # contains 函数
    # startsWith 函数
    # endsWith 函数
    if: |
      (github.event_name == 'push' && startsWith(github.event.head_commit.message, 'version')) ||
      github.event_name == 'workflow_dispatch'
    steps:
      - name: 代码检出
        uses: actions/checkout@v4
        with:
          ref: \${{ github.event.inputs.ref || github.ref_name }}
          fetch-depth: 0

      - name: 初始化 Node 并设定 Node 版本
        uses: actions/setup-node@v4
        with:
          node-version: 22.x
          registry-url: https://registry.npmjs.org

      - name: 安装全局依赖
        run: |
          npm ci
          cd scripts
          chmod +x detect_changes.sh workflow_dispatch.sh pub.sh
          # chmod +x scripts/detect_changes.sh
          # chmod +x scripts/workflow_dispatch.sh
          # chmod +x scripts/pub.sh

      - name: 检测子包变更情况（推送代码时触发）
        if: github.event_name == 'push'
        id: detect-changes
        run: |
          ./scripts/detect_changes.sh

      - name: 检测子包变更情况（手动触发时触发）
        if: github.event_name == 'workflow_dispatch'
        id: workflow-changes
        env:
          INPUT_PACKAGE: \${{ github.event.inputs.package }}
        run: |
          ./scripts/workflow_dispatch.sh

      - name: 设置工作根路径
        run: |
          echo "REPO_ROOT=$(pwd)" >> $GITHUB_ENV

      - name: 发布到 npm
        if: \${{ env.update_packages && env.update_packages != '' }}
        env:
          NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
          UPDATE_PACKAGES: \${{ env.update_packages }}
          REPO_ROOT: \${{ env.REPO_ROOT }}
        run: |
          ./scripts/pub.sh

  `,
  );
}

---
name: study-kanban skill 优化与产物同步
overview: 对齐 study-kanban skill 的 template 与 output/_example 两份产物，消除二者代码分裂；并在 SKILL.md 中补充被遗漏的渲染行为与 OPFS 兜底说明，明确以 WorkBuddy 源文件为视觉基准。
todos:
  - id: sync-example-files
    content: 用 template 覆盖 output/_example 的 index.html、app.js、style.css（保留 data.js）
    status: completed
  - id: verify-example-render
    content: 浏览器验证 _example 多主题切换、卡片点击与进度持久化正常
    status: completed
    dependencies:
      - sync-example-files
  - id: update-skill-md
    content: 补全 SKILL.md：OPFS 说明、explain/link 渲染、整卡点击措辞、WorkBuddy 基准、同步约定
    status: completed
  - id: final-diff-check
    content: 对比 _example 与 template 结构一致，确认文档与代码无分裂
    status: completed
    dependencies:
      - sync-example-files
      - update-skill-md
---

## 用户需求

审查 `study-kanban` skill 目录，找出并修复当前存在的优化点，使 skill 的模板、示例产物与文档保持一致、可靠。

## 产品概述

`study-kanban` 是一个将文档/主题/粘贴材料转换为独立学习看板 HTML 的 skill，视觉风格 1:1 对齐 WorkBuddy 学习看板，使用固定 5 阶段框架（入门→基础→进阶→实战→精通）。审查目标是消除模板与示例产物的代码分裂，并补全 SKILL.md 遗漏的能力说明。

## 核心问题

- **代码分裂（最关键）**：`template/` 已升级（新增 OPFS 兜底持久化、将 `TYPE_LABELS` 抽到 data.js、动态多主题菜单、卡片整块点击切换完成态等），但 `output/_example/` 仍为旧版，二者不同步，示例无法代表真实生成结果。
- **文档遗漏**：SKILL.md 未记录 OPFS 兜底能力、未说明 `explain`/`link` 的渲染行为、卡片点击措辞与实际交互不一致、未声明 WorkBuddy 源文件为视觉对齐基准。

## 技术栈

- 纯静态前端：HTML + 原生 JavaScript（ES5/ES6）+ CSS，无构建步骤、无外部依赖。
- 持久化：localStorage 为主，OPFS（Origin Private File System）为 file:// 下的强兜底。
- 模板驱动：`template/` 为 golden reference，`output/_example/` 为演示产物。

## 实现策略

核心策略是「以 `template/` 为唯一可信源，覆盖同步 `output/_example/` 并补全文档」，避免引入新架构或新依赖。不新增功能，只消除分裂与补齐说明，遵循 YAGNI 与最小改动原则。

### 关键决策与理由

1. **用 template 覆盖 _example（而非反向）**：template 已包含 OPFS 兜底、TYPE_LABELS 外置、整卡点击等增强，是更完整、更正确的版本，应为基准。
2. **_example 的 data.js 保留**：示例数据是独立的演示用多主题数据，与模板占位符不同，不应被 `const boards = __BOARDS_DATA__;` 覆盖；仅同步 index.html / app.js / css。
3. **CSS 同步用整体覆盖**：template/css/style.css 含被 app.js 使用的新变量（如 `--col-color` 渲染、`.persist-warning` 等），_example/css 旧版可能缺失，直接覆盖最安全。
4. **SKILL.md 补 4 处**：OPFS 说明、item 字段渲染行为、`explain`/`link` 行为、WorkBuddy 视觉基准声明、卡片「整卡点击」措辞统一、模板改版须同步产物的维护约定。

### 性能与可靠性

- OPFS 读写为异步，主路径仍是同步 localStorage，保证首屏可见、关浏览器进度可恢复；同步 _example 后示例也能演示该能力。
- 覆盖操作仅替换文件内容，不改变目录结构，blast radius 限于 `output/_example/` 与 `SKILL.md`。

## 实现注意事项

- 覆盖 `output/_example/js/app.js` 时，确认其不再依赖内联 `TYPE_LABELS`（template 的 data.js 已提供）；_example/data.js 已含 `TYPE_LABELS`，无需改动。
- 覆盖后手动核对 `_example/index.html` 的占位与结构应与 template 一致（aside 结构、toolbar、动态菜单容器 `menuGroupsContainer`、boardsContainer）。
- SKILL.md 修改保持与现有章节风格一致，不重构整体结构。

## 架构设计

```
study-kanban/
├── template/                # golden reference（已正确，作为基准）
│   ├── index.html
│   ├── js/app.js            # 含 OPFS、动态菜单、整卡点击
│   ├── js/data.js           # 占位 __BOARDS_DATA__ + TYPE_LABELS
│   └── css/style.css
├── output/_example/         # 演示产物（须同步为 template 的填充版）
│   ├── index.html           # [MODIFY] 覆盖为 template 结构 + 示例标题
│   ├── js/app.js            # [MODIFY] 覆盖为 template 版本
│   ├── js/data.js           # [KEEP]   保留演示数据
│   └── css/style.css        # [MODIFY] 覆盖为 template 版本
└── SKILL.md                 # [MODIFY] 补全说明 + 维护约定
```

## 目录结构与文件注解

```
.codebuddy/skills/study-kanban/
├── template/index.html                      # [基准] 只读参考，无需改动
├── template/js/app.js                       # [基准] 只读参考，无需改动
├── template/js/data.js                      # [基准] 只读参考，无需改动
├── template/css/style.css                   # [基准] 只读参考，无需改动
├── output/_example/index.html               # [MODIFY] 用 template/index.html 结构覆盖；保留示例标题「示例学习看板」与副标题，菜单容器/toolbar 结构须与 template 一致
├── output/_example/js/app.js                # [MODIFY] 整体覆盖为 template/js/app.js；该文件不含数据，可安全覆盖，继承 OPFS/动态菜单/整卡点击
├── output/_example/js/data.js               # [KEEP]   保留现有多主题演示数据与 TYPE_LABELS，不覆盖
├── output/_example/css/style.css            # [MODIFY] 整体覆盖为 template/css/style.css，确保含 --col-color、.persist-warning 等新样式
└── SKILL.md                                 # [MODIFY] 见下方「SKILL.md 修改点」
```

### SKILL.md 修改点

- 「When to use / Workflow」中卡片交互统一为「点击整张卡片切换完成态」（原「点击勾选框」措辞）。
- 「Knowledge-point item shape」补充：`explain` 渲染为卡片内「通俗讲解」区块；`link` 为空时卡片不显示「查看文档 →」且左侧菜单该项渲染为不可跳转静态项。
- 「Constraints / notes」新增 OPFS 兜底说明：file:// 下 localStorage 不可用时自动回退 OPFS，关浏览器仍可恢复进度。
- 「Design principles」开头明确声明 WorkBuddy 源文件（`WorkBuddy/workbuddy-learning-board.html` 及 css/js）是 1:1 视觉对齐唯一基准，修改 template 须对照。
- 末尾新增维护约定：template 改版后须同步覆盖 `output/_example/` 对应文件（data.js 除外）。

## 验证方式

- 用浏览器打开 `output/_example/index.html`，确认两主题菜单可切换、卡片点击可勾选、进度刷新后保留（localStorage）。
- 对比 `output/_example/` 与 `template/` 的 index.html/app.js/css 三文件结构一致（diff 仅标题/示例数据差异）。
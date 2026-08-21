---
name: study-kanban-skill-optimization
overview: 修复 study-kanban skill 模板中阻断看板渲染的 bug 及文档/实现不一致问题，确保生成的独立 HTML 能正常显示多/单主题看板、进度持久化、链接行为合理。
todos:
  - id: fix-render-crash
    content: 修复 renderBoard 自动创建 .board 容器，消除看板空白崩溃
    status: completed
  - id: move-typelabels
    content: 将 TYPE_LABELS 从 data.js 迁移到 app.js
    status: completed
    dependencies:
      - fix-render-crash
  - id: hide-empty-link
    content: 空 link 时隐藏卡片与菜单的查看文档链接
    status: completed
    dependencies:
      - fix-render-crash
  - id: clean-css
    content: 删除无效 .menu-link-text 规则并改为 .menu-link.done 删除线
    status: completed
    dependencies:
      - fix-render-crash
  - id: verify-legend-style
    content: 用 [skill:lsp-code-analysis] 确认 WorkBuddy 图例样式并统一或澄清
    status: completed
  - id: align-skill-md
    content: 用 [skill:skill-creator] 校验并修正 SKILL.md 描述一致性
    status: completed
    dependencies:
      - move-typelabels
      - verify-legend-style
  - id: ignore-output
    content: 在 .gitignore 忽略 output/ 产物避免发布填充态
    status: completed
---

## 用户需求

检查并优化 `study-kanban` skill（位于 `.codebuddy/skills/study-kanban`），修复已发现的缺陷并提升质量。

## 产品概述

`study-kanban` 是一个将链接/主题描述/粘贴资料转换为独立 HTML 学习看板的 skill，视觉 1:1 复制 WorkBuddy 学习板，固定 5 阶段框架，支持单/多主题切换与进度持久化。本次优化聚焦修复阻断性渲染 bug 及文档/实现不一致问题。

## 核心特性（待修复点）

- 修复看板完全空白的阻断性 bug：模板缺少 `.board` 容器，导致 `renderBoard` 调用 `document.getElementById(cfg.boardId)` 返回 null 崩溃。
- 将 `TYPE_LABELS` 从 `data.js` 迁移到 `app.js`，使 `data.js` 仅保留 `boards` 注入点，与 SKILL.md 描述一致。
- 空 `link` 时隐藏"查看文档"链接，避免点击跳页面顶部。
- 删除/修正 `style.css` 中引用不存在的 `.menu-link-text` 的无效规则，改为对 `.menu-link.done` 直接加删除线。
- 统一图例与卡片 tag 视觉（确认 WorkBuddy 实际样式后决定是否将图例 dot 改为浅底深字）。
- 规范 `output/_example/` 示例产物管理，避免干扰"模板保持未填充"约束。

## 技术栈

- 纯静态 HTML + 原生 CSS + 原生 JavaScript（无框架、无构建步骤），与现有模板一致。
- 进度持久化：`localStorage` 为主，`OPFS` 为 `file://` 兜底（已实现）。

## 实现方案

### 总体策略

在不改变视觉语言、5 阶段框架、数据结构的前提下，修复渲染链路与文档/实现偏差。核心改动是让 `renderBoard` 在 `boardsContainer` 内自动创建并挂载对应 `id` 的 `.board` 元素，使现有 `getElementById(cfg.boardId)` 不再返回 null。

### 关键技术决策

1. **渲染崩溃修复（P0）**：在 `renderBoard(id)` 开头判断 `document.getElementById(cfg.boardId)`，若不存在则 `const el = document.createElement('div'); el.className='board'; el.id=cfg.boardId; el.hidden=true; boardsContainer.appendChild(el);`，再写入 `innerHTML`。此方案零 HTML 结构改动、向后兼容，且不破坏 `switchBoard` 的 `.hidden` 互斥逻辑。
2. **TYPE_LABELS 迁移（P1）**：从 `data.js` 删除 `const TYPE_LABELS={...}`（第15-21行），在 `app.js` 顶部 `BOARDS` 构建前定义同对象。保持 `data.js` 仅含 `boards = __BOARDS_DATA__`，与 SKILL.md"type-label map 由 app.js 处理"一致。
3. **空链接处理（P1）**：`renderBoard` 渲染卡片时，若 `!item.link` 则不输出 `<a class="card-link">`；`safeLink` 保持原样作为兜底。菜单链接 `menu-link` 同样在 `link` 为空时 `href="#"` 改为 `href="javascript:void(0)"` 或移除跳转（避免跳顶），但优先隐藏更干净——统一在 `link` 为空时不渲染跳转属性。
4. **无效 CSS 清理（P1）**：删除 `style.css` 第196行 `.menu-link.done .menu-link-text { text-decoration: line-through; }`，改为 `.menu-link.done { text-decoration: line-through; }`（对整条链接生效）。
5. **图例视觉（P2，需参考 WorkBuddy）**：先用 `lsp-code-analysis`/读取 WorkBuddy 源码确认其图例 dot 是实心还是浅底深字。若 WorkBuddy 图例为实心色块，则保持现状（卡片 tag 浅底与图例实心并存是 WorkBuddy 原样），仅需在 SKILL.md 澄清"图例 dot 实心、卡片 tag 浅底"；若 WorkBuddy 图例也浅底，则统一图例为浅底深字。
6. **示例产物管理（P2）**：`output/_example/` 为生成产物，应从 skill 发布包中排除。方案：在 skill 目录或仓库根 `.gitignore` 追加忽略 `.codebuddy/skills/study-kanban/output/`（保留目录结构但忽略内容），或将其移出 skill 目录。优先 `.gitignore` 忽略，避免误提交填充态模板。

### 性能与可靠性

- 渲染改动仅在初始化时执行一次，无运行时开销；事件委托不变，无额外监听。
- `TYPE_LABELS` 迁移不影响持久化逻辑；`safeLink`/空链接判断在字符串拼接阶段完成，无 DOM 回归。

## 实现备注

- 严格保持 `css/style.css` 的 `:root` 设计 token、渐变、卡片 `min-height:210px`、进度环 `conic-gradient` 等视觉常量不变。
- `app.js` 改动后须保证 `singleBoard`（单主题）路径仍正常：`renderMenuGroups` 隐藏菜单区、`switchBoard` 显示唯一 board。
- 不要"修复"模板的占位符（`__BOARDS_DATA__` / `__BOARD_TITLE__` / `__BOARD_SUBTITLE__`），它们必须保持未填充态。

## 架构设计

本次为就地修复，不引入新架构。数据流保持：`boards`(data.js) → `BOARDS` 配置对象(app.js) → `renderBoard`/`renderMenuGroups` 渲染 → 事件委托更新 `progressStore` → `saveProgress`(localStorage+OPFS)。仅补全 `renderBoard` 中缺失的 `.board` 容器创建环节。

## 目录结构

```
.codebuddy/skills/study-kanban/
├── SKILL.md                                    # [MODIFY] 澄清图例视觉描述（实心dot vs 浅底tag），与实现对齐；确认 TYPE_LABELS 归属 app.js 的描述已准确。
├── template/
│   ├── index.html                             # [MODIFY] 保持现状即可（boardsContainer 由 JS 动态填充 .board）；无需新增静态元素。
│   ├── js/
│   │   ├── data.js                            # [MODIFY] 删除 TYPE_LABELS 定义，仅保留 boards 注入点。
│   │   └── app.js                             # [MODIFY] 1) 顶部新增 TYPE_LABELS；2) renderBoard 自动创建并挂载 .board 容器；3) 空 link 时不渲染 card-link 与 menu-link 跳转。
│   └── css/
│       └── style.css                          # [MODIFY] 删除无效 .menu-link-text 规则，改为 .menu-link.done 删除线；按需统一图例视觉。
└── output/
    └── _example/                              # [处理] 通过 .gitignore 忽略 output/ 产物，避免随 skill 发布填充态文件。
```

## 关键代码结构（可选）

```js
// app.js 顶部新增（从 data.js 迁移）
const TYPE_LABELS = {
  'reading':  '阅读理解',
  'hands-on': '动手实操',
  'practice': '练习巩固',
  'mastery':  '综合应用'
};

// renderBoard 开头补全容器
function renderBoard(id) {
  const cfg = BOARDS[id];
  let board = document.getElementById(cfg.boardId);
  if (!board) {
    board = document.createElement('div');
    board.className = 'board hidden';
    board.id = cfg.boardId;
    document.getElementById('boardsContainer').appendChild(board);
  }
  // ... 原有 html 拼接与 board.innerHTML = html
}
```

## Agent Extensions

### Skill

- **skill-creator**
- 用途：参考官方 skill 编写规范，校验 SKILL.md 的 frontmatter、工作流描述与模板实现是否一致，确保优化后的 skill 符合最佳实践。
- 预期结果：SKILL.md 描述与模板代码完全一致，无误导生成流程的偏差。
- **lsp-code-analysis**
- 用途：定位 WorkBuddy 项目中图例（legend）的实际渲染样式（实心色块还是浅底深字），以决定 study-kanban 图例是否需统一。
- 预期结果：明确 WorkBuddy 图例视觉，据此决定 style.css 与 SKILL.md 的图例处理方案。
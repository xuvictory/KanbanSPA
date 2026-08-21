---
name: study-kanban-optimization
overview: 优化 study-kanban skill，使其支持「链接」或「文字（主题/素材）」两种输入，强制采用「入门→基础→进阶→实战→精通」标准五阶段框架，并为每个知识点新增「通俗讲解」字段以适配小白从入门到精通、知识全面无遗漏的学习需求。
design:
  architecture:
    framework: html
  styleKeywords:
    - 蓝色渐变
    - 卡片化看板
    - 玻璃拟态进度环
    - 浅底深字标签
    - 引用式讲解块
    - 横向滚动列
  fontSystem:
    fontFamily: PingFang SC
    heading:
      size: 22px
      weight: 600
    subheading:
      size: 15px
      weight: 500
    body:
      size: 14px
      weight: 400
  colorSystem:
    primary:
      - "#3b82f6"
      - "#14b8a6"
      - "#8b5cf6"
      - "#f59e0b"
      - "#ec4899"
    background:
      - "#f5f7fa"
      - "#ffffff"
    text:
      - "#1e293b"
      - "#64748b"
    functional:
      - "#2563eb"
      - "#ef4444"
      - "#10b981"
todos:
  - id: update-skill-md
    content: 重构 SKILL.md：双输入分支、强制五阶段、explain 字段与知识全面约束，并用 [skill:skill-creator] 校验规范
    status: completed
  - id: extend-data-js
    content: 更新 template/js/data.js 注释与字段示例，补充 explain 说明
    status: completed
    dependencies:
      - update-skill-md
  - id: render-explain
    content: 修改 template/js/app.js 卡片渲染，条件插入 explain 区块并转义
    status: completed
    dependencies:
      - extend-data-js
  - id: style-explain
    content: 在 template/css/style.css 新增 .card-explain 引用样式，保持视觉一致
    status: completed
    dependencies:
      - render-explain
  - id: update-example
    content: 更新 output/_example/js/data.js 为五阶段+explain 示例数据验证渲染
    status: completed
    dependencies:
      - render-explain
---

## 用户需求

优化 study-kanban skill，使其能根据「链接」或「一段文字描述（主题或已有素材）」自动生成学习看板，并按阶段归档，内容适合零基础小白从入门到精通系统学习，且知识点全面无遗漏。

## 产品概述

一个 CodeBuddy 技能（skill），根据用户输入（URL 链接 / 主题描述文字 / 已有素材文字），输出一份自包含、可双击打开的 HTML 学习看板。看板采用固定的五阶段框架（入门 → 基础 → 进阶 → 实战 → 精通），每个知识点卡片用大白话「通俗讲解」，整体视觉与 WorkBuddy 学习看板 1:1 一致。

## 核心功能

- 双输入兼容：自动识别链接（走 WebFetch 抓取）与文字（主题或素材直接解析）两种输入形态
- 强制标准五阶段：所有主题统一套用「入门 / 基础 / 进阶 / 实战 / 精通」阶段框架，阶段顺序与定位固定
- 小白友好讲解：每个知识点新增「通俗讲解」字段，用大白话解释是什么、为什么、怎么用
- 知识全面无遗漏：生成时强制覆盖主题基础前置知识与各阶段必备模块，避免缺漏
- 自包含看板：沿用现有模板渲染逻辑，新增 explain 字段展示，视觉风格保持不变

## 技术栈

- 技能定义：Markdown（SKILL.md frontmatter + 工作流描述）
- 模板技术：原生 HTML + CSS + 原生 JavaScript（无框架，保持自包含、双击可开）
- 数据载体：单文件 `js/data.js` 注入 `stages` 数组；进度持久化 `localStorage`
- 视觉规范：沿用现有 style.css 的 WorkBuddy 1:1 设计 token，仅增量新增 explain 样式

## 实现方案

### 总体策略

在不破坏现有模板「未填充」约束与视觉一致性的前提下，做三类改动：

1. **SKILL.md 工作流重构**：输入识别分支（链接 / 文字）+ 强制五阶段框架 + 新增 explain 字段与「小白友好、知识全面」内容约束。
2. **模板字段扩展示例**：data.js 注释补充 explain；app.js 渲染新增 explain 区块；style.css 新增 `.card-explain` 样式。
3. **示例数据更新**：output/_example 演示新字段（可选但建议，便于验证渲染）。

### 关键技术决策

- **输入识别**：在 Step 1 判断是否为合法 URL（`/^https?:\/\//`），是则走 WebFetch，否则视为文字输入（主题或素材），直接由 AI 解析构建大纲。两种路径在 Step 3 汇合到同一「标准五阶段」结构，避免双套模板。
- **强制五阶段而非自适应**：用户明确要求固定框架（入门/基础/进阶/实战/精通），因此废弃原「自适应阶段数量」逻辑，改为固定 5 列，subtitle 固定体现阶段定位（如「零基础起步 · 入门」）。
- **explain 字段位置**：放在 `desc`（一句话描述）与 `验收标准` 之间，作为「大白话讲解」引用块，视觉层级低于标题、高于验收标准，便于小白先理解再看验收。
- **知识全面性约束**：在 SKILL.md 增加生成检查清单——必须包含该主题的概念定义、前置环境/工具、核心语法/API、典型坑与调试、综合项目、进阶优化，且「入门」阶段须含零基础也能懂的比喻与最小可行路径。

### 性能与可靠性

- 模板渲染仍 O(stages × items)，规模可控；explain 为纯文本节点，无额外网络请求。
- 沿用现有 `escapeHtml` 防止注入；explain 同样经 `textContent` 或 escapeHtml 输出，避免 XSS。
- 进度 key 不变，不影响已有看板数据。

## 实现注意事项

- 模板 `js/data.js` 必须保持 `const stages = __STAGES_DATA__;` 占位符，仅改注释，绝不硬编码示例数据。
- index.html 占位符 `__BOARD_TITLE__` / `__BOARD_SUBTITLE__` 保持不变，subtitle 文案模板改为体现五阶段总览。
- style.css 只新增 `.card-explain`，不改动既有 `--tag-*`、column、card 结构，保证 1:1 视觉一致。
- app.js 渲染逻辑仅在 card.innerHTML 中插入 explain 区块（条件渲染：`item.explain` 存在才显示），对无该字段的既有数据向后兼容。

## 架构设计

现有单看板架构不变，数据流：用户输入 → SKILL 工作流（抓取/解析 → 五阶段结构化）→ 注入 template 的 `stages` → app.js 渲染 columns/cards（含 explain）→ 浏览器展示 + localStorage 进度。

## 目录结构

```
.codebuddy/skills/study-kanban/
├── SKILL.md                       # [MODIFY] 重构工作流：双输入分支、强制五阶段框架、explain 字段定义、小白友好与知识全面性约束、更新 description 触发语
├── template/
│   ├── index.html                 # [保持] 占位符不变（subtitle 文案约定在 SKILL 描述，模板无需改）
│   ├── css/style.css              # [MODIFY] 新增 .card-explain 引用块样式（浅灰底/左侧强调边/小字号），不破坏现有 token
│   └── js/
│       ├── data.js               # [MODIFY] 占位注释补充 explain 字段说明，结构示例新增 explain
│       └── app.js                # [MODIFY] 卡片渲染在 desc 与 验收标准 间条件插入 explain 区块，沿用 escapeHtml
└── output/_example/
    └── js/data.js                 # [MODIFY] 示例数据更新为五阶段 + 含 explain 字段，演示小白讲解效果
```

## 关键代码结构

item 字段 shape（更新后）：

```js
{
  title: "知识点标题",
  type:  "reading" | "hands-on" | "practice" | "mastery",
  desc:  "一句话描述学习者将理解或做到什么",
  explain: "用大白话解释：这是什么、为什么这样、怎么上手（面向零基础）",  // 新增
  criteria: "可观察、可验收的标准",
  link:  "https://... 原文锚点，fallback 到源 URL"
}
```

标准五阶段（固定 id/title/subtitle 模板）：

```js
[
  { id:1, title:"入门",   subtitle:"零基础起步 · 建立认知",   color:"#3b82f6" },
  { id:2, title:"基础",   subtitle:"核心概念与工具 · 打地基", color:"#14b8a6" },
  { id:3, title:"进阶",   subtitle:"深入原理与技巧 · 提升",   color:"#8b5cf6" },
  { id:4, title:"实战",   subtitle:"真实项目演练 · 应用",     color:"#f59e0b" },
  { id:5, title:"精通",   subtitle:"优化与扩展 · 融会贯通",   color:"#ec4899" }
]
```

## 设计风格

沿用 WorkBuddy 学习看板既有视觉语言（蓝色渐变 header、可折叠侧边栏、进度环、浅底深字 type 标签、横向滚动知识卡列），仅增量新增「通俗讲解」区块样式，保持整体 1:1 一致。

## 页面区块设计（单页看板）

- 顶部 Header：蓝紫渐变，左侧标题+副标题（体现五阶段总览），右侧玻璃拟态进度环。
- 图例行：四类型标签说明（阅读理解/动手实操/练习巩固/综合应用）。
- 工具栏：五阶段胶囊按钮（入门/基础/进阶/实战/精通）+ 一键全选/重置。
- 看板区：5 列横向滚动，每列顶部 3px 阶段色边框 + 阶段序号徽标 + 副标题 + 知识点计数。
- 知识卡片：勾选框+标题 → type 标签 → 一句话描述 → 通俗讲解（新增浅灰引用块，左侧强调边）→ 验收标准（左侧色块）→ 查看文档链接。
- 侧边栏：看板信息卡 + 返回顶部/重置进度，可折叠。

## 响应式与交互

- 桌面端横向滚动列；卡片 hover 微抬升；阶段胶囊 hover 高亮对应列；勾选即时更新进度环。
- explain 区块采用引用样式（浅底 + 左侧 3px 主色边 + 较小字号），与 desc/criteria 形成清晰视觉层次，提升小白可读性。

## Agent Extensions

### Skill

- **skill-creator**
- Purpose: 参考该技能关于「如何编写/更新有效 skill」的规范，确保 SKILL.md 的 frontmatter、description 触发语、工作流描述符合最佳实践。
- Expected outcome: SKILL.md 结构合规、触发语覆盖链接与文字两类输入、工作流清晰可执行。
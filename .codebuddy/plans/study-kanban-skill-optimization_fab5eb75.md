---
name: study-kanban-skill-optimization
overview: 修订 study-kanban skill 的 SKILL.md 文档与模板实现，使文档描述与实际 app.js/css 行为完全一致，补充 link 协议约束与 type 缺失兜底，并精简过长的 frontmatter description。
todos:
  - id: fix-menu-docs
    content: 修订 SKILL.md 左侧菜单交互描述，对齐 app.js 实际行为
    status: completed
  - id: add-link-constraint
    content: 在 SKILL.md item.link 注释补充 http(s) 协议约束
    status: completed
    dependencies:
      - fix-menu-docs
  - id: clarify-toolbar
    content: 在 SKILL.md toolbar 说明全选/重置仅作用于当前看板
    status: completed
    dependencies:
      - fix-menu-docs
  - id: appjs-type-fallback
    content: 修改 app.js 第 284 行，item.type 缺失回退 reading 并在 SKILL.md 注明
    status: completed
  - id: trim-description
    content: 精简 SKILL.md frontmatter description 保留核心触发短语
    status: completed
    dependencies:
      - fix-menu-docs
  - id: verify-skill
    content: 使用 [skill:skill-creator] 校验修订后 SKILL.md 规范与一致性
    status: completed
    dependencies:
      - fix-menu-docs
      - add-link-constraint
      - clarify-toolbar
      - appjs-type-fallback
      - trim-description
---

## 用户需求

检查并优化 `study-kanban` skill，使其 SKILL.md 文档描述与实际模板实现（app.js / css）完全一致，并提升模板健壮性。

## 产品概述

`study-kanban` 是一个 CodeBuddy skill，将链接 / 主题描述 / 粘贴资料转换为自包含的学习看板 HTML，复用 WorkBuddy 的蓝色渐变卡片式设计语言，固定 5 阶段框架，支持多主题切换看板。

## 核心优化点

- 修正 SKILL.md 左侧菜单交互描述，使其与实际「阶段分组始终展开、点击知识点链接跳转、点击一级菜单头切换看板」一致。
- 在 SKILL.md item shape 注释中补充 link 协议约束（仅允许 http/https）。
- 在 SKILL.md toolbar 描述中说明「全选 / 重置」按钮仅作用于当前可见看板。
- 在 app.js 中为缺失的 item.type 提供默认兜底（默认 reading），并在 SKILL.md 注明该兜底行为。
- 精简 SKILL.md frontmatter 的 description 字段，保留核心触发短语。

## 技术栈

- 纯静态前端：HTML + CSS + 原生 JavaScript（无框架、无构建）
- 持久化：localStorage 为主，OPFS 为 file:// 兜底
- 模板驱动：data.js 注入 `boards` 数组，app.js 配置驱动渲染

## 实现方案

本次为文档与模板健壮性修订，不改变视觉风格与数据流。策略：以已通读的 SKILL.md（271 行）、app.js（551 行）、css（549 行）为准，定向修正文档与一行兜底逻辑。

### 关键修订与理由

1. **SKILL.md 第 210-215 行（左侧菜单描述）**：当前文字暗示「点击 stage 展开子菜单」，但 app.js `renderMenuGroups`（357-397 行）生成的 `.menu-stage` 是静态常开展开分组，无折叠交互。修正为描述真实行为，避免 AI 生成时误加交互。
2. **SKILL.md 第 107 行（item.link 注释）**：app.js `safeLink`（246-250 行）仅放行 `^https?://`，其余变 `#`。需在注释中约束 link 必须为 http(s) 绝对链接。
3. **SKILL.md 第 65 行（toolbar 按钮）**：app.js `completeAll`/`resetAll`（332-354 行）只处理 `currentBoard`。补充「按钮仅作用于当前可见看板」，避免多主题下误解。
4. **app.js 第 284 行（type 兜底）**：`TYPE_LABELS[item.type] || item.type` 在 type 缺失时输出空字符串/undefined。改为 `TYPE_LABELS[item.type] || TYPE_LABELS['reading']`，保证渲染稳定；SKILL.md 注明模板兜底。
5. **SKILL.md frontmatter description（第 3-15 行）**：压缩为 3-4 行，保留核心触发短语（"把这个文档转成看板""根据链接生成学习看板""帮我整理 XX 的学习路线""做一个 study-kanban"），删去冗长举例。

### 性能与可靠性

- 仅修改文档文本与一行兜底，无新增渲染路径，零性能回归。
- 保持 `template/` 的 unfilled 约定（`__BOARDS_DATA__` 占位符不被硬编码），避免污染模板。

## 实现注意事项

- 修改 app.js 时仅改动第 284 行兜底取值，不触碰 OPFS / 滚动联动 / 多主题切换等既有逻辑。
- SKILL.md 修订须与实际代码行号及行为逐条对应，避免引入新的不一致。
- 视觉 token（`.legend-dot` / `.card-tag` 浅底深字）已确认一致，本次不改动 css。

## 架构设计

本次为单 skill 内局部修订，不涉及架构变化。修改目标：

- `SKILL.md`：文档对齐 + description 精简
- `template/js/app.js`：type 缺失兜底（一行）

## 目录结构

```
.codebuddy/skills/study-kanban/
├── SKILL.md              # [MODIFY] 修订左侧菜单交互描述、link 协议约束、toolbar 按钮范围说明、type 兜底注明；精简 frontmatter description
└── template/
    └── js/
        └── app.js        # [MODIFY] 第 284 行 item.type 缺失时回退到 'reading' 标签，保证渲染稳定
```

## Agent Extensions

### Skill

- **skill-creator**
- 用途：依据 skill 编写规范，校验 SKILL.md 结构（frontmatter、When to use、Workflow 等）修订是否符合最佳实践。
- 预期结果：确认修订后的 SKILL.md 符合 skill 编写规范，frontmatter description 精简后仍能正确触发。
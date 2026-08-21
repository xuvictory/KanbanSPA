---
name: study-kanban 左侧一级菜单加小图标
overview: 在 study-kanban skill 的左侧一级菜单标题前增加一个小图标。修改 template(模板 js/app.js 渲染逻辑 + css 样式)以保证后续生成的看板都自带图标,同时为 board 数据新增可选的 `icon` 字段(支持 emoji 或文本字符),缺省回退到一个通用 emoji。同步 SKILL.md 记录新字段。
todos:
  - id: pass-icon-field
    content: 在 app.js BOARDS 字典构造处透传可选的 board.icon 字段,未传时使用默认 emoji 兜底
    status: completed
  - id: render-icon
    content: 在 renderMenuGroups 渲染一级菜单时,于 menu-group-title 前注入 menu-group-icon span
    status: completed
    dependencies:
      - pass-icon-field
  - id: style-icon
    content: 在 style.css 中新增 .menu-group-icon 样式(尺寸/间距/对齐),并调整 .menu-group-title 让折叠箭头保持靠右
    status: completed
    dependencies:
      - render-icon
  - id: update-skill-doc
    content: 在 SKILL.md 的 board 对象示例与字段说明中补充可选 icon 字段及默认值说明
    status: completed
    dependencies:
      - style-icon
---

## Product Overview

为 study-kanban skill 的左侧一级菜单(每个学习主题/board 的标题,例如"示例主题 A"、"示例主题 B")添加小图标,提升多主题切换菜单的视觉辨识度与美观度。该功能作用于 skill 的输出模板,影响所有后续生成的看板页面。

## Core Features

- 在左侧一级菜单标题前渲染一个图标(emoji 或单字符)
- 支持为每个 board 在 `boards[*].icon` 字段单独配置图标,可选
- 未配置时使用统一的默认 emoji 兜底,确保每个一级菜单都有图标
- 图标与标题在 hover/active 状态下样式协调,与现有蓝色玻璃拟态风格统一
- 不影响菜单折叠/展开、看板切换等现有交互行为

## Tech Stack

- 仅修改 study-kanban skill 的 `template/` 模板层(`index.html` / `js/app.js` / `css/style.css`)
- 数据驱动:复用现有 `boards` 数组结构,新增可选字段 `icon`
- 无新增依赖,保持纯原生 HTML/CSS/JS 栈

## Implementation Approach

### 策略

复用现有 `renderMenuGroups()` 渲染逻辑,在 `menu-group-header` 内部、标题 span 之前插入一个图标 span,让外层 flex 容器自然把"图标 + 标题"挤到左侧,箭头靠右(`menu-group-title` 加 `margin-right:auto` 推箭头到右端)。

### 关键决策

1. **数据源**:在 `BOARDS` 字典构造处(`app.js` L15-31)把 `board.icon` 透传,未提供时使用 `📘` 作为统一默认 emoji —— 简单稳定,跨平台字体即可显示,无需引入图标字体或 SVG 资源。
2. **向后兼容**:`icon` 字段为可选,旧数据无此字段也不会出错。
3. **样式策略**:图标用 `font-size:14px` + `margin-right:8px` + `line-height:1`,与 `menu-group-title` 字号 13.5px 视觉协调。
4. **本地化**:emoji 渲染不依赖外网资源,模板完全自包含,符合"开箱即用"约束。

### 性能与可靠性

- 渲染只在 `renderMenuGroups()` 调用一次,无 N+1;图标作为静态 span 注入,无额外 IO。
- `escapeHtml` 对 icon 内容做转义,防止 XSS(emoji 不会被转义破坏,普通文本内容若误填也会被安全转义)。
- 不修改任何 board 切换、折叠、进度存储的逻辑,blast radius 极小。

## Architecture Design

仅修改模板层,不动数据流核心:

```
data.js (boards[].icon)  →  app.js BOARDS 字典透传 icon
                         →  renderMenuGroups() 注入 <span class="menu-group-icon">
                         →  style.css 控制图标尺寸/间距
```

## Directory Structure

```
.codebuddy/skills/study-kanban/
├── template/
│   ├── css/
│   │   └── style.css             # [MODIFY] 新增 .menu-group-icon 样式,调整 .menu-group-title 让箭头靠右
│   ├── js/
│   │   ├── app.js                # [MODIFY] BOARDS 字典透传 icon;renderMenuGroups 在标题前渲染图标 span
│   │   └── data.js               # (不变,占位符由生成流程注入 boards 数组)
│   └── index.html                # (不变,菜单由 app.js 动态渲染)
├── output/
│   └── _example/                 # (演示,模板改动后若想同步示例可重新生成,非必需)
└── SKILL.md                      # [MODIFY] 在 board 对象示例与字段说明处补充可选 icon 字段
```

## Implementation Notes

- 仅修改 template 与 SKILL.md,不动 `output/_example/`(可选后续同步,以保持示例与模板一致)。
- 使用 emoji 而非图标字体,避免引入外部 CDN/字体资源,保持"双击 index.html 即可打开"的自包含特性。
- 图标默认 `📘`;用户可按主题语义自行覆盖(如 SQL 用 🗄️、Python 用 🐍、前端用 🎨)。
- 不影响单主题模式(`singleBoard = true`):该模式下 `menuGroupsContainer` 被隐藏,不会渲染图标。
- `escapeHtml` 对 icon 文本做安全转义,即使误填 `<script>` 等也不会执行。
---
name: study-kanban
description: >-
  Convert a URL / documentation link, a topic or goal description, or pasted learning material into a
  self-contained study kanban board with WorkBuddy's blue-gradient card design and a fixed 5-stage
  framework (入门 → 基础 → 进阶 → 实战 → 精通), explained in plain language for beginners. Multi-topic input
  yields a multi-board layout. Trigger phrases: "把这个文档转成看板", "根据链接生成学习看板", "用一段文字生成看板",
  "帮我整理 XX 的学习路线", "做一个 study-kanban".
---

# study-kanban

Convert any learning input — a URL link, a topic/goal description, or pasted learning material — into a
self-contained, standalone HTML study-kanban board whose visual style is a 1:1 match with the WorkBuddy
learning board (blue-gradient header, collapsible sidebar, progress ring, type-tag legend, stage-pill
toolbar, horizontally-scrolling columns of knowledge-point cards).

The board ALWAYS uses a fixed 5-stage framework (入门 → 基础 → 进阶 → 实战 → 精通). Every knowledge point
is explained in plain language (a "通俗讲解" field) so a complete beginner can understand it. The content
aims to be comprehensive — covering prerequisites through advanced topics with no gaps — so a learner can
go from zero to mastery along one coherent path.

## When to use

- The user supplies a **single URL** (official site, docs page, tutorial, spec, learning material) and asks
  to turn it into a kanban / learning board.
- The user supplies a **topic or goal description** (e.g. "我想学 Python 爬虫做数据分析") with no source
  material — the skill builds the full learning path itself.
- The user supplies **pasted learning material** (notes / a tutorial / a bullet outline) and wants it
  reorganized into a staged, beginner-friendly kanban.
- The user asks to "generate a study kanban", "convert this doc into a board", "整理一个学习路线", or
  references `study-kanban` explicitly.
- The desired output is an independent HTML file that can be opened by double-click or lightly published,
  NOT just data injected into the existing WorkBuddy project.

## What this skill provides

- `template/` — a config-driven, data-injection kanban template (HTML + css/style.css + js/data.js +
  js/app.js) whose visuals are cloned from WorkBuddy. It renders ONE board when the input is a single
  topic, and MULTIPLE switchable boards (left-side menu per topic) when the input names several topics.
- This SKILL.md — the workflow that drives input → structured data → independent HTML.

## Design principles to preserve (must match WorkBuddy 1:1)

**Visual baseline (IMPORTANT):** the `WorkBuddy/` source files (`WorkBuddy/workbuddy-learning-board.html`
and its `css/` + `js/`) are the **single 1:1 visual reference** for this skill. Any change to
`template/` (HTML/CSS/JS) MUST be checked against the WorkBuddy source so the generated board stays
visually identical — do not diverge the design tokens, tag rendering, or layout from WorkBuddy.

Keep these exact visual tokens so the generated board is indistinguishable in style:

- Background `#f5f7fa`; primary blue `#3b82f6`; gradients: header `135deg #1e3a5f→#2563eb→#3b82f6`,
  sidebar `180deg #1e3a5f→#1e40af→#2563eb`.
- Column: width `220px`, top `3px` stage-color border (`--col-color`).
- Card: `min-height: 210px`, fields = checkbox+title, type tag, description, **通俗讲解 (new)**,
  验收标准 (left-border block), "查看文档 →" link.
- **Card interaction**: clicking **anywhere on the card** (not just the checkbox) toggles its done state,
  saves progress, and syncs the matching left-menu link. The checkbox is a visual indicator only.
- Four type tags (keep their colors even if a subset is used). **Rendering style matches WorkBuddy
  exactly: light background + dark text (NOT solid fill)** — so a tag reads as e.g.
  `reading` = bg `#dbeafe` / text `#2563eb`, `hands-on` = bg `#ccfbf1` / text `#0d9488`,
  `practice` = bg `#ede9fe` / text `#7c3aed`, `mastery` = bg `#fef3c7` / text `#b45309`.
  Do NOT change tag rendering to solid-fill.
- Progress ring: `conic-gradient` white over translucent; glassmorphism pill container.
- Stage pills in toolbar; legend row; one-click 全选 / 重置 buttons; collapsible sidebar.
  Note: 全选 / 重置 buttons operate on the **currently visible board only** (in a multi-board layout they
  do NOT affect the other boards' checkboxes).
- Legend: the four type labels render as the SAME light-bg/dark-text chips as the card tags (1:1 with
  WorkBuddy's `.legend-tag`), NOT solid color dots.

## Fixed 5-stage framework (MANDATORY)

Every board uses exactly these five stages, in this order, with these ids/titles/subtitles/colors.
Do NOT add, remove, reorder, or rename stages. Map the material's content into these five buckets —
when a topic has little to say at a given stage, still keep the column but fill it with the minimal
prerequisite / foundation knowledge a beginner needs there.

```js
[
  { id: 1, title: "入门",   subtitle: "零基础起步 · 建立认知",   color: "#3b82f6" },
  { id: 2, title: "基础",   subtitle: "核心概念与工具 · 打地基", color: "#14b8a6" },
  { id: 3, title: "进阶",   subtitle: "深入原理与技巧 · 提升",   color: "#8b5cf6" },
  { id: 4, title: "实战",   subtitle: "真实项目演练 · 应用",     color: "#f59e0b" },
  { id: 5, title: "精通",   subtitle: "优化与扩展 · 融会贯通",   color: "#ec4899" }
]
```

Stage intent (use as a guide when distributing items):

- **入门** — 让零基础也能迈出第一步：这是什么、能解决什么问题、学之前要准备什么（环境/账号/前置知识）、
  最小可行路径（跑通第一个 hello world / 看到第一个效果）。多用生活化比喻，避免一上来就堆术语。
- **基础** — 核心概念与日常工具：关键术语与心智模型、最常用语法/API/命令、基础工程结构/配置、如何运行与调试。
- **进阶** — 原理与技巧：内部机制、常见模式、性能/可读性相关的写法、典型坑与排查方法。
- **实战** — 真实项目演练：从需求拆解到完整实现，至少 1 个可运行项目，覆盖真实场景中的综合用法。
- **精通** — 优化与扩展：性能调优、最佳实践、生态/框架扩展、源码/原理深挖、可进阶的方向。

## Knowledge-point item shape (updated)

Each `item` MUST use this exact field shape. The new `explain` field is **required** for beginner
friendliness — do not omit it.

```js
{
  title: "知识点标题",          // short, imperative or noun phrase
  type:  "reading" | "hands-on" | "practice" | "mastery",  // pick the best fit
  desc:  "一句话描述学习者将理解或做到什么",
  explain: "用大白话解释：这是什么、为什么这样、怎么上手（面向零基础，最好带一个生活化比喻）",  // 新增，必填
  criteria: "可观察、可验收的标准（学习者做到什么算掌握）",
  link:  "https://... 该知识点对应的原文锚点，尽量用原链接"  // 可选；为空时卡片不显示「查看文档 →」，左侧菜单该知识点渲染为不可跳转的静态项
  // 协议约束：`link` 必须是 http(s) 绝对链接（以 https:// 或 http:// 开头）。
  // 相对路径、file://、或任何其他协议会被模板的 safeLink 过滤为 "#" 而不渲染链接，请勿使用。
}
```

Type selection guide (adaptive — use the subset that fits the material):
- `reading`   : 阅读理解 — read/docs, build认知.
- `hands-on`  : 动手实操 — follow steps, do it once.
- `practice`  : 练习巩固 — complete independently.
- `mastery`   : 综合应用 — real scenario drill.
- Template fallback: if an `item.type` is missing or not one of the four values, the template renders it
  as `reading` (tag + label) so the card never breaks. Still, always supply a valid `type`.

## Comprehensiveness rules (no gaps)

Before finalizing, verify the board covers ALL of the following for the given topic. If any is missing
and relevant, add the corresponding items (prefer putting them in the matching stage):

1. **概念定义** — what it is, what problem it solves, when to use vs. not use (usually 入门).
2. **前置准备** — environment, accounts, tools, required prior knowledge (入门).
3. **核心概念 / 心智模型** — the mental model a beginner must hold (基础).
4. **最常用的语法 / API / 命令** — the daily 80% (基础).
5. **工程结构与配置** — how a real project is laid out and configured (基础).
6. **运行与调试** — how to run it and how to read/fix errors (基础/进阶).
7. **原理与内部机制** — why it works under the hood (进阶).
8. **典型坑与排查清单** — the mistakes beginners actually make (进阶).
9. **至少一个完整可运行项目** — end-to-end from requirement to deploy (实战).
10. **性能 / 优化 / 最佳实践 / 生态扩展** — going beyond "it works" (精通).

If the user supplied **pasted material only**, you may keep `link` empty or point to a sensible official
doc, but still FILL every stage with the prerequisite/foundation knowledge the material omits, so the
path is complete for a beginner. Never leave a stage empty.

## Workflow

Follow these steps in order whenever the skill is triggered.

### Step 1 — Identify the input type & topic count
Inspect the user's input:

- If it **starts with `http://` or `https://`** (a single valid URL), treat it as a **link input** → go to
  Step 2a. Note: a link input is always a **single topic** (one board).
- Otherwise treat it as **text input** (a topic/goal description OR pasted learning material) → go to Step 2b.

**Multi-topic detection (text input only).** If the text describes MORE THAN ONE learning subject, split
them into separate topics. Detect split points by scanning for separators such as "和" "与" "以及" "、" "、"
"&" "/" (when used as a separator), and by recognizing that each side is itself a complete, independent
subject (e.g. a named technology, language, or tool — "sqlserver", "oracle", "Python", "Java"). Each
recognized subject becomes ONE top-level board.
  - Example: "我想学习 sqlserver 和 oracle" → 2 topics → 2 boards (`sqlserver`, `oracle`).
  - Example: "我想学 Python 爬虫做数据分析" → 1 topic (the phrase is one coherent goal) → 1 board.
  - When ambiguous (one subject with sub-parts vs. multiple subjects), treat them as multiple subjects only
    if each can stand alone as a full learning path; otherwise keep one board. Do NOT ask unless truly
    ambiguous — prefer producing the multiple boards.

If the user gave multiple links, generate one board per link (one output folder each) or merge them into
the 5-stage framework when they belong to one curriculum — ask only if ambiguous.
If the user gave both a link and some text, prefer the link as the primary source and use the text as
scope/context, then still apply the fixed 5-stage framework.

### Step 2a — Fetch & extract (link input)
Call `WebFetch` on the URL with a `fetchInfo` such as:
"Extract the learning content as an ordered outline. Identify the main modules/chapters/sections and,
under each, the concrete knowledge points or tasks a learner should master. For each knowledge point
capture: a short title, what the learner should understand or be able to do (description), a plain-language
explanation a complete beginner would understand (with an everyday analogy if possible), a concrete
observable acceptance criterion, and the most relevant source anchor/URL within the page."

### Step 2b — Parse text (text input)
No fetch needed. Read the user's text:

- **Topic/goal description** (e.g. "我想学 Python 爬虫做数据分析"): you are responsible for building the
  ENTIRE knowledge path yourself. Use your own knowledge to design a complete, beginner-friendly curriculum
  that satisfies the Comprehensiveness rules above, then distribute it across the 5 stages.
- **Pasted material** (notes / tutorial / outline): reorganize it into the 5-stage framework, and FILL any
  stage the material leaves thin with the prerequisite/foundation knowledge a beginner needs there. `link`
  may be empty or point to an official doc.

### Step 3 — Structure into boards (each = fixed 5 stages)
For a **single topic**, you produce ONE board. For **multiple topics**, you produce ONE board PER topic.
Each board is an independent object with its own `id` (kebab-case slug), `title`, `subtitle`, and `stages`.

For every board, map its knowledge points into exactly the five stages from the Fixed 5-stage framework
section. Assign each item a `type`; write `desc` (one sentence) and a required `explain` (plain language,
beginner-friendly, with an analogy where helpful); write an observable `criteria`; set `link` (source anchor
for link input, or empty/official doc for text input).

Board object:
```js
{
  id: "sqlserver",                 // kebab-case slug, used for DOM id + localStorage key prefix
  title: "SQL Server 学习路线",     // shown as the top-level left menu label
  icon: "🗄️",                      // 可选：左侧一级菜单前的小图标（emoji 或单字符），缺省回退 📘
  subtitle: "从入门到精通 · 5 阶段、N 个知识点",
  stages: [
    {
      id: 1,                      // MUST be 1..5 per the fixed framework
      title: "入门",              // MUST match the fixed framework title for this id
      subtitle: "零基础起步 · 建立认知",   // MUST match the fixed framework subtitle for this id
      color: "#3b82f6",           // MUST match the fixed framework color for this id
      items: [ /* item objects */ ]
    }
    /* ... stages 2..5 ... */
  ]
}
```

The **left-side menu** is generated from these boards automatically by `js/app.js`:
<<<<<<< HEAD
- One **top-level menu** per board (label = `board.title`, e.g. "SQL Server"), prefixed with an icon
  (`board.icon` or the 📘 fallback). Each top-level menu has a clickable header.
- Under each top-level menu, its 5 **stage groups** (入门 / 基础 / 进阶 / 实战 / 精通) are rendered, each
  listing its knowledge-point links; clicking a link with `item.link` opens it in a new tab, and a link with
  no `item.link` renders as a non-clickable static item (no `href="#"` jump).
- **Collapse / expand**: clicking a top-level menu **header** switches the right side to that board's kanban
  and expands that menu group; clicking the **▾ arrow** (inside the header) folds/expands only that group
  without switching boards. By default only the first board's group is expanded and the rest are collapsed —
  at most one group is expanded at a time. (All handled by the template — you only need to supply `boards`.)
- A knowledge-point link mirrors its card's done state: when the card is completed, the menu link shows a
  green check + strikethrough and stays in sync on board switch / 全选 / 重置.
=======
- One **top-level menu** per board (label = `board.title`, e.g. "SQL Server"). Each top-level menu has a
  header that is clickable.
- Under each top-level menu, its 5 **stage groups** (入门 / 基础 / 进阶 / 实战 / 精通) are rendered
  **always-expanded** — there is no collapse/expand interaction on stages. Each stage group directly lists
  its knowledge-point links; clicking a knowledge-point link opens `item.link` in a new tab.
- Clicking a top-level menu **header** (not the stage groups) switches the right side to that board's kanban
  and syncs the menu to that board's knowledge points. (Handled by the template — you only need to supply
  `boards`. Do not invent extra menu toggle/interaction; the template renders the menu exactly as described.)
>>>>>>> a210b23 (skill优化)

### Step 4 — Generate the standalone board
1. Copy `template/` to the output directory. Default output dir (relative to the skill, kept outside the
   skill itself so it is not re-packaged): `study-kanban/output/<slug>/` where `<slug>` is a short
   kebab-case name derived from the (primary) topic/title (e.g. `python-crawler`). For multi-topic input,
   if a single output folder is used, the `<slug>` may be a combined name (e.g. `sqlserver-oracle`); all
   boards live in the same `boards` array. If the user specified a path, use it.
2. Inject the structured `boards` array into `js/data.js`, replacing the placeholder line
   `const boards = __BOARDS_DATA__;` (an array of board objects; length 1 for single topic, >1 for
   multiple topics).
3. Replace the HTML placeholders (these seed the header for the FIRST board; switching menus updates them
   dynamically via `js/app.js`):
   - `<title>__BOARD_TITLE__</title>`
   - `.header-left h1` text → `__BOARD_TITLE__`
   - `.header-left p`  text → `__BOARD_SUBTITLE__` (e.g. "从入门到精通 · 5 个阶段、N 个知识点，零基础也能学会").
   Use the first board's title/subtitle and total item count across all boards (or just the first board)
   when filling `N`.
4. Keep `css/style.css` and `js/app.js` untouched except for the explain rendering already built into the
   template (they render all boards from `boards`, including the new `explain` field, and the left menu).

### Step 5 — Report
Tell the user the absolute path of the generated `index.html` and a one-line summary (stages count,
items count, source type — link or text). Mention it can be opened directly or lightly published.

## Template placeholder reference

- `js/data.js`: the only injection point is `const boards = __BOARDS_DATA__;` — an array of board objects
  (see Step 3). Each board's `stages` follows the fixed 5-stage framework. Everything else (type-label map,
  left-menu generation, board switching) is already handled inside `js/app.js`. Each item may include an
  `explain` string; the template renders it as a plain-language block between `desc` and `验收标准`.
- `template/index.html`: replace `__BOARD_TITLE__` (appears in `<title>` and `.header-left h1`) and
  `__BOARD_SUBTITLE__` (`.header-left p`). The `#boardsContainer` (and the left `#menuGroupsContainer`)
  are rendered by `js/app.js` from `boards` — do NOT hardcode board markup into the HTML.

## Constraints / notes

- The output must be fully self-contained (no dependency on the WorkBuddy folder); it opens by
  double-clicking `index.html`.
- **IMPORTANT — template is "unfilled" by default.** The template's `js/data.js` contains
  `const boards = __BOARDS_DATA__;` and `index.html` contains `__BOARD_TITLE__` / `__BOARD_SUBTITLE__`
  placeholders. If these are NOT replaced before opening, the page shows literal placeholder text and
  the board is blank (the `__BOARDS_DATA__` line is a JS syntax error until injected). The generation
  flow in Step 4 MUST replace all three placeholders; only then is the board valid. The committed
  `template/` folder is intentionally in this unfilled state — never "fix" it by hardcoding sample
  data into the template itself.
- **Multi-board progress is isolated per board and survives browser restart.** Each board's progress is stored
  under key `study_kanban_progress_<board.id>`. Primary store is `localStorage`; when it is unavailable (e.g.
  `file://` in private mode / restricted browsers), the template transparently falls back to the **OPFS** (Origin
  Private File System), which persists across sessions on Chromium `file://`. The app auto-loads saved progress on
  open. If neither store is available, a non-blocking notice is shown and progress is kept in-memory for the session.
- ALWAYS use exactly the fixed 5 stages (入门/基础/进阶/实战/精通) inside EACH board. When the input has
  multiple topics, DO create multiple boards (one per topic) — this is now the intended behavior. Never
  fold two distinct subjects into one board's five stages.
- Preserve the card field structure exactly (now with `explain`); only the *content* and *granularity*
  are adaptive.

## Maintenance convention (template ↔ example must stay in sync)

`template/` is the **golden reference**. `output/_example/` is a filled, runnable demo generated from it
(its `js/data.js` holds sample multi-topic data and is the ONLY file that should differ from the template).
Whenever `template/index.html`, `template/js/app.js`, or `template/css/style.css` is changed, re-sync the
corresponding files in `output/_example/` by copying them over (keep `output/_example/js/data.js` intact).
This prevents the example from silently drifting out of date and no longer representing real output.

### Critical: `TYPE_LABELS` source-of-truth differs by file

- `template/js/app.js` declares `const TYPE_LABELS = {...}` **at the top** (it is the single source in the
  real generated product, because `template/js/data.js` only contains `boards`).
- `output/_example/js/data.js` declares `TYPE_LABELS` too (the demo is self-contained, so AI / readers
  can copy the data file alone).
- Therefore when re-syncing `output/_example/js/app.js` from `template/js/app.js`, you MUST **delete** the
  top-level `const TYPE_LABELS = {...}` block in the copied file — otherwise the browser throws
  `SyntaxError: Identifier 'TYPE_LABELS' has already been declared` and the whole `app.js` fails to
  parse, leaving the left-side menu empty (only static HTML in `index.html` is rendered). Conversely,
  when editing `template/js/app.js`, keep its top-level `TYPE_LABELS` — it is the only declaration there.

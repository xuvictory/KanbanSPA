---
name: study-kanban
description: >-
  This skill should be used when the user provides an official website, documentation page, or
  learning-material link and wants it automatically converted into a self-contained, visually
  consistent study kanban board. The board uses the same blue-gradient, card-based, progress-ring
  design language as the WorkBuddy learning board. Trigger phrases include "把这个文档转成看板",
  "根据链接生成学习看板", "做一个 study-kanban", or any request to turn a URL / online doc into a
  kanban of stages and knowledge points.
---

# study-kanban

Convert any learning-oriented website / documentation / material link into a self-contained,
standalone HTML study-kanban board whose visual style is a 1:1 match with the WorkBuddy learning
board (blue-gradient header, collapsible sidebar, progress ring, type-tag legend, stage-pill
toolbar, horizontally-scrolling columns of knowledge-point cards).

## When to use

- The user supplies a single URL (official site, docs page, tutorial, spec, learning material) and
  asks to turn it into a kanban / learning board.
- The user asks to "generate a study kanban", "convert this doc into a board", or references
  `study-kanban` explicitly.
- The desired output is an independent HTML file that can be opened by double-click or lightly
  published, NOT just data injected into the existing WorkBuddy project.

## What this skill provides

- `template/` — a single-board, data-injection kanban template (HTML + css/style.css + js/data.js +
  js/app.js) whose visuals are cloned from WorkBuddy and trimmed to one board.
- This SKILL.md — the workflow that drives link → structured data → independent HTML.

## Design principles to preserve (must match WorkBuddy 1:1)

Keep these exact visual tokens so the generated board is indistinguishable in style:

- Background `#f5f7fa`; primary blue `#3b82f6`; gradients: header `135deg #1e3a5f→#2563eb→#3b82f6`,
  sidebar `180deg #1e3a5f→#1e40af→#2563eb`.
- Column: width `220px`, top `3px` stage-color border (`--col-color`).
- Card: `min-height: 210px`, fields = checkbox+title, type tag, description, 验收标准 (left-border
  block), "查看文档 →" link.
- Four type tags (keep their colors even if a subset is used). **Rendering style matches WorkBuddy
  exactly: light background + dark text (NOT solid fill)** — so a tag reads as e.g.
  `reading` = bg `#dbeafe` / text `#2563eb`, `hands-on` = bg `#ccfbf1` / text `#0d9488`,
  `practice` = bg `#ede9fe` / text `#7c3aed`, `mastery` = bg `#fef3c7` / text `#b45309`.
  Do NOT change tag rendering to solid-fill.
- Progress ring: `conic-gradient` white over translucent; glassmorphism pill container.
- Stage pills in toolbar; legend row; one-click 全选 / 重置 buttons; collapsible sidebar.

## Workflow

Follow these steps in order whenever the skill is triggered.

### Step 1 — Receive the link
Accept the user's URL. If the user gave multiple links, generate one board per link (one output
folder each) or merge them into stages when they belong to one curriculum — ask only if ambiguous.

### Step 2 — Fetch & extract
Call `WebFetch` on the URL with a `fetchInfo` such as:
"Extract the learning content as an ordered outline. Identify the main modules/chapters/sections and,
under each, the concrete knowledge points or tasks a learner should master. For each knowledge point
capture: a short title, what the learner should understand or be able to do (description), a concrete
observable acceptance criterion, and the most relevant source anchor/URL within the page."

### Step 3 — Structure into stages/items (adaptive)
Decide stage granularity from the material itself (do NOT force exactly four stages). A stage is one
coherent module/chapter/theme. Under each stage, list knowledge-point `items`.

Each `item` MUST use this exact field shape:

```js
{
  title: "知识点标题",          // short, imperative or noun phrase
  type:  "reading" | "hands-on" | "practice" | "mastery",  // pick the best fit
  desc:  "一句话描述学习者将理解或做到什么",
  criteria: "可观察、可验收的标准（学习者做到什么算掌握）",
  link:  "https://... 该知识点对应的原文锚点，尽量用原链接"  // fallback to the source URL
}
```

Type selection guide (adaptive — use the subset that fits the material):
- `reading`   : 阅读理解 — read/docs, build认知.
- `hands-on`  : 动手实操 — follow steps, do it once.
- `practice`  : 练习巩固 — complete independently.
- `mastery`   : 综合应用 — real scenario drill.

Stage shape:
```js
{
  id: 1,                      // sequential integer
  title: "阶段标题",
  subtitle: "阶段副标题 · 类型说明",   // short
  color: "#3b82f6",           // pick from palette below, distinct per stage
  items: [ /* item objects */ ]
}
```

Stage color palette (assign distinct hues across stages; reuse WorkBuddy's palette):
`#3b82f6` `#14b8a6` `#8b5cf6` `#f59e0b` `#ec4899` `#ef4444` `#10b981` `#6366f1` `#0ea5e9`
`#f43f5e` `#a855f7` `#22c55e` `#0891b2` `#d946ef` `#f97316` `#64748b` `#06b6d4` `#0d9488` `#7c3aed`.

### Step 4 — Generate the standalone board
1. Copy `template/` to the output directory. Default output dir:
   `c:/Users/Administrator/code/KanbanSPA/study-kanban/output/<slug>/` where `<slug>` is a short
   kebab-case name derived from the page title (e.g. `react-docs`). If the user specified a path,
   use it.
2. Inject the structured `stages` array into `js/data.js`, replacing the placeholder line
   `const stages = __STAGES_DATA__;`.
3. Replace the HTML placeholders:
   - `<title>__BOARD_TITLE__</title>`
   - `.header-left h1` text → `__BOARD_TITLE__`
   - `.header-left p`  text → `__BOARD_SUBTITLE__` (e.g. "从零基础到熟练运用 — N 个阶段、M 个知识点，逐步攻克").
   Update the `N`/`M` counts from the generated data.
4. Keep `css/style.css` and `js/app.js` untouched (they already render a single board from
   `stages`).

### Step 5 — Report
Tell the user the absolute path of the generated `index.html` and a one-line summary (stages count,
items count, source URL). Mention it can be opened directly or lightly published.

## Template placeholder reference

- `js/data.js`: the only injection point is `const stages = __STAGES_DATA__;`. Everything else
  (type-label map) is already handled inside `js/app.js`.
- `template/index.html`: replace `__BOARD_TITLE__` (appears in `<title>` and `.header-left h1`) and
  `__BOARD_SUBTITLE__` (`.header-left p`). The `#board` element is rendered by `js/app.js`.

## Constraints / notes

- The output must be fully self-contained (no dependency on the WorkBuddy folder); it opens by
  double-clicking `index.html`.
- **IMPORTANT — template is "unfilled" by default.** The template's `js/data.js` contains
  `const stages = __STAGES_DATA__;` and `index.html` contains `__BOARD_TITLE__` / `__BOARD_SUBTITLE__`
  placeholders. If these are NOT replaced before opening, the page shows literal placeholder text and
  the board is blank (the `__STAGES_DATA__` line is a JS syntax error until injected). The generation
  flow in Step 4 MUST replace all three placeholders; only then is the board valid. The committed
  `template/` folder is intentionally in this unfilled state — never "fix" it by hardcoding sample
  data into the template itself.
- Progress is stored in `localStorage` under key `study_kanban_progress` (already set in app.js) so
  different boards never collide.
- Do NOT add a second board, sidebar menu groups, or advanced-board logic — the template is already
  trimmed to a single board. If the source clearly has two tiers (e.g. beginner/advanced), represent
  them as two `stages` groups or generate two output folders, not a second in-page board.
- Preserve the card field structure exactly; only the *content* and *granularity* are adaptive.

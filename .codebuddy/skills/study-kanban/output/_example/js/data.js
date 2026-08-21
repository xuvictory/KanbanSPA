// study-kanban 示例数据（多主题 demo，从 template 自动注入）
// 本文件是 output/_example 与 template 唯一不同的文件：template 的 data.js 仅含占位符
// `const boards = __BOARDS_DATA__;`，此处替换为真实 boards 数组。
// boards：数组，每个元素是一个「学习主题」看板（= 左侧一个一级菜单）。
//   单主题：1 个元素（页面自动退化为单看板，无切换菜单）；
//   多主题：N 个元素（如本例 2 个主题 → 左侧 2 个菜单）。
// board = { id, title, subtitle, stages }
//   id       — kebab-case 唯一标识，用于 DOM id 与进度存储 key
//   title    — 左侧一级菜单标题
//   subtitle — 看板副标题
//   stages   — 固定 5 阶段：入门/基础/进阶/实战/精通（id 1..5，不可增删改）
// stage = { id, title, subtitle, color, items }
//   id/title/subtitle/color 必须与固定框架一致（见 SKILL.md）
// item = { title, type, desc, explain, criteria, link }
//   type     — "reading" | "hands-on" | "practice" | "mastery"
//   explain  — 大白话讲解（必填，面向零基础）
//   link     — 参考文档链接（可留空 ""）

// type 标签 → 中文名（与 WorkBuddy 完全一致）
const TYPE_LABELS = {
  'reading':  '阅读理解',
  'hands-on': '动手实操',
  'practice': '练习巩固',
  'mastery':  '综合应用'
};

const boards = [
  {
    id: "demo-a",
    title: "示例主题 A",
    subtitle: "从入门到精通 · 5 阶段、5 个知识点",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          { title: "认识它是干什么的", type: "reading", desc: "先建立对主题 A 的整体认知。", explain: "把它想成一件日常工具：知道它解决什么问题、什么时候用，就迈出了第一步。", criteria: "能用自己的话说出它解决什么问题、不解决什么问题。", link: "" }
        ]
      },
      {
        id: 2,
        title: "基础",
        subtitle: "核心概念与工具 · 打地基",
        color: "#14b8a6",
        items: [
          { title: "掌握最常用的写法", type: "hands-on", desc: "照着示例动手完成最常用的几个操作。", explain: "就像先学会「开火、加油、刹车」再上路，先把高频动作练熟。", criteria: "能独立完成操作并看到预期结果。", link: "" }
        ]
      },
      {
        id: 3,
        title: "进阶",
        subtitle: "深入原理与技巧 · 提升",
        color: "#8b5cf6",
        items: [
          { title: "理解背后的原理", type: "practice", desc: "弄懂它内部是怎么工作的。", explain: "知道「为什么」之后，你才能从照做变成会改，遇到问题也能自己排查。", criteria: "能用自己的话讲清内部机制，并举 1 个例子说明。", link: "" }
        ]
      },
      {
        id: 4,
        title: "实战",
        subtitle: "真实项目演练 · 应用",
        color: "#f59e0b",
        items: [
          { title: "做一个完整小项目", type: "mastery", desc: "把前面学的串起来，完成一个可运行的小项目。", explain: "把零散技巧拼成一道完整「菜」，每一步都有明确产出，最后能端上桌。", criteria: "项目能正常运行并满足需求。", link: "" }
        ]
      },
      {
        id: 5,
        title: "精通",
        subtitle: "优化与扩展 · 融会贯通",
        color: "#ec4899",
        items: [
          { title: "做一轮优化与扩展", type: "mastery", desc: "在跑通的基础上做一轮性能优化，并了解进阶方向。", explain: "菜能做了之后再追求「更快更省更好」，同时知道旁边还有哪些新东西可学。", criteria: "能指出至少 2 个优化点，并列出 2 个进阶方向。", link: "" }
        ]
      }
    ]
  },
  {
    id: "demo-b",
    title: "示例主题 B",
    subtitle: "从入门到精通 · 5 阶段、5 个知识点",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          { title: "了解主题 B 的定位", type: "reading", desc: "先建立对主题 B 的整体认知。", explain: "同样用生活化比喻：它像什么、什么时候用它、什么时候不用它。", criteria: "能用自己的话说出它的定位与适用场景。", link: "" }
        ]
      },
      {
        id: 2,
        title: "基础",
        subtitle: "核心概念与工具 · 打地基",
        color: "#14b8a6",
        items: [
          { title: "搭好环境并跑通示例", type: "hands-on", desc: "完成环境搭建，运行第一个示例。", explain: "就像做饭前先备好锅灶，装好工具、跑通一个最小示例，后面才有练习基础。", criteria: "环境就绪，示例运行成功无报错。", link: "" }
        ]
      },
      {
        id: 3,
        title: "进阶",
        subtitle: "深入原理与技巧 · 提升",
        color: "#8b5cf6",
        items: [
          { title: "避开新手常踩的坑", type: "practice", desc: "了解常见错误与排查方法。", explain: "报错信息就像警报灯，学会读它、学会查它，就能快速定位问题。", criteria: "能列举至少 3 个常见坑并说明如何规避。", link: "" }
        ]
      },
      {
        id: 4,
        title: "实战",
        subtitle: "真实项目演练 · 应用",
        color: "#f59e0b",
        items: [
          { title: "完成一个综合实战", type: "mastery", desc: "用一个真实场景把所学知识综合运用起来。", explain: "把「买菜→洗菜→下锅→装盘」整条流水线跑通，重点练各环节的衔接。", criteria: "端到端流程跑通且结果正确。", link: "" }
        ]
      },
      {
        id: 5,
        title: "精通",
        subtitle: "优化与扩展 · 融会贯通",
        color: "#ec4899",
        items: [
          { title: "了解生态与进阶方向", type: "reading", desc: "了解周边生态与可深入的方向。", explain: "精通不是终点，而是知道旁边还有哪些「菜系」可以学、何时该换工具。", criteria: "能列出 3 个相关方向并说明适用场景。", link: "" }
        ]
      }
    ]
  }
];

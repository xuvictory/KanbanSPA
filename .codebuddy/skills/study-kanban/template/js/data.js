// study-kanban data template
// AI 生成时只需替换下面这一行占位符：把 __BOARDS_DATA__ 替换为真实的 boards 数组。
// boards 结构见 SKILL.md。每个 board 是一个独立学习主题（左侧一个一级菜单 = 一个 board）。
//   - 单主题输入：boards 只有 1 个元素（页面退化为单看板，无切换菜单）。
//   - 多主题输入（如"sqlserver 和 oracle"）：boards 有 N 个元素，左侧生成 N 个一级菜单。
// board: { id, title, subtitle, stages:[固定五阶段] }
//   - id: kebab-case slug（如 "sqlserver"），用于 DOM id 与 localStorage 进度 key 前缀。
//   - title: 左侧一级菜单显示的名称（如 "SQL Server 学习路线"）。
//   - stages 固定五阶段：入门/基础/进阶/实战/精通（id 1..5，见 SKILL.md 框架）。
//     每个 stage: { id, title, subtitle, color, items:[{title,type,desc,explain,criteria,link}] }
//       - explain 为「通俗讲解」字段（必填），用大白话面向零基础解释该知识点，可带生活化比喻。
//       - 阶段必须严格套用 SKILL.md 的固定五阶段框架，不要自创阶段。
const boards = __BOARDS_DATA__;

// type 标签 → 中文名（与 WorkBuddy 完全一致）
const TYPE_LABELS = {
  'reading':  '阅读理解',
  'hands-on': '动手实操',
  'practice': '练习巩固',
  'mastery':  '综合应用'
};

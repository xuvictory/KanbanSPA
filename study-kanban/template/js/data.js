// study-kanban data template
// AI 生成时只需替换下面这一行占位符：把 __STAGES_DATA__ 替换为真实的 stages 数组。
// stages 结构见 SKILL.md。每个 stage: { id, title, subtitle, color, items:[{title,type,desc,criteria,link}] }
const stages = __STAGES_DATA__;

// type 标签 → 中文名（与 WorkBuddy 完全一致）
const TYPE_LABELS = {
  'reading':  '阅读理解',
  'hands-on': '动手实操',
  'practice': '练习巩固',
  'mastery':  '综合应用'
};

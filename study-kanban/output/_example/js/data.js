// study-kanban data (示例) — AI 生成时替换 __STAGES_DATA__
const stages = [
  {
    id: 1,
    title: "环境准备",
    subtitle: "搭建学习环境 · 入门",
    color: "#3b82f6",
    items: [
      { title: "了解项目定位", type: "reading", desc: "理解该技术的核心用途与适用场景，建立整体认知。", criteria: "能用自己的话说明它解决什么问题、不适合什么场景。", link: "https://example.com/docs/intro" },
      { title: "安装运行环境", type: "hands-on", desc: "按官方指引完成环境安装并跑通第一个示例。", criteria: "本机执行 version 命令能看到正确版本号。", link: "https://example.com/docs/install" },
      { title: "配置开发工具", type: "hands-on", desc: "安装插件/扩展并验证编辑器提示可用。", criteria: "编辑器内输入时能获得智能提示。", link: "https://example.com/docs/setup" }
    ]
  },
  {
    id: 2,
    title: "核心概念",
    subtitle: "掌握基础心智模型 · 进阶",
    color: "#14b8a6",
    items: [
      { title: "理解数据模型", type: "reading", desc: "掌握核心数据结构的组成与约束。", criteria: "能画出核心结构的关系图并说明字段含义。", link: "https://example.com/docs/model" },
      { title: "完成基础练习", type: "practice", desc: "独立完成官方入门练习集。", criteria: "练习全部通过且无报错。", link: "https://example.com/docs/exercises" },
      { title: "调试常见错误", type: "practice", desc: "复现并解决 3 类常见报错。", criteria: "能定位错误根因并给出修复方案。", link: "https://example.com/docs/debug" }
    ]
  },
  {
    id: 3,
    title: "综合实战",
    subtitle: "在真实场景中应用 · 精通",
    color: "#f59e0b",
    items: [
      { title: "搭建迷你项目", type: "mastery", desc: "用所学知识从零完成一个可运行的小项目。", criteria: "项目能部署并在浏览器/终端正常跑通。", link: "https://example.com/docs/project" },
      { title: "性能与优化", type: "mastery", desc: "对项目做一轮性能/结构优化。", criteria: "能指出至少 2 个优化点并量化收益。", link: "https://example.com/docs/optimize" }
    ]
  }
];

const TYPE_LABELS = {
  'reading':  '阅读理解',
  'hands-on': '动手实操',
  'practice': '练习巩固',
  'mastery':  '综合应用'
};

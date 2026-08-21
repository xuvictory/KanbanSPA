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
//   icon     — 左侧一级菜单小图标（可选，缺省回退 📘）
//   stages   — 固定 5 阶段：入门/基础/进阶/实战/精通（id 1..5，不可增删改）
// stage = { id, title, subtitle, color, items }
//   id/title/subtitle/color 必须与固定框架一致（见 SKILL.md）
// item = { title, type, desc, explain, criteria, link }
//   type     — "reading" | "hands-on" | "practice" | "mastery"
//   explain  — 大白话讲解（必填，面向零基础）
//   link     — 参考文档链接（http/https 绝对链接，可留空 ""；留空则不显示「查看文档 →」）

// type 标签 → 中文名（与 WorkBuddy 完全一致）
const TYPE_LABELS = {
  'reading':  '阅读理解',
  'hands-on': '动手实操',
  'practice': '练习巩固',
  'mastery':  '综合应用'
};

const boards = [
  {
    id: "sqlserver",
    title: "SQL Server 学习路线",
    icon: "🗄️",
    subtitle: "从入门到精通 · 5 阶段、10 个知识点，零基础也能学会",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          {
            title: "认识 SQL Server 能做什么",
            type: "reading",
            desc: "建立对 SQL Server 的整体认知：它是什么、解决什么问题。",
            explain: "把它想成一个超大的电子表格仓库，专门帮企业可靠地存数据、查数据。和 Excel 不同的是，它要同时服务成千上万人，还要保证不出错、不丢数据。",
            criteria: "能用自己的话说出 SQL Server 是什么、适合存什么数据、什么时候不该用它。",
            link: "https://learn.microsoft.com/zh-cn/sql/sql-server/what-is-sql-server"
          },
          {
            title: "安装并连接第一个实例",
            type: "hands-on",
            desc: "完成本机安装，用 SSMS 连上数据库实例。",
            explain: "就像给手机装微信，装好之后第一步是「登录」——这里是用 SSMS 这个图形工具登录到数据库实例，看到左侧的对象资源管理器就算成功了。",
            criteria: "本机安装成功，能用 SSMS 连接并看到实例下的数据库列表。",
            link: "https://learn.microsoft.com/zh-cn/sql/database-engine/install-windows/install-sql-server"
          }
        ]
      },
      {
        id: 2,
        title: "基础",
        subtitle: "核心概念与工具 · 打地基",
        color: "#14b8a6",
        items: [
          {
            title: "数据库、表与主键",
            type: "reading",
            desc: "理解库、表、主键三大核心概念及其关系。",
            explain: "数据库=文件柜，表=柜里的文件夹，主键=每份文件唯一的编号。编号不能重复，这样才能确定「这一份就是它」。",
            criteria: "能建一个带主键的表，并解释为什么主键不能重复、为空。",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/tables/primary-and-foreign-key-constraints"
          },
          {
            title: "用 SELECT 查询数据",
            type: "hands-on",
            desc: "掌握最常用的查询语法：筛选、排序、取别名。",
            explain: "SELECT 就像在仓库里「取货」：指定要哪几列（货品名）、满足什么条件（批次）、按什么顺序摆出来，数据就按要求拿到了。",
            criteria: "能独立写出带 WHERE、ORDER BY、AS 别名的查询并解释结果。",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/queries/select-transact-sql"
          }
        ]
      },
      {
        id: 3,
        title: "进阶",
        subtitle: "深入原理与技巧 · 提升",
        color: "#8b5cf6",
        items: [
          {
            title: "索引：查询为什么这么快",
            type: "reading",
            desc: "理解索引的原理、分类与取舍。",
            explain: "索引就像书的目录：没有目录就得逐页翻，有了目录一下定位到那一页。但目录本身也占版面，所以建索引是「空间换时间」，不能乱建。",
            criteria: "能说出聚集索引与非聚集索引的区别，并为查询场景设计合理的索引。",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described"
          },
          {
            title: "事务与锁：保证数据一致",
            type: "practice",
            desc: "理解事务的 ACID 特性与并发下的锁。",
            explain: "转账就是典型事务：扣钱和加钱必须「同生共死」，中途失败就全部回滚，绝不会出现钱扣了却没到账。锁则是防止两个人同时改同一笔数据。",
            criteria: "能写出 BEGIN TRAN / COMMIT / ROLLBACK 示例并模拟一次回滚验证数据恢复。",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/language-elements/transactions-transact-sql"
          }
        ]
      },
      {
        id: 4,
        title: "实战",
        subtitle: "真实项目演练 · 应用",
        color: "#f59e0b",
        items: [
          {
            title: "设计一个订单系统数据库",
            type: "practice",
            desc: "从需求拆解到建表，完成一个可运行的订单库。",
            explain: "把「顾客、订单、商品」拆成三张表，用外键把它们关联起来——就像把通讯录、账单、货架分开放，互不打架，查起来又快又准。",
            criteria: "设计出至少 4 张关联表并插入测试数据，跑通增删改查。",
            link: ""
          },
          {
            title: "用存储过程封装业务逻辑",
            type: "mastery",
            desc: "把重复的 SQL 逻辑封装成存储过程并调用。",
            explain: "存储过程就像「一键做饭」：把买菜、洗菜、下锅等重复步骤写成固定流程，以后点一次就全自动执行，还不用每次都把菜谱抄一遍。",
            criteria: "能创建一个带输入参数的存储过程，并通过 EXEC 调用成功。",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/stored-procedures/create-a-stored-procedure"
          }
        ]
      },
      {
        id: 5,
        title: "精通",
        subtitle: "优化与扩展 · 融会贯通",
        color: "#ec4899",
        items: [
          {
            title: "用执行计划定位慢查询",
            type: "mastery",
            desc: "读懂执行计划，精准优化慢查询。",
            explain: "执行计划就像外卖平台的配送路线图：能看清每一段耗时在哪，据此「精准优化」而不是靠猜。看懂它，你才真正从「会写 SQL」进阶到「会调 SQL」。",
            criteria: "能读懂执行计划并指出扫描与查找，至少把一个慢查询优化到可接受范围。",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/performance/display-an-actual-execution-plan"
          },
          {
            title: "备份恢复与高可用",
            type: "reading",
            desc: "掌握备份策略与常见高可用方案。",
            explain: "数据库是企业的「命根子」，备份就像给重要文件做云端副本：硬盘坏了也能满血复活。高可用（如主从复制）则是「备胎自动顶班」，一台挂了另一台立刻顶上。",
            criteria: "能独立完成一次完整备份与还原，并说出主从复制的作用与使用场景。",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases"
          }
        ]
      }
    ]
  },
  {
    id: "python",
    title: "Python 学习路线",
    icon: "🐍",
    subtitle: "从入门到精通 · 5 阶段、10 个知识点，零基础也能学会",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          {
            title: "Python 是什么、能干什么",
            type: "reading",
            desc: "建立对 Python 的整体认知与定位。",
            explain: "Python 是一种特别「好读」的编程语言，写起来像在用大白话跟电脑说话，所以很适合新手入门；数据分析、爬虫、人工智能都能用它。",
            criteria: "能说出 Python 的三个典型用途，以及它和 Excel/VBA 的区别。",
            link: "https://docs.python.org/zh-cn/3/"
          },
          {
            title: "安装 Python 并跑通第一个程序",
            type: "hands-on",
            desc: "完成环境安装，运行第一个 Hello World。",
            explain: "装好解释器就像买好了锅，第一步先「点火」：在命令行输入 python 回车，打印一句 Hello World，看到输出就算开火成功了。",
            criteria: "命令行能运行 python 并成功打印 Hello World。",
            link: "https://docs.python.org/zh-cn/3/using/index.html"
          }
        ]
      },
      {
        id: 2,
        title: "基础",
        subtitle: "核心概念与工具 · 打地基",
        color: "#14b8a6",
        items: [
          {
            title: "变量、类型与运算符",
            type: "reading",
            desc: "掌握变量与基本数据类型（int/str/bool）。",
            explain: "变量就像贴了标签的盒子，盒子里可以放数字、文字或真假值。给盒子起名、往里放东西、再取出来用，就是编程最基础的动作。",
            criteria: "能熟练使用 int/str/bool 类型，写出一段带变量与运算的脚本。",
            link: "https://docs.python.org/zh-cn/3/tutorial/introduction.html"
          },
          {
            title: "条件、循环与函数",
            type: "hands-on",
            desc: "掌握 if 分支、for 循环与自定义函数。",
            explain: "if 像岔路口帮你选择走哪条路，for 像排队一个个处理，函数则像把常用步骤打包成「口诀」，需要时喊一声就执行。",
            criteria: "能写一个同时使用 if、for 和自定义函数的完整脚本。",
            link: "https://docs.python.org/zh-cn/3/tutorial/controlflow.html"
          }
        ]
      },
      {
        id: 3,
        title: "进阶",
        subtitle: "深入原理与技巧 · 提升",
        color: "#8b5cf6",
        items: [
          {
            title: "列表、字典与集合",
            type: "reading",
            desc: "理解常用数据结构的特性与选型。",
            explain: "字典像手机通讯录：靠「名字」直接找到「号码」，不用从头翻到尾，查询特别快；列表像排队清单，有序但查找要一个个数。选对结构，程序就快。",
            criteria: "能按场景选 list/dict/set 并完成增删改查，说出各自特点。",
            link: "https://docs.python.org/zh-cn/3/tutorial/datastructures.html"
          },
          {
            title: "异常处理与调试",
            type: "practice",
            desc: "读懂报错并用 try/except 处理异常。",
            explain: "报错像电器故障的警报灯，读懂 Traceback 就能知道「哪一行出了什么问题」。try/except 则是给程序装「保险丝」，出错时不至于全线崩溃。",
            criteria: "能读懂 Traceback 并定位错误行，用 try/except 捕获至少两类异常。",
            link: "https://docs.python.org/zh-cn/3/tutorial/errors.html"
          }
        ]
      },
      {
        id: 4,
        title: "实战",
        subtitle: "真实项目演练 · 应用",
        color: "#f59e0b",
        items: [
          {
            title: "做一个命令行待办管理工具",
            type: "practice",
            desc: "把所学串成一个小工具：增删查待办并保存到文件。",
            explain: "把「记录、查询、删除」做成一个迷你记账本：运行程序就能添加待办、查看清单，关掉再打开数据还在——这就是一个完整可用的程序。",
            criteria: "工具能增、删、查待办，数据能持久化到文件且重启后仍在。",
            link: ""
          },
          {
            title: "用函数与模块重构代码",
            type: "mastery",
            desc: "把单文件脚本拆成清晰的多模块结构。",
            explain: "代码一旦变长，就要像厨房分区一样「切菜台、灶台、储物柜」分开：把逻辑拆进函数和模块，既好读又好维护，改一处不牵连别处。",
            criteria: "能把待办工具拆成至少 2 个模块并正常运行，功能不变。",
            link: "https://docs.python.org/zh-cn/3/tutorial/modules.html"
          }
        ]
      },
      {
        id: 5,
        title: "精通",
        subtitle: "优化与扩展 · 融会贯通",
        color: "#ec4899",
        items: [
          {
            title: "虚拟环境与包管理",
            type: "mastery",
            desc: "用 venv 隔离环境，用 pip 管理第三方包。",
            explain: "虚拟环境像给每个项目单独开一间「实验室」，装什么依赖都不干扰别的项目，避免「给 A 项目装库把 B 项目搞坏了」的惨案。",
            criteria: "能创建并激活虚拟环境，用 pip 安装依赖并导出 requirements.txt。",
            link: "https://docs.python.org/zh-cn/3/tutorial/venv.html"
          },
          {
            title: "性能优化与进阶方向",
            type: "reading",
            desc: "学会分析瓶颈，并了解可进阶的方向。",
            explain: "精通不是终点，而是「会看路」：能用性能分析工具找出慢在哪、选对数据结构提速，同时知道旁边还有面向对象、并发、爬虫、数据分析等方向可以走。",
            criteria: "能指出至少 2 个优化点，并列出 3 个可深入的进阶方向及适用场景。",
            link: ""
          }
        ]
      }
    ]
  }
];

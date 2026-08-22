// study-kanban 数据 — 主题：Agent 开发学习路线
// 固定五阶段框架：入门 / 基础 / 进阶 / 实战 / 精通

const boards = [
  {
    id: "agent-dev",
    title: "Agent 开发学习路线",
    icon: "🤖",
    subtitle: "从入门到精通 · 5 个阶段、28 个知识点，零基础也能学会",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          {
            title: "什么是 AI Agent",
            type: "reading",
            desc: "理解 Agent 的定义、它能解决什么问题，以及何时该用 Agent。",
            explain: "Agent 就像『有手有脚的聊天机器人』：它不仅会说话，还能调用工具、查资料、做计划、一步步把任务完成。你交代一件事，它自己想办法搞定。",
            criteria: "能用自己的话讲清 Agent 的四个要素（大模型、工具、记忆、规划），并说出 3 个典型应用场景。",
            link: "https://www.promptingguide.ai/zh/research/llm-agents"
          },
          {
            title: "Agent 与聊天机器人、脚本的区别",
            type: "reading",
            desc: "理清三者的边界，学会按需求选型。",
            explain: "聊天机器人只会『说』，脚本只会『照做』，而 Agent 会自己『想怎么做』。就像传话的助理、按流程办事的职员、和能独立做决定的经理之间的区别。",
            criteria: "能对任意需求判断该用聊天机器人、脚本还是 Agent，并说明理由。",
            link: ""
          },
          {
            title: "前置准备：环境与 API 账号",
            type: "hands-on",
            desc: "搭建 Python 开发环境，注册大模型 API 并拿到 Key。",
            explain: "就像做饭前先买菜备灶：Python 是『厨房』，API Key 是『打开智能厨房的钥匙』。没有钥匙，再好的厨师也进不了门。",
            criteria: "能在终端运行 python -V 正常输出版本号，并成功拿到一个可用的 API Key。",
            link: "https://platform.openai.com/docs/quickstart"
          },
          {
            title: "第一个 Hello World：调用大模型 API",
            type: "hands-on",
            desc: "用几行代码调用一次 LLM API，跑通最小闭环。",
            explain: "就像第一次拨通电话：证明『我 → API → 模型 → 回复』这条路是通的。这是所有 Agent 的起点。",
            criteria: "能写出并运行一段调用 LLM API 的代码，成功打印出模型回复。",
            link: "https://platform.openai.com/docs/quickstart"
          },
          {
            title: "Prompt 与上下文窗口初识",
            type: "reading",
            desc: "了解提示词和上下文窗口是什么，为什么对 Agent 至关重要。",
            explain: "Prompt 是你给模型的『任务说明书』；上下文窗口是模型一次对话里最多能『记住』的字数上限。说明书写得好不好，直接影响 Agent 干活靠不靠谱。",
            criteria: "能说出上下文窗口对 Agent 设计的影响（例如记忆放不下时怎么办）。",
            link: "https://www.promptingguide.ai/zh"
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
            title: "LLM API 进阶：参数与流式输出",
            type: "hands-on",
            desc: "掌握 temperature、max_tokens 等常用参数，实现流式输出。",
            explain: "就像调整收音机的音量和频道：参数控制模型的『创造力』和回答长度；流式输出让回复像打字机一样『边想边蹦字』，体验更顺畅。",
            criteria: "能调用流式接口实时打印回复，并解释每个常用参数的作用。",
            link: "https://platform.openai.com/docs/api-reference/chat"
          },
          {
            title: "函数调用 Function Calling",
            type: "hands-on",
            desc: "让模型根据你的工具清单决定调用哪个函数并生成参数。",
            explain: "把工具封装成『菜单』交给模型，模型像点菜一样『下单』（指定函数和参数），你的程序收到订单就去执行，再把结果回给模型。这是 Agent 能动手干活的关键。",
            criteria: "能定义一个自定义工具函数，让模型在需要时自动调用它并拿回结果继续对话。",
            link: "https://platform.openai.com/docs/guides/function-calling"
          },
          {
            title: "Prompt 工程核心技巧",
            type: "reading",
            desc: "掌握角色设定、Few-shot、思维链等关键写法。",
            explain: "给模型『立人设 + 举例子 + 让它一步一步想』，输出质量会肉眼可见地提升。就像给新员工做培训，越具体的说明干活越准。",
            criteria: "能针对同一任务写出 3 个不同质量的 Prompt 并对比出效果差异。",
            link: "https://www.promptingguide.ai/zh/techniques"
          },
          {
            title: "记忆机制入门：短期与长期",
            type: "reading",
            desc: "理解 Agent 的『记忆』是什么、存在哪、怎么用。",
            explain: "大模型本身『没记性』，聊完就忘。Agent 用『对话记录（短期记忆）+ 数据库（长期记忆）』给它配一个外置大脑，才能记住上下文和历史经验。",
            criteria: "能说清短期记忆（对话历史）与长期记忆（存储/检索）的差别和各自用途。",
            link: ""
          },
          {
            title: "向量数据库与 Embedding",
            type: "hands-on",
            desc: "用 Embedding 把文本变成向量，存入向量库供相似检索。",
            explain: "把一句话变成一个『坐标点』，意思相近的句子在空间里靠得近。检索时就像『找离我最近的邻居』，这是 RAG 和长期记忆的地基。",
            criteria: "能用 Embedding 加向量库（如 Chroma / FAISS）完成一次相似文本检索。",
            link: "https://python.langchain.com/docs/integrations/vectorstores"
          },
          {
            title: "Agent 框架入门：LangChain 基础",
            type: "hands-on",
            desc: "用框架把 LLM、工具、记忆组装成第一个 Agent。",
            explain: "框架就像乐高积木包：『模型、工具、记忆、对话流』这些积木已经备好，你只需要按图纸拼起来。不用从零造轮子。",
            criteria: "能用 LangChain 搭出一个带工具调用和简单记忆的 Agent 并运行成功。",
            link: "https://python.langchain.com/docs"
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
            title: "ReAct 模式：推理 + 行动循环",
            type: "reading",
            desc: "理解 Agent『思考 → 行动 → 观察 → 再思考』的核心循环。",
            explain: "像解数学题时『想一想、写一步、检查结果、再想下一步』。ReAct 让模型把推理和行动交替进行，遇到不确定就查一下工具，而不是硬编。",
            criteria: "能画出 ReAct 循环图，并说清每一步输入输出的数据流动。",
            link: "https://arxiv.org/abs/2210.03629"
          },
          {
            title: "任务规划与分解",
            type: "reading",
            desc: "让 Agent 把大目标拆成小任务，再按依赖顺序执行。",
            explain: "像做一顿大餐：先列菜谱，再按顺序买菜、备菜、炒菜。规划让 Agent 面对复杂任务时『有条理』而不是瞎撞。",
            criteria: "能让 Agent 自主把一个复杂任务拆成 3 步以上的子任务并顺序执行完成。",
            link: ""
          },
          {
            title: "多 Agent 协作模式",
            type: "reading",
            desc: "了解多 Agent 的分工、通信与编排方式。",
            explain: "像剧组协作：导演（主管 Agent）、编剧、摄影各司其职，靠『场记板』（消息）互通进度。多 Agent 适合任务能被拆给不同角色的场景。",
            criteria: "能说出至少 2 种编排模式（如主管-子 Agent、群聊式）及其适用场景。",
            link: "https://docs.langchain.com/oss/python/agent/multi-agent"
          },
          {
            title: "检索增强生成 RAG",
            type: "hands-on",
            desc: "给 Agent 外接知识库，让它基于资料回答、减少幻觉。",
            explain: "让 Agent 先『翻书』再回答，而不是瞎编。就像考试开卷比闭卷靠谱：把答案来源限死在你的文档里，准确率会高很多。",
            criteria: "能搭出完整 RAG 链路：文档切分 → 向量化 → 检索 → 基于结果生成。",
            link: "https://python.langchain.com/docs/tutorials/rag"
          },
          {
            title: "评估与可观测性",
            type: "hands-on",
            desc: "用评估集和追踪（Tracing）观察 Agent 每一步在做什么。",
            explain: "像给 Agent 装『行车记录仪』：每一步调了什么工具、模型回了什么，都记录下来。出了问题能复盘，而不是两眼一抹黑。",
            criteria: "能接入一套追踪工具（如 LangSmith）查看一次任务的完整轨迹并定位问题。",
            link: "https://docs.smith.langchain.com/"
          },
          {
            title: "典型坑与排查清单",
            type: "reading",
            desc: "掌握上下文溢出、循环卡死、幻觉、成本失控等常见问题的排查法。",
            explain: "提前知道『哪里容易翻车』并备好急救包，比出事再救更快。大多数 Agent 项目踩的都是同一批坑。",
            criteria: "能列举 5 个以上常见故障，并说出每个对应的排查与修复手段。",
            link: ""
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
            title: "项目一：个人知识库问答 Agent（RAG）",
            type: "hands-on",
            desc: "从需求到完成，构建一个只回答你文档内容的问答 Agent。",
            explain: "把你的笔记、PDF『喂』给 Agent，它学会基于你的资料回答问题。这是 RAG 最典型的落地场景。",
            criteria: "能上传至少 3 篇文档，提出 5 个问题并全部基于文档正确回答。",
            link: "https://python.langchain.com/docs/tutorials/qa_chat_history"
          },
          {
            title: "项目二：自动化工作流 Agent",
            type: "hands-on",
            desc: "构建一个自动完成『收集 → 整理 → 产出』多步骤任务的 Agent。",
            explain: "像配了个全能助理：你交代一件事，它自己查资料、写总结、产出文件，全程不用你盯着。",
            criteria: "完成一个真实任务（如自动生成日报），全程无需人工干预并成功交付。",
            link: ""
          },
          {
            title: "项目三：编程助手 Agent",
            type: "practice",
            desc: "构建能读写代码文件、执行命令的编程 Agent。",
            explain: "像『AI 结对程序员』：你说需求，它写代码、跑测试、根据报错改 Bug，直到任务完成。",
            criteria: "让 Agent 独立完成一个带测试的小功能并全部跑通。",
            link: "https://docs.anthropic.com/en/docs/build-with-claude/code"
          },
          {
            title: "项目四：多 Agent 团队协作系统",
            type: "practice",
            desc: "组合多个角色 Agent，接力完成一个复杂任务。",
            explain: "让『产品经理 Agent + 工程师 Agent + 测试 Agent』接力协作，各干各擅长的部分，最后产出可用的成果。",
            criteria: "能运行一个 3 个以上角色协作的 Agent 系统，产出最终可用的成果。",
            link: ""
          },
          {
            title: "Agent 系统评测与验收",
            type: "practice",
            desc: "用评测用例集和人工检查清单评估 Agent 的质量与稳定性。",
            explain: "毕业前先『模拟考』：准备一批标准题和检查项，看 Agent 能得几分、哪些场景会翻车，再针对性改进。",
            criteria: "能为自己构建的 Agent 建立 20 条以上评测用例并输出一份评测报告。",
            link: "https://docs.smith.langchain.com/evaluation"
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
            title: "性能与成本优化",
            type: "reading",
            desc: "通过缓存、模型分级、token 压缩等手段让 Agent 更快更省。",
            explain: "平时用『快而便宜的小模型』处理简单事，难事才请『贵而强的大模型』，再加缓存避免重复付费——省钱又够用。",
            criteria: "能对自己的 Agent 做一次性能与成本分析，并落地至少 2 项优化。",
            link: ""
          },
          {
            title: "安全与防护：提示注入与权限控制",
            type: "reading",
            desc: "抵御恶意指令注入，做好工具权限的最小化设计。",
            explain: "给 Agent 装『防火墙』：区分用户输入和系统指令，不轻信外部文本，工具只给最小权限——否则被注入一句『忽略之前所有指令』就可能翻车。",
            criteria: "能构造并演示一次提示注入攻击，并给出有效的防御方案。",
            link: "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
          },
          {
            title: "Agent 框架源码深挖",
            type: "mastery",
            desc: "读懂框架核心链路，获得自研 Agent 的能力。",
            explain: "拆开『乐高积木包』看内部齿轮是怎么咬合的，你就能自己设计新积木，而不是只会拼现成的。",
            criteria: "能讲清某框架一次工具调用的完整源码链路，或写出 100 行以内的自研 Agent。",
            link: "https://github.com/langchain-ai/langchain"
          },
          {
            title: "生产级部署与可观测性",
            type: "mastery",
            desc: "把 Agent 部署成服务，配置日志、监控、灰度与回滚。",
            explain: "从『实验室样品』到『上架商品』：要稳定、可监控、出问题能快速回滚，才算真正能用起来。",
            criteria: "把自己的 Agent 以 API 服务形式部署上线，并配置基础监控告警。",
            link: ""
          },
          {
            title: "多模态与自主 Agent 前沿",
            type: "reading",
            desc: "了解多模态 Agent、自主 Agent、Agent 平台等演进方向。",
            explain: "展望『能看会听、能自主跑任务』的下一代 Agent，知道行业往哪走，自己该往哪使劲。",
            criteria: "能综述 3 个以上前沿方向，并挑选 1 个做出小实验验证。",
            link: "https://github.com/openai/openai-agents-python"
          },
          {
            title: "从框架到自研：设计自己的 Agent 架构",
            type: "mastery",
            desc: "综合所学，独立设计并实现一个领域专用 Agent。",
            explain: "毕业设计：不靠现成积木，自己画出架构图并搭出『定制款』Agent——这才是精通的标志。",
            criteria: "完成一个自研 Agent 的设计文档 + 可运行实现，并能说明设计取舍。",
            link: ""
          }
        ]
      }
    ]
  }
];

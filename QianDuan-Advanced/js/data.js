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
const boards = [
  {
    id: "vue",
    title: "Vue 学习路线",
    icon: "💚",
    subtitle: "从入门到精通 · 5 个阶段、28 个知识点，零基础也能学会",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          {
            title: "认识 Vue 是什么",
            type: "reading",
            desc: "了解 Vue 是一个渐进式 JavaScript 前端框架，知道它解决什么问题",
            explain: "把网页想象成一块黑板：传统方式是你手动擦掉重写；Vue 就像给你一块「魔法黑板」，你只需声明「这里要显示什么」，数据一变页面自动跟着变，不用手动操作 DOM。",
            criteria: "能用一句话向别人解释「Vue 是什么、用来干嘛」，并说出它和原生 JS 写页面的最大区别",
            link: "https://cn.vuejs.org/guide/introduction.html"
          },
          {
            title: "搭建开发环境",
            type: "hands-on",
            desc: "安装 Node.js，用 create-vue 脚手架创建第一个 Vue 项目",
            explain: "就像学做饭先要备好锅和灶：Node.js 是运行前端工具的「灶台」，create-vue 是官方给的「菜谱模板」，一键就能把厨房（项目骨架）搭好，省去自己搬砖。",
            criteria: "能成功执行 `npm create vue@latest` 并运行 `npm run dev`，在浏览器看到 Vue 欢迎页",
            link: "https://cn.vuejs.org/guide/quick-start.html"
          },
          {
            title: "跑通第一个 Hello World",
            type: "hands-on",
            desc: "用模板语法在页面上渲染第一段数据",
            explain: "相当于你第一次用「魔法黑板」写字：在模板里写 `{{ message }}`，在数据里给 message 赋值，页面就显示出来了。数据是源头，页面只是它的倒影。",
            criteria: "能修改 message 变量并看到页面实时刷新，理解「数据驱动视图」的基本流程",
            link: "https://cn.vuejs.org/guide/essentials/template-syntax.html"
          },
          {
            title: "前置知识摸底",
            type: "reading",
            desc: "盘点学习 Vue 前需要掌握的 HTML/CSS/JavaScript 基础",
            explain: "学 Vue 之前至少要会 HTML（搭骨架）、CSS（上装修）、JS（做行为），就像学骑电动车前得先会骑自行车，这三样是基本功。",
            criteria: "能写出一个带样式的静态 HTML 页面，并会用 JS 操作 DOM（getElementById 等）",
            link: "https://developer.mozilla.org/zh-CN/docs/Learn"
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
            title: "响应式数据与 ref/reactive",
            type: "hands-on",
            desc: "掌握 Vue 3 的响应式核心：ref 和 reactive",
            explain: "数据就像遥控器上的按钮，ref/reactive 就是给普通数据装上「传感器」：你按按钮（改数据），电视（页面）自动换台，不用你亲自去拨频道。",
            criteria: "能说出 ref 和 reactive 的区别，并用它们实现一个计数器应用",
            link: "https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html"
          },
          {
            title: "模板语法与指令",
            type: "hands-on",
            desc: "掌握 v-bind、v-if、v-for、v-on 等常用指令",
            explain: "指令就是写在 HTML 上的「魔法标签」：v-if 是条件开关（满足才显示），v-for 是复印机（一份模板批量渲染列表），v-on 是接线员（绑定点击等事件）。",
            criteria: "能独立用 v-if/v-for/v-on/v-bind 完成一个待办列表的渲染和交互",
            link: "https://cn.vuejs.org/guide/essentials/template-syntax.html"
          },
          {
            title: "计算属性 computed 与侦听器 watch",
            type: "hands-on",
            desc: "学会用 computed 派生数据、用 watch 响应变化",
            explain: "computed 像「计算器」，输入变了它自动重算结果（比如购物车总价）；watch 像「监控摄像头」，你盯着某个数据，它一变就触发你要做的事。",
            criteria: "能区分 computed 和 watch 的适用场景，并用它们实现搜索过滤或表单联动",
            link: "https://cn.vuejs.org/guide/essentials/computed.html"
          },
          {
            title: "组件化开发",
            type: "hands-on",
            desc: "学会创建组件、传 props、发 emit 事件",
            explain: "组件就像乐高积木，每个积木有自己的形状和功能：通过「插槽口」（props）接收参数，通过「喊话」（emit）通知父级。大页面就是拼积木拼出来的。",
            criteria: "能封装一个可复用的子组件（如商品卡片），并通过 props/emit 与父组件通信",
            link: "https://cn.vuejs.org/guide/essentials/component-basics.html"
          },
          {
            title: "生命周期与模板引用",
            type: "reading",
            desc: "理解组件的生命周期钩子（onMounted 等）和模板 ref",
            explain: "组件从「出生」到「销毁」有固定的成长节点：创建、挂载到页面、更新、销毁。onMounted 就是「组件刚上户口时」要做的事，比如请求数据。",
            criteria: "能说出常用生命周期钩子的触发时机，并用 onMounted 发起接口请求",
            link: "https://cn.vuejs.org/guide/essentials/lifecycle.html"
          },
          {
            title: "工程结构与单文件组件 SFC",
            type: "hands-on",
            desc: "理解 .vue 文件结构（template/script/style）和项目目录组织",
            explain: "一个 .vue 文件就是把「骨架（结构）、脑子（逻辑）、衣服（样式）」三合一装进同一个文件，一个组件一个文件，好找好改。",
            criteria: "能看懂 Vue 项目目录结构，并能新建一个带 template/script/style 的 .vue 组件",
            link: "https://cn.vuejs.org/guide/introduction.html#single-file-components"
          },
          {
            title: "表单输入与事件处理",
            type: "practice",
            desc: "掌握 v-model 双向绑定和事件修饰符",
            explain: "v-model 是「对讲机」：输入框和 data 数据直接通话，你打字数据跟着变，数据变了输入框也变，省去手动取值的繁琐。",
            criteria: "能完成一个带校验的注册表单（用户名、密码、邮箱），并使用 .trim / .number 等修饰符",
            link: "https://cn.vuejs.org/guide/essentials/forms.html"
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
            title: "响应式原理",
            type: "reading",
            desc: "理解 Vue 3 基于 Proxy 的响应式实现原理",
            explain: "传统 Object.defineProperty 像「给每个属性装监控」，麻烦且慢；Proxy 像「在整栋楼门口装一个总监控」，任何进出都能被感知，更全面更高效。",
            criteria: "能解释为什么 Vue 3 用 Proxy 替代 Object.defineProperty，以及响应式失效的常见原因",
            link: "https://cn.vuejs.org/guide/extras/reactivity-in-depth.html"
          },
          {
            title: "组件通信的多种方式",
            type: "reading",
            desc: "掌握 provide/inject、插槽等通信手段",
            explain: "父子组件用 props 像「长辈给晚辈递东西」；provide/inject 像「公司食堂大家自己去取」；插槽像「给组件留个空位，外面的人往里面放内容」。",
            criteria: "能在跨层级场景下用 provide/inject 共享数据，并用具名插槽/作用域插槽做灵活布局",
            link: "https://cn.vuejs.org/guide/components/provide-inject.html"
          },
          {
            title: "路由 Vue Router",
            type: "hands-on",
            desc: "掌握 Vue Router 的路由配置、动态路由、导航守卫",
            explain: "路由就是网页的「导航系统」：告诉浏览器「用户点了这个链接，就切换到那个页面组件」。导航守卫是「安检口」，登录没登录都能在这拦截。",
            criteria: "能搭建一个多页面应用（首页/详情页/404），实现参数传递和登录守卫",
            link: "https://router.vuejs.org/zh/"
          },
          {
            title: "状态管理 Pinia",
            type: "hands-on",
            desc: "用 Pinia 管理跨组件共享的全局状态",
            explain: "多个组件要共享「购物车」这类数据时，Pinia 像一个「公共仓库」：谁都能存取，仓库一更新大家自动同步，不用层层传参。",
            criteria: "能用 Pinia 定义 store 并在多个组件中读取/修改共享状态",
            link: "https://pinia.vuejs.org/zh/"
          },
          {
            title: "组合式 API 与逻辑复用",
            type: "hands-on",
            desc: "掌握组合式函数 composables 的提取与复用",
            explain: "把一段重复的逻辑（比如「防抖搜索」）抽出来封装成函数，像「洗衣粉配方」，哪里需要倒哪里，代码不再到处复制粘贴。",
            criteria: "能自定义一个组合式函数（如 useDebounce / useFetch）并在多个组件中复用",
            link: "https://cn.vuejs.org/guide/reusability/composables.html"
          },
          {
            title: "常见坑与调试技巧",
            type: "reading",
            desc: "掌握响应式丢失、key 缺失、作用域样式等典型坑的排查",
            explain: "比如解构响应式对象会「断线」（数据变了视图不更新），列表不加 key 会让 Vue「认错人」导致状态错乱。知道坑在哪，调试就快一半。",
            criteria: "能说出至少 3 个 Vue 常见坑及解决办法，并会用 Vue Devtools 调试组件状态",
            link: "https://cn.vuejs.org/guide/best-practices/performance.html"
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
            title: "实战项目一：待办事项应用",
            type: "practice",
            desc: "从零实现增删改查、筛选、本地存储的 Todo 应用",
            explain: "待办应用是前端界的「Hello World 进阶版」，麻雀虽小五脏俱全：列表渲染、表单输入、组件拆分、本地存储全用上了。",
            criteria: "完成一个可增删改查、按状态筛选、刷新后数据不丢失的 Todo 应用",
            link: "https://cn.vuejs.org/tutorial/"
          },
          {
            title: "实战项目二：天气查询应用",
            type: "practice",
            desc: "结合 Axios 调第三方 API，掌握异步数据请求与加载态处理",
            explain: "你的页面要从「别人家」（服务器）拿数据：Axios 是快递员，请求是下单，返回是收货，还要处理「路上堵车」（loading）和「送错」（错误）的情况。",
            criteria: "能完成一个输入城市名查询天气的应用，包含 loading、错误提示和结果展示",
            link: "https://axios-http.com/zh/"
          },
          {
            title: "实战项目三：电商购物车",
            type: "mastery",
            desc: "综合运用 Pinia、路由、组件通信完成购物车全流程",
            explain: "把前面学的拼图全拼起来：商品列表页（列表渲染+请求）、购物车（Pinia 共享）、结算页（路由跳转），一个完整的「小商城」。",
            criteria: "能完成商品列表→加入购物车→购物车数量联动→结算跳转的完整流程，代码结构清晰",
            link: "https://cn.vuejs.org/examples/"
          },
          {
            title: "实战项目四：个人博客",
            type: "mastery",
            desc: "结合 Vue Router + Pinia + 组件库（Element Plus）开发完整博客系统",
            explain: "从需求拆解（页面有哪些）、UI 设计（组件库套壳）、数据管理（状态共享）、路由规划，走一遍真实项目的完整流程。",
            criteria: "完成包含文章列表、文章详情、标签分类、后台管理的博客系统并部署上线",
            link: "https://element-plus.org/zh-CN/"
          },
          {
            title: "项目部署",
            type: "hands-on",
            desc: "学会构建打包（npm run build）并部署到静态服务器",
            explain: "build 就是把你的源码「压缩打包」成浏览器直接能跑的最终产物，再传到服务器/静态托管（如 GitHub Pages、Vercel），别人就能访问了。",
            criteria: "能成功执行构建命令，并将产物部署到任一静态托管平台，线上可访问",
            link: "https://cn.vuejs.org/guide/best-practices/production-deployment.html"
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
            title: "性能优化",
            type: "reading",
            desc: "掌握虚拟列表、懒加载、代码分割等优化手段",
            explain: "页面卡顿就像商场拥堵，优化就是「分流」：长列表只渲染看得见的（虚拟列表）、图片用到再加载（懒加载）、代码按需下载（代码分割）。",
            criteria: "能对一个大列表应用虚拟滚动，并用 defineAsyncComponent 实现组件懒加载",
            link: "https://cn.vuejs.org/guide/best-practices/performance.html"
          },
          {
            title: "深入 Vue 源码",
            type: "reading",
            desc: "阅读 Vue 核心源码，理解渲染器、编译器与 diff 算法",
            explain: "当你理解「Vue 内部到底怎么把模板变成真实 DOM、怎么对比新旧节点差异最小化更新」，你就从「会用」上升到「懂它为什么这样设计」。",
            criteria: "能画出手写渲染流程（模板→虚拟 DOM→真实 DOM），并解释 key 在 diff 中的作用",
            link: "https://github.com/vuejs/core"
          },
          {
            title: "TypeScript 与 Vue",
            type: "hands-on",
            desc: "用 TypeScript 编写类型安全的 Vue 组件",
            explain: "TS 就是「给 JS 加上说明书」：写之前先声明变量是什么类型，编辑器能提前提示错误，避免把「数字」当「字符串」用出 bug。",
            criteria: "能用 `<script setup lang=\"ts\">` 编写带类型标注的组件，并通过 props 类型校验",
            link: "https://cn.vuejs.org/guide/typescript/overview.html"
          },
          {
            title: "组件库与生态扩展",
            type: "hands-on",
            desc: "熟练使用 Element Plus / Vant / Naive UI 等组件库",
            explain: "组件库是「现成的家具城」，按钮、弹窗、表格都做好了你直接搬回家用，不用自己打家具，把精力留给业务逻辑。",
            criteria: "能在项目中按需引入组件库并自定义主题，产出符合设计规范的界面",
            link: "https://element-plus.org/zh-CN/"
          },
          {
            title: "服务端渲染 SSR",
            type: "reading",
            desc: "理解 Nuxt 3 与 SSR/SSG 的原理和适用场景",
            explain: "普通 SPA 页面内容靠 JS 现场生成，搜索引擎「看不懂」；SSR 是在服务器先把页面煮好再端给用户，首屏更快、更利于 SEO。",
            criteria: "能用 Nuxt 3 创建项目并解释 SSR/SSG/SPA 三种模式的区别与选型",
            link: "https://nuxt.com/"
          },
          {
            title: "前端工程化与测试",
            type: "practice",
            desc: "掌握 Vite 构建工具配置与 Vitest 单元测试",
            explain: "工程化就像给工地配了「塔吊和质检员」：Vite 帮你秒速编译启动（塔吊），Vitest 自动检查每块砖（组件）有没有问题。",
            criteria: "能配置 Vite 别名/代理，并为关键组件编写 Vitest 单元测试且全部通过",
            link: "https://vitejs.dev/"
          }
        ]
      }
    ]
  },
  {
    id: "react",
    title: "React 学习路线",
    icon: "⚛️",
    subtitle: "从入门到精通 · 5 个阶段、28 个知识点，零基础也能学会",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          {
            title: "认识 React 是什么",
            type: "reading",
            desc: "了解 React 是一个用于构建用户界面的 JS 库，知道它的核心思想",
            explain: "React 像「装修公司的施工队长」：你只要告诉它「房子最终长什么样」（声明式 UI），它自己会算出怎么改最省力，自动把页面更新到那个样子。",
            criteria: "能说出 React 与「手动操作 DOM」的本质区别，并理解「声明式」的含义",
            link: "https://zh-hans.react.dev/learn"
          },
          {
            title: "搭建开发环境",
            type: "hands-on",
            desc: "用 Vite 或 create-react-app 创建第一个 React 项目",
            explain: "就像买了一套「宜家家具」，官方脚手架把配置全给你配好了，你只需要「拆箱组装」（写代码），不用自己研究螺丝刀型号（webpack/babel 配置）。",
            criteria: "能用 `npm create vite@latest` 选择 React 模板创建项目并启动成功",
            link: "https://zh-hans.react.dev/learn/start-a-new-react-project"
          },
          {
            title: "跑通第一个组件",
            type: "hands-on",
            desc: "创建第一个函数组件并在页面上渲染",
            explain: "React 世界里一切都是组件，就像搭乐高，第一个组件就是你的第一块积木。函数组件就是个「会返回 UI 的函数」，调用它页面就有内容。",
            criteria: "能创建并导出函数组件，在 App 中引入渲染，浏览器显示自定义内容",
            link: "https://zh-hans.react.dev/learn/your-first-component"
          },
          {
            title: "前置知识摸底",
            type: "reading",
            desc: "掌握 HTML/CSS/JS 基础与 ES6 常用语法",
            explain: "React 用 JSX（JS 里写 HTML）写界面，还会大量用到箭头函数、解构、模板字符串这些 ES6 语法，基础打牢了才不会「听天书」。",
            criteria: "能熟练使用箭头函数、解构赋值、展开运算符，并理解 map/filter 的作用",
            link: "https://zh-hans.react.dev/learn/javascript-in-jsx-with-curly-braces"
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
            title: "JSX 语法",
            type: "hands-on",
            desc: "掌握 JSX 的写法、表达式嵌入与条件渲染",
            explain: "JSX 就是在 JS 代码里直接写「类 HTML」，用大括号 {} 把 JS 表达式「插」进模板，页面就能显示动态内容，像在文档里用占位符填空。",
            criteria: "能用 JSX 渲染列表、在 {} 中嵌入表达式、用三元运算符实现条件渲染",
            link: "https://zh-hans.react.dev/learn/writing-markup-with-jsx"
          },
          {
            title: "Props 组件传参",
            type: "hands-on",
            desc: "学会用 props 向子组件传递数据",
            explain: "props 就像给子组件递「快递包裹」：父组件把数据打包好（props 对象）递给子组件，子组件打开包裹用里面的东西。",
            criteria: "能封装带 props 的组件（如 UserCard），并在多个父组件中复用",
            link: "https://zh-hans.react.dev/learn/passing-props-to-a-component"
          },
          {
            title: "State 状态管理",
            type: "hands-on",
            desc: "掌握 useState 管理组件内部状态",
            explain: "state 是组件的「记忆」，比如计数器当前数字。用 useState 声明，改它页面就自动重渲染，就像遥控器调音量，屏幕跟着变。",
            criteria: "能实现一个带 useState 的计数器/开关切换组件，并理解「不要直接修改 state」",
            link: "https://zh-hans.react.dev/learn/state-a-components-memory"
          },
          {
            title: "事件处理与表单",
            type: "hands-on",
            desc: "掌握 onClick/onChange 等事件与受控组件",
            explain: "受控组件就是「输入框的内容由 React 说了算」：用户打字 → onChange 更新 state → state 回填到输入框，数据流向是闭环的。",
            criteria: "能实现一个受控表单（用户名/密码输入），并提交时获取到所有值",
            link: "https://zh-hans.react.dev/learn/reacting-to-input-with-state"
          },
          {
            title: "列表渲染与 key",
            type: "hands-on",
            desc: "用 map 渲染列表并正确使用 key",
            explain: "key 是列表中每个项目的「身份证号」，React 靠它认出「谁是哪个」，改数据时才知道怎么精准更新，身份证重复就会出错。",
            criteria: "能用 map 渲染商品列表，正确设置稳定唯一的 key，并解释 key 的作用",
            link: "https://zh-hans.react.dev/learn/rendering-lists"
          },
          {
            title: "组件生命周期与副作用 useEffect",
            type: "hands-on",
            desc: "掌握 useEffect 处理副作用（数据请求、订阅、DOM 操作）",
            explain: "渲染是「做菜」，副作用是「洗菜、洗碗」等额外工作。useEffect 告诉 React：「做完这顿饭（渲染）后，记得去做这些事」。",
            criteria: "能理解 useEffect 的依赖数组，并用它实现挂载时请求数据、卸载时清理定时器",
            link: "https://zh-hans.react.dev/learn/synchronizing-with-effects"
          },
          {
            title: "工程结构与调试",
            type: "hands-on",
            desc: "理解 React 项目目录结构，掌握 DevTools 调试",
            explain: "React 项目通常有 src（源码）、public（静态资源）、配置文件等，就像厨房分「食材区、灶台区」。React DevTools 是「透视镜」，能看组件树和 state。",
            criteria: "能说出项目目录各文件夹作用，并用 React DevTools 检查组件 props/state",
            link: "https://zh-hans.react.dev/learn/react-developer-tools"
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
            title: "Hooks 进阶与自定义 Hook",
            type: "hands-on",
            desc: "深入 useState/useEffect 原理，学会封装自定义 Hook",
            explain: "自定义 Hook 就是「把一段带状态的逻辑打包成函数」，比如「鼠标位置」「网络请求」，一个 Hook 到处复用，像手机里的快捷指令。",
            criteria: "能自定义一个 Hook（如 useLocalStorage / useWindowSize）并在多组件复用",
            link: "https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks"
          },
          {
            title: "性能优化与 memo",
            type: "reading",
            desc: "掌握 memo、useMemo、useCallback 的使用场景",
            explain: "这三个是 React 的「省电模式」：memo 让没变的子组件跳过重渲染，useMemo 缓存计算结果，useCallback 缓存函数。乱用反而费电，要理解原理。",
            criteria: "能解释三者区别，并对确实频繁重渲染的组件应用合理优化（用 Profiler 验证）",
            link: "https://zh-hans.react.dev/reference/react/memo"
          },
          {
            title: "React Router 路由",
            type: "hands-on",
            desc: "掌握 React Router 的配置、动态路由与嵌套路由",
            explain: "路由是单页应用的「楼层导览图」：URL 变了，React 就「切换楼层」渲染对应页面，不用整页刷新，像电梯直达不同楼层。",
            criteria: "能搭建多页面应用（首页/详情/404），实现参数读取与嵌套路由布局",
            link: "https://reactrouter.com/"
          },
          {
            title: "状态管理方案",
            type: "reading",
            desc: "理解 Context 与 Zustand/Redux 的适用场景",
            explain: "多个组件共享数据时，Context 像「公司广播系统」（够用但广播全场），Zustand/Redux 像「集中资料室」（管理复杂状态更专业）。",
            criteria: "能用 Context 解决跨层级传值，并能用 Zustand 创建全局 store 管理状态",
            link: "https://zh-hans.react.dev/learn/scaling-up-with-reducer-and-context"
          },
          {
            title: "React 渲染机制",
            type: "reading",
            desc: "理解渲染、重新渲染、reconciliation 与 diff",
            explain: "React 渲染像「拍快照」：状态一变它就重拍一张「目标照片」，再和旧照片对比差异（diff），只改动画面上不同的地方，省时省力。",
            criteria: "能解释「为什么 setState 后组件会重新渲染」以及 key 在 diff 中的作用",
            link: "https://zh-hans.react.dev/learn/rendering"
          },
          {
            title: "常见坑与调试技巧",
            type: "reading",
            desc: "掌握闭包陷阱、依赖遗漏、state 批量更新等典型坑",
            explain: "比如 useEffect 依赖数组漏了变量、setState 异步导致读旧值、循环里用 index 当 key 导致状态错乱——这些都是面试和实战高频坑。",
            criteria: "能说出至少 3 个 React 常见坑及解决方案，并会用 Strict Mode 发现副作用问题",
            link: "https://zh-hans.react.dev/learn/you-might-not-need-an-effect"
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
            title: "实战项目一：待办事项应用",
            type: "practice",
            desc: "从零实现增删改查、筛选的 Todo 应用",
            explain: "待办应用是 React 必练的「基本功操」：state 管理、列表渲染、表单受控、组件拆分，一个项目把基础全串起来。",
            criteria: "完成可增删改查、按状态筛选的 Todo 应用，代码使用组件化结构",
            link: "https://zh-hans.react.dev/learn/thinking-in-react"
          },
          {
            title: "实战项目二：查询类应用",
            type: "practice",
            desc: "用 fetch 调第三方 API，掌握异步与 loading 处理",
            explain: "从服务器拿数据是「点外卖」：fetch 是下单，await 是等餐，loading 是「骑手配送中」，错误处理是「外卖洒了给差评再退款」。",
            criteria: "能完成一个查询类应用（输入→请求→loading→结果/错误展示），并封装成自定义 Hook",
            link: "https://zh-hans.react.dev/learn/you-might-not-need-an-effect"
          },
          {
            title: "实战项目三：电商购物车",
            type: "mastery",
            desc: "综合运用 Context/Zustand、路由、组件通信完成购物车全流程",
            explain: "商品列表页 + 购物车状态共享 + 结算路由跳转，把「声明式 UI + 状态 + 路由」三板斧在真实业务场景中连招。",
            criteria: "完成商品浏览→加购→数量增减→结算的完整流程，刷新后购物车数据保持",
            link: "https://reactrouter.com/"
          },
          {
            title: "实战项目四：中后台系统",
            type: "mastery",
            desc: "结合 React Router + 状态管理 + UI 组件库（Ant Design）开发完整系统",
            explain: "走一遍真实工程流程：需求拆解、组件设计、路由规划、数据流设计、联调部署，这是从「会写组件」到「会做项目」的分水岭。",
            criteria: "完成含列表、表单、详情、登录鉴权的中后台系统并部署上线",
            link: "https://ant.design/"
          },
          {
            title: "项目构建与部署",
            type: "hands-on",
            desc: "理解 npm run build 产物与部署流程",
            explain: "build 把源码压缩优化成「出厂成品」，部署就是把成品放到「货架」（服务器）上让顾客（用户）能买到，常用 Vercel/Netlify/GitHub Pages。",
            criteria: "能执行构建命令并把产物部署上线，能解释构建产物与源码的区别",
            link: "https://zh-hans.react.dev/learn/start-a-new-react-project"
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
            title: "深入源码与 Fiber 架构",
            type: "reading",
            desc: "理解 React Fiber 架构与并发特性",
            explain: "React 把渲染工作拆成可中断的小任务（Fiber），像「先做紧要的，琐碎的插空做」，所以页面不会卡死，这是 React 高性能的秘密。",
            criteria: "能解释 Fiber 是什么、为什么需要它，以及 useTransition 等并发特性的作用",
            link: "https://zh-hans.react.dev/learn/start-a-new-react-project"
          },
          {
            title: "性能优化实战",
            type: "practice",
            desc: "用 Profiler、React.memo、代码分割（React.lazy/Suspense）优化应用",
            explain: "性能优化像「给网页减肥健身」：懒加载是「按需吃饭」（用到才加载），Suspense 是「上菜前的缓冲垫」，Profiler 是「体检报告」。",
            criteria: "能用 React.lazy + Suspense 做路由级代码分割，用 Profiler 定位并解决一个性能瓶颈",
            link: "https://zh-hans.react.dev/reference/react/Profiler"
          },
          {
            title: "TypeScript 与 React",
            type: "hands-on",
            desc: "用 TS 编写类型安全的组件与 Hook",
            explain: "TS 给组件「上户口」：props 长什么样、返回值是什么类型，编辑器提前报错，大型项目里能少踩无数低级错误。",
            criteria: "能用 TS 定义 props 接口、useState 泛型，编写一个类型完整的组件",
            link: "https://zh-hans.react.dev/learn/typescript"
          },
          {
            title: "框架生态扩展：Next.js",
            type: "reading",
            desc: "理解 Next.js 的 SSR/SSG/App Router 与现代全栈开发",
            explain: "Next.js 让 React 从「纯前端」进化到「全栈」：可以在服务器渲染（SEO 友好）、可以直接写接口，是当前企业最主流的 React 框架。",
            criteria: "能用 Next.js 创建项目，说出 SSR/SSG/ISR 的区别并解释何时选用",
            link: "https://nextjs.org/"
          },
          {
            title: "测试与工程化",
            type: "practice",
            desc: "用 Vitest + Testing Library 编写组件测试",
            explain: "测试是「自动化质检员」：写好用例后每次改动自动跑一遍，功能有没有被改坏立刻知道，重构才敢大胆做。",
            criteria: "能为关键组件编写渲染与交互测试，测试全部通过且覆盖核心逻辑",
            link: "https://testing-library.com/"
          },
          {
            title: "React 19 新特性与生态前沿",
            type: "reading",
            desc: "了解 Actions、useOptimistic、Server Components 等新特性",
            explain: "React 一直在进化：新特性让「表单提交」「乐观更新」「服务端渲染」更简单。保持学习、跟上生态，是前端工程师的必修课。",
            criteria: "能说出 React 19 的 2-3 个新特性及其解决的问题，并动手体验一个",
            link: "https://zh-hans.react.dev/blog"
          }
        ]
      }
    ]
  }
];

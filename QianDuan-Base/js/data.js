// ===== study-kanban 数据层 =====
// 每个 board 是一个学习主题，对应一个左侧一级菜单 + 一个右侧五列看板。
// stage.id 从 1 开始递增（列序号）；stage.color 为该列主题色。
// item.type：reading(阅读理解) / hands-on(动手实操) / practice(练习巩固) / mastery(综合应用)
// item.link：可选官方文档链接（仅 http/https，浏览器新标签打开）。

const boards = [
  // ============================== 1. HTML ==============================
  {
    id: 'html',
    title: 'HTML',
    subtitle: '网页的骨架：从零开始搭建你的第一个网页',
    icon: '🌐',
    stages: [
      {
        id: 1,
        title: '入门',
        subtitle: '认识网页与 HTML 基础',
        color: '#3b82f6',
        items: [
          {
            title: '网页是怎么来的',
            type: 'reading',
            desc: '了解浏览器、网页文件与 HTML 的关系，认识 html 文件在网页开发中的角色。',
            explain: '网页就像一栋房子，HTML 是承重墙和房间结构，浏览器是帮你「打开房子大门」的工具。你写一个 .html 文件，双击它，浏览器就能把结构展示出来。',
            criteria: '能说清 HTML、CSS、JavaScript 各自的作用，并能区分一个 .html 文件与普通文本文件的差别。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web'
          },
          {
            title: '搭建第一个 HTML 页面',
            type: 'hands-on',
            desc: '动手创建 index.html，认识文档结构：DOCTYPE、html、head、body。',
            explain: '每个网页都有一个「固定剧本」：第一行告诉浏览器这是 HTML5，然后 <html> 包住全部，<head> 放幕后信息（如标题），<body> 放观众看得见的内容。',
            criteria: '自己动手新建一个 index.html，包含完整结构，浏览器打开能显示标题和一段文字。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started'
          },
          {
            title: '基础标签入门',
            type: 'hands-on',
            desc: '掌握最常用标签：h1-h6 标题、p 段落、a 链接、br 换行、注释。',
            explain: '标签像装修时的「积木」：<h1> 是大门牌，<p> 是段落，<a> 是通往别处的门。写标签就是「搭积木」，有开头 <p> 就要有结尾 </p>。',
            criteria: '写出一个含 3 个标题、2 个段落、1 个链接、若干注释的小页面，并能解释每个标签的用途。'
          }
        ]
      },
      {
        id: 2,
        title: '基础',
        subtitle: '文本、图片与链接',
        color: '#06b6d4',
        items: [
          {
            title: '文本与排版标签',
            type: 'practice',
            desc: '学习 strong、em、span、div 等标签，理解块级元素与行内元素的区别。',
            explain: 'div 像占满整行的「大箱子」，span 像贴纸一样只占自己大小。strong 加粗强调、em 斜体，它们负责让文字更有层次。',
            criteria: '能说出块级与行内元素各 3 个例子，并用 strong/em/span 给一段文字做强调排版。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals'
          },
          {
            title: '图片与链接详解',
            type: 'hands-on',
            desc: 'img 图片标签、src 与 alt 属性、a 链接的目标与内部锚点。',
            explain: 'img 的 src 告诉浏览器「图片在哪」，alt 是图片打不开时显示的「备用文字」；a 链接的 href 决定点击后去哪，还能用 #锚点 跳到页内指定位置。',
            criteria: '页面中插入一张本地图片（带 alt）和 2 个链接（一个跳外部网站、一个跳页内锚点），都能正常工作。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks'
          },
          {
            title: '列表与表格',
            type: 'hands-on',
            desc: '无序列表 ul、有序列表 ol、自定义列表 dl，以及 table 表格结构。',
            explain: '列表帮你把内容排成「清单」：ul 是圆点清单（没顺序），ol 是数字清单（有顺序）；表格则是「格子本」，用 tr 做行、td 做格、th 做表头。',
            criteria: '写出一个包含 ul、ol 的导航清单，以及一个 3 行 3 列的表格（含表头），浏览器显示正常。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Tables/Basics'
          }
        ]
      },
      {
        id: 3,
        title: '进阶',
        subtitle: '表单、语义化与媒体',
        color: '#8b5cf6',
        items: [
          {
            title: '表单与输入控件',
            type: 'hands-on',
            desc: 'form、input 的各种 type、textarea、select 下拉框、label 关联。',
            explain: '表单是网页的「答题卡」：input 是填空格（text 文本、password 密码、radio 单选、checkbox 多选），select 是选择题选项，提交按钮把答案交给服务器。',
            criteria: '做出一个注册表单：含文本、密码、单选、下拉、提交按钮，label 点击能聚焦对应输入框。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Your_first_form'
          },
          {
            title: '语义化标签',
            type: 'reading',
            desc: 'header、nav、main、section、article、footer 等语义化结构标签。',
            explain: '语义化就是给网页各部分贴上「功能标签」：顶部导航叫 nav，主内容叫 main，一篇文章叫 article。这样浏览器和搜索引擎一看就懂你的页面布局。',
            criteria: '能说出 6 个以上语义化标签的用途，并解释语义化对 SEO 和屏幕阅读器友好。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure'
          },
          {
            title: '音频、视频与嵌入',
            type: 'hands-on',
            desc: 'audio、video 标签，controls 属性，以及 iframe 嵌入外部内容。',
            explain: 'video 标签像网页里的「电视」，加上 controls 才有播放按钮；iframe 是在自己网页里「开一扇窗」显示别人的页面（如地图、B站视频）。',
            criteria: '页面成功播放一段本地 mp4 视频（带控制条），并用 iframe 嵌入一个外部网页或视频。'
          }
        ]
      },
      {
        id: 4,
        title: '实战',
        subtitle: '综合页面搭建',
        color: '#f59e0b',
        items: [
          {
            title: '搭一个完整页面结构',
            type: 'mastery',
            desc: '综合运用全部所学：导航 + 内容区 + 侧边栏 + 页脚，搭建一个完整网页。',
            explain: '就像盖房收尾：用 nav 搭导航、main 放文章、aside 放补充信息、footer 收尾，把之前学的标签全部串起来，形成一个结构清晰的完整页面。',
            criteria: '独立完成一个页面：含语义化结构、导航、正文、表格或列表、图片与链接，能顺畅浏览。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals'
          },
          {
            title: '表单进阶与校验',
            type: 'practice',
            desc: 'required 必填、type 校验（email、number）、placeholder 提示、maxlength 限制。',
            explain: '浏览器自带「小考官」：输入框标了 required 就必填，type=email 会自动检查格式对不对，placeholder 是灰色提示文字（像贴的便签）。',
            criteria: '表单中至少 3 个输入框应用了 required/type/placeholder，空提交会提示、邮箱格式错误会拦截。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Form_validation'
          },
          {
            title: '多页面网站初体验',
            type: 'hands-on',
            desc: '创建多个 html 文件，用相对路径互相跳转，理解网站目录结构。',
            explain: '一个网站像一个文件夹，多个 html 是多个房间，a 链接是房间之间的门。用相对路径（如 about.html 或 ./pages/contact.html）就能互相串门。',
            criteria: '创建至少 3 个互相链接的 html 页面（含子目录），首页能跳转到其它页面并能返回。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks'
          }
        ]
      },
      {
        id: 5,
        title: '精通',
        subtitle: 'HTML5 高级特性',
        color: '#10b981',
        items: [
          {
            title: '数据属性与本地存储',
            type: 'reading',
            desc: 'data-* 自定义属性、localStorage 简单读写、理解 HTML 与 JS 协作。',
            explain: 'data- 属性像给元素贴「私人便签」，JS 能读取；localStorage 是浏览器的小仓库，刷新页面数据不丢——这是很多网页功能的基石。',
            criteria: '能解释 data-* 属性用途，并说出 localStorage 的 setItem/getItem 基本用法。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API'
          },
          {
            title: 'HTML5 新增元素',
            type: 'reading',
            desc: 'canvas 画布、svg 矢量图、datalist、details、progress 等新元素扫盲。',
            explain: 'HTML5 像一次「装备升级」：canvas 是画板（配合 JS 画画），svg 是矢量图（放大不模糊），progress 是进度条、details 是手风琴折叠框，功能更强大。',
            criteria: '能说出 5 个 HTML5 新元素及其用途，页面中实际使用 1-2 个（如 details、progress）。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas'
          },
          {
            title: '综合项目：个人主页',
            type: 'mastery',
            desc: '独立完成一个包含完整结构、表单、媒体、多页面的个人主页项目。',
            explain: '这是你的「毕业设计」：把骨架（结构）、血肉（内容）、器官（表单）、皮肤（待 CSS 美化）都搭好，验收成果就是一个能用的个人网站。',
            criteria: '交付一个完整项目：多页面 + 表单 + 图片/视频 + 语义化结构，组织清晰、代码规范、命名合理。'
          }
        ]
      }
    ]
  },

  // ============================== 2. CSS ==============================
  {
    id: 'css',
    title: 'CSS',
    subtitle: '网页的皮肤与妆容：让页面从素颜到精致',
    icon: '🎨',
    stages: [
      {
        id: 1,
        title: '入门',
        subtitle: 'CSS 基础语法与选择器',
        color: '#3b82f6',
        items: [
          {
            title: 'CSS 是什么',
            type: 'reading',
            desc: '认识 CSS 的作用，学习三种引入方式：行内、内部、外部样式表。',
            explain: 'HTML 是素颜，CSS 是化妆师：颜色、大小、位置都归它管。最推荐「外部样式」——化妆师单独住一个 .css 文件，多个页面都能请她。',
            criteria: '能说出 CSS 的职责、三种引入方式及优缺点，推荐外部样式表并说明原因。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/First_steps/How_CSS_is_structured'
          },
          {
            title: '选择器与基本语法',
            type: 'hands-on',
            desc: '标签选择器、类选择器 .class、id 选择器 #id，属性与值的基本写法。',
            explain: '选择器就是「点名方式」：标签选择器叫「所有段落」，.类 选择器叫「所有穿了红色马甲的」，#id 选择器精准叫「某个特定的人」。',
            criteria: '用三种选择器分别设置不同样式，能说出类选择器和 id 选择器的使用区别。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors'
          },
          {
            title: '颜色与文本样式',
            type: 'practice',
            desc: 'color 文字颜色、背景颜色、font-size 字号、font-family 字体、text-align 对齐。',
            explain: '给网页「上妆」从文字开始：color 管字色、background 管底色、font-size 管字号大小、text-align 管左中右对齐，几步就让文字更好看。',
            criteria: '能用一个类选择器设置文字颜色、字号、字体和对齐方式，并理解颜色的英文名和十六进制写法。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_text/Fundamentals'
          }
        ]
      },
      {
        id: 2,
        title: '基础',
        subtitle: '盒模型与布局基石',
        color: '#06b6d4',
        items: [
          {
            title: '盒模型',
            type: 'reading',
            desc: '理解 content、padding、border、margin 四大组成部分。',
            explain: '每个元素都是一个「快递箱」：内容在最里面，padding 是箱内泡沫，border 是纸箱壁，margin 是箱子之间的间距。改哪层，空间就变哪块。',
            criteria: '能画出盒模型示意图并解释四层含义，说出 padding 与 margin 的区别。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model'
          },
          {
            title: '背景与边框',
            type: 'hands-on',
            desc: 'background-color、background-image、border 样式、border-radius 圆角。',
            explain: '背景能放纯色也能放图片，border 给元素描边（粗细、样式、颜色一起写），border-radius 把直角磨成圆角——按钮变「胶囊」全靠它。',
            criteria: '做出一个带背景图片、边框、圆角的卡片样式，能区分 border 简写属性的各部分含义。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Backgrounds_and_borders'
          },
          {
            title: '尺寸与间距控制',
            type: 'practice',
            desc: 'width/height、max-width、margin 简写、居中技巧（margin: auto）。',
            explain: '宽度高度是元素的「身材」，max-width 限制最大宽度防止溢出，margin: auto 是经典的水平居中魔法——左右间距自动平分。',
            criteria: '实现一个固定宽度的居中块元素，并理解 margin 简写（上下左右）的写法规则。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin'
          }
        ]
      },
      {
        id: 3,
        title: '进阶',
        subtitle: '布局与定位艺术',
        color: '#8b5cf6',
        items: [
          {
            title: 'Flex 弹性布局',
            type: 'hands-on',
            desc: 'display: flex、主轴与交叉轴、justify-content、align-items、flex 简写。',
            explain: 'Flex 是「自动排队的魔法师」：一行放不下会自动换行、间距自动分配，justify-content 控制水平排队，align-items 控制垂直对齐，做导航栏首选。',
            criteria: '用 Flex 实现一个水平导航栏（含 4 个菜单项）和一种居中方案（水平+垂直都居中）。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox'
          },
          {
            title: '定位 position',
            type: 'hands-on',
            desc: 'relative、absolute、fixed、sticky 四种定位方式与 z-index 层级。',
            explain: 'position 是「贴标签定位」：relative 相对自己原本位置微调，absolute 相对最近的定位祖先，fixed 钉死在屏幕（如返回顶部按钮），sticky 滚动时吸顶。',
            criteria: '实现一个 fixed 悬浮按钮、一个 absolute 定位的角标，并理解 z-index 的层级作用。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning'
          },
          {
            title: 'Grid 网格布局',
            type: 'reading',
            desc: 'display: grid、grid-template-columns 定义列、grid-gap 间距、网格区域。',
            explain: 'Grid 是把页面当「围棋棋盘」：先画好几行几列，再把内容放进格子里。做复杂页面（如后台、图库）比 Flex 更省心。',
            criteria: '能说出 Grid 与 Flex 的适用场景差异，用 grid-template-columns 实现一个 3 列布局。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Grids'
          }
        ]
      },
      {
        id: 4,
        title: '实战',
        subtitle: '动效与响应式',
        color: '#f59e0b',
        items: [
          {
            title: '过渡与变换',
            type: 'hands-on',
            desc: 'transition 过渡动画、transform 缩放/旋转/位移、hover 交互效果。',
            explain: 'transition 让变化「丝滑」：鼠标移上去颜色不是瞬间变而是慢慢变；transform 可以放大、旋转、移动元素，两者搭配就是最简单的动效。',
            criteria: '做一个按钮：hover 时背景渐变色 + 轻微上浮（transform: translateY），过渡时长 0.3s。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition'
          },
          {
            title: '关键帧动画',
            type: 'practice',
            desc: '@keyframes 定义动画、animation 属性、无限循环与延迟。',
            explain: 'transition 只有「开始→结束」，@keyframes 能定义中间过程：从 0% 到 100% 设置不同状态，loading 转圈、弹跳、闪烁都靠它。',
            criteria: '实现一个简单的 loading 旋转动画或弹跳动画（无限循环），并能说出 animation 的常用参数。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes'
          },
          {
            title: '响应式设计',
            type: 'mastery',
            desc: '媒体查询 @media、移动端优先、rem 单位、常见断点设置。',
            explain: '同一个网页要在手机、平板、电脑上都好看，就用 @media 问浏览器「屏幕多宽？」——宽屏排 3 列、窄屏排 1 列，像会变形的乐高。',
            criteria: '页面在窄屏（<768px）时变为单列、宽屏时为多列，用浏览器缩放验证两种效果都正常。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design'
          }
        ]
      },
      {
        id: 5,
        title: '精通',
        subtitle: 'CSS 高级技巧',
        color: '#10b981',
        items: [
          {
            title: '伪类与伪元素',
            type: 'reading',
            desc: ':hover、:nth-child、:not 等伪类，::before、::after 伪元素。',
            explain: '伪类给元素「装状态」（悬停、第几个），伪元素给元素「造零件」（::before 在内容前插个装饰，很多小图标用 CSS 就能画）。',
            criteria: '用 :nth-child 实现隔行变色列表，用 ::before/::after 实现一个纯 CSS 的小图标或装饰线。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements'
          },
          {
            title: 'CSS 变量与函数',
            type: 'hands-on',
            desc: '自定义属性 --var、calc() 计算、clamp() 自适应、min/max。',
            explain: 'CSS 变量像「配色备忘单」：在 :root 里定义 --主色，全站引用，改一处全站变色；calc() 能做计算（如 100% - 80px）。',
            criteria: '定义至少 3 个 CSS 变量并在多处理用，用 calc() 实现一个自适应宽度效果。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties'
          },
          {
            title: '综合项目：精致个人主页',
            type: 'mastery',
            desc: '为 HTML 项目加上完整 CSS：布局、配色、动效、响应式全部到位。',
            explain: '「精装交房」时刻：用 Flex/Grid 搭好结构，挑一套和谐配色，hover 动效拉满，手机上也完美展示——把前面所有招式用在一个项目里。',
            criteria: '交付一个样式完整的个人主页：响应式、含导航高亮、卡片 hover 动效、配色统一、代码整洁。'
          }
        ]
      }
    ]
  },

  // ============================== 3. JavaScript ==============================
  {
    id: 'javascript',
    title: 'JavaScript',
    subtitle: '网页的大脑：让页面真正"动"起来',
    icon: '⚡',
    stages: [
      {
        id: 1,
        title: '入门',
        subtitle: 'JS 初体验与语法',
        color: '#3b82f6',
        items: [
          {
            title: 'JavaScript 能做什么',
            type: 'reading',
            desc: '认识 JS 在网页中的地位：交互、动效、数据请求，了解 script 标签引入方式。',
            explain: 'HTML 是骨架、CSS 是皮肤、JS 是大脑：点击弹窗、轮播图、表单验证都是它。用 <script> 标签就能在页面里写 JS。',
            criteria: '能说出 JS 的三大作用，并在 html 中用 script 标签弹出一个 alert 提示框。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/What_is_JavaScript'
          },
          {
            title: '变量与数据类型',
            type: 'hands-on',
            desc: 'let/const 声明变量、基本类型：number、string、boolean、undefined、null。',
            explain: '变量是「带标签的盒子」：let 是可变盒子，const 是焊死的盒子。盒子里能装数字、文字、真假值等不同类型的东西。',
            criteria: '用 let 和 const 各声明变量并赋值，写出 5 种基本类型各一个例子，会使用 typeof 查看类型。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables'
          },
          {
            title: '运算符与模板字符串',
            type: 'practice',
            desc: '算术、比较、逻辑运算符，+ 拼接、模板字符串（反引号）插值。',
            explain: '运算符是「计算与比较符号」：+ - * / 算数，== 比较相等，&& 且 || 或；模板字符串用反引号 ` 加 ${} 把变量嵌进文字里，拼句子超方便。',
            criteria: '完成一段代码：用变量+模板字符串输出自我介绍，并演示比较运算符和逻辑运算符的用法。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Math'
          }
        ]
      },
      {
        id: 2,
        title: '基础',
        subtitle: '流程控制与函数',
        color: '#06b6d4',
        items: [
          {
            title: '条件与循环',
            type: 'hands-on',
            desc: 'if/else、switch 分支，for、while 循环，break/continue。',
            explain: '条件语句是「岔路口」：满足条件走这条路，否则走那条；循环是「复读机」：for 说好重复几次，while 说好重复到什么时候。',
            criteria: '用 if/else 判断一个分数的等级，用 for 循环输出 1 到 10，用 while 循环实现倒计时。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/conditionals'
          },
          {
            title: '函数与作用域',
            type: 'hands-on',
            desc: '函数声明与调用、参数与返回值、全局/局部作用域。',
            explain: '函数是「可复用的小机器」：给它原料（参数），它加工后给你结果（返回值）。作用域决定变量在哪个房间有效——房间里定义的门口拿不到。',
            criteria: '写一个带参数的求和函数并调用，写一个带返回值的函数，能解释全局与局部变量的区别。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Functions'
          },
          {
            title: '数组与对象',
            type: 'practice',
            desc: '数组的创建与常用方法（push、pop、length），对象属性的读写。',
            explain: '数组是「编号储物柜」：0、1、2 号柜子依次放东西；对象是「贴标签的收纳盒」：name: 张三、age: 18，靠属性名取东西。',
            criteria: '创建一个数组并增删元素、遍历输出；创建一个描述"人"的对象并读写属性。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays'
          }
        ]
      },
      {
        id: 3,
        title: '进阶',
        subtitle: 'DOM 操作与事件',
        color: '#8b5cf6',
        items: [
          {
            title: '认识 DOM 与查找元素',
            type: 'hands-on',
            desc: 'document.getElementById / querySelector、获取和修改元素内容与样式。',
            explain: 'DOM 是浏览器把网页变成的「元素地图」，document 是地图入口。getElementById 按身份证找人，querySelector 按 CSS 选择器找人，找到就能改内容改样式。',
            criteria: '能通过 JS 获取一个元素并修改其文字内容、颜色和尺寸，页面即时刷新变化。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents'
          },
          {
            title: '事件处理',
            type: 'hands-on',
            desc: 'addEventListener、click/input/mouseover 事件、event 对象。',
            explain: '事件是「用户和网页的对话」：点击一下（click）、输入文字（input）、鼠标经过（mouseover），JS 用 addEventListener 竖起耳朵监听并回应。',
            criteria: '实现一个按钮点击后改变页面文字、一个输入框实时显示输入内容的案例。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events'
          },
          {
            title: '创建与删除元素',
            type: 'practice',
            desc: 'createElement、appendChild、innerHTML 动态渲染列表。',
            explain: 'JS 能「现场造零件」：createElement 造新元素，appendChild 装进页面。做待办清单、动态列表，就是不断重复「造→装」。',
            criteria: '用 JS 动态生成一个包含 5 项的列表并插入页面，再实现点击按钮删除某一项。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement'
          }
        ]
      },
      {
        id: 4,
        title: '实战',
        subtitle: '异步与数据交互',
        color: '#f59e0b',
        items: [
          {
            title: '定时器与异步初识',
            type: 'reading',
            desc: 'setTimeout、setInterval、setInterval 清理，理解单线程与异步回调。',
            explain: 'JS 一次只做一件事，但可以用 setTimeout 说「晚点再做」，用 setInterval 说「每隔一会儿做一次」。倒计时、轮播图都靠它。',
            criteria: '实现一个每秒跳动一次的倒计时，并用 clearInterval 在归零时停止。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Introducing'
          },
          {
            title: 'JSON 与本地存储',
            type: 'hands-on',
            desc: 'JSON.parse/stringify、localStorage 存取、JSON 与对象的转换。',
            explain: 'JSON 是数据界的「通用语言」：对象能 JSON.stringify 打包成字符串存进 localStorage，取出来再 JSON.parse 还原成对象——刷新不丢数据。',
            criteria: '实现一个待办清单：添加的项目存 localStorage，刷新页面后依然存在。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/JSON'
          },
          {
            title: '综合小项目：待办清单',
            type: 'mastery',
            desc: '整合 DOM + 事件 + 数组 + 存储：做一个可增删、可标记完成、可统计的 Todo 应用。',
            explain: '你的第一个「小作品」：输入框添加任务（事件+数组）、点击勾选完成（DOM 操作）、刷新不丢（localStorage）、统计剩余数量。',
            criteria: 'Todo 应用功能完整：增删、勾选完成、剩余统计、数据持久化，界面清晰可交互。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started'
          }
        ]
      },
      {
        id: 5,
        title: '精通',
        subtitle: '现代 JS 与工程化',
        color: '#10b981',
        items: [
          {
            title: 'ES6+ 新特性',
            type: 'reading',
            desc: '箭头函数、解构赋值、展开运算符、模块 import/export。',
            explain: 'ES6 让 JS 更「好写」：箭头函数 () => 是函数简写，解构 [a,b]=arr 快速取数，展开 ...arr 展开数组，模块化让代码分文件管理。',
            criteria: '能写出箭头函数、解构赋值、展开运算符各一个示例，并说明它们相对旧写法的优势。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions'
          },
          {
            title: 'Promise 与 fetch',
            type: 'hands-on',
            desc: 'Promise 概念、async/await 语法、fetch 发起网络请求。',
            explain: '请求数据要等网络「快递」，Promise 就是快递单：状态有等待/成功/失败。async/await 让异步代码读起来像同步，fetch 是发快递的入口。',
            criteria: '用 fetch + async/await 请求一个公开 API 并展示返回数据，能处理请求失败的情况。',
            link: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Promises'
          },
          {
            title: '综合项目：动态交互应用',
            type: 'mastery',
            desc: '整合所学：数据请求 + DOM 渲染 + 事件 + 存储，做一个完整交互应用。',
            explain: '「毕业作品」：比如一个电影搜索/天气卡片/记账本——请求数据、渲染列表、搜索筛选、本地保存，把 JS 全部能力串成产品。',
            criteria: '交付一个完整可用的交互应用：含数据展示、用户交互、数据持久化，代码结构清晰、无报错。'
          }
        ]
      }
    ]
  }
];

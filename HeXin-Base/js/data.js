// study-kanban data —— 数据结构 + 设计模式 + 算法（3 个主题 3 个看板）
const boards = [
  {
    id: "data-structures",
    title: "数据结构学习路线",
    icon: "🧱",
    subtitle: "从零基础到融会贯通 · 5 阶段、25 个知识点，零基础也能学会",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          {
            title: "认识数据结构：存储与组织数据的方式",
            type: "reading",
            desc: "理解数据结构是什么、解决什么问题",
            explain: "数据结构就是「存放和组织数据的方式」。就像整理衣柜：同样的衣服，挂起来、叠起来、还是卷起来，取用效率完全不同。程序里数据怎么放，直接决定了程序快不快、省不省内存。",
            criteria: "能用自己的话解释什么是数据结构，并举出 3 个生活中的数据组织例子（如排队、书架、通讯录）。",
            link: "https://www.runoob.com/data-structures/data-structures-tutorial.html"
          },
          {
            title: "前置准备：选一门语言并搭好环境",
            type: "hands-on",
            desc: "安装 Python 或 C++ 等编程环境，能运行第一个程序",
            explain: "学数据结构要用代码「做实验」，就像学做饭要先有锅。推荐用 Python（简单易读，适合快速验证想法）或 C++（更贴近底层）。安装好编辑器，能打印出第一行输出即可。",
            criteria: "能在本机运行一个打印 Hello World 的小程序。",
            link: "https://www.python.org/"
          },
          {
            title: "时间复杂度与大 O 记号初识",
            type: "reading",
            desc: "学会粗略衡量一段代码的快慢",
            explain: "大 O 记号是程序员的「秒表」。它不精确计时，而是看数据量翻倍时用时大约翻几倍：O(n) 是线性增长——数据多 10 倍时间也多 10 倍；O(n²) 是平方增长——数据多 10 倍时间多 100 倍。",
            criteria: "能判断简单代码是 O(1)、O(n) 还是 O(n²)，并解释其含义。",
            link: "https://www.runoob.com/data-structures/data-structures-tutorial.html"
          },
          {
            title: "数组：最基础的数据结构",
            type: "hands-on",
            desc: "掌握数组的定义、下标访问和遍历",
            explain: "数组就像电影院的一排座位：座位号连续编号，报个号就能立刻找到位置（O(1)）。但插队或删除很麻烦，因为后面的人都要挪动（O(n)）。数组是绝大多数数据结构的「地基」。",
            criteria: "用代码创建数组，完成读取、修改、遍历，并说出下标访问为什么快。",
            link: "https://www.runoob.com/cprogramming/c-arrays.html"
          },
          {
            title: "链表：动态拼装的火车车厢",
            type: "reading",
            desc: "理解链表由「节点 + 指针」构成",
            explain: "链表像一列火车：每节车厢（节点）里装着一个数据，还连着下一节车厢（指针）。它不要求车厢挨着放（内存可分散），加一节车厢很方便，但想找某一节就得从车头一节节数过去。",
            criteria: "能画出单链表的节点结构图，并说出数组与链表的优缺点对比。",
            link: "https://www.runoob.com/data-structures/linkedlist.html"
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
            title: "数组增删改查与常见陷阱",
            type: "hands-on",
            desc: "用代码实现数组的插入、删除、查找、修改",
            explain: "在代码里给数组「排座位」：新来的人要坐中间，得先把后面的座位往后挪一位。动手写一遍，才能真切体会到 O(n) 的「挪动成本」从哪来。",
            criteria: "实现数组指定位置的插入和删除，并打印每次操作后的数组。"
          },
          {
            title: "实现单链表与双向链表",
            type: "hands-on",
            desc: "从零手写链表的插入、删除、遍历",
            explain: "手写链表就是「造火车」：先造车厢（节点类），再练习把车厢连上、拆下、从中间插入。写一遍比看十遍都管用，面试手撕题也常考它。",
            criteria: "实现一个链表类，支持头插、删除、按值查找，并测试通过。",
            link: "https://www.runoob.com/data-structures/linkedlist.html"
          },
          {
            title: "栈 Stack：后进先出",
            type: "hands-on",
            desc: "理解栈的 LIFO 特性并实现",
            explain: "栈像一叠盘子：只能从最上面拿，也只能放最上面——后放进来的先被拿走（LIFO）。函数调用、括号匹配、浏览器后退都靠它。",
            criteria: "实现 push / pop / peek，并用栈验证括号是否匹配。",
            link: "https://www.runoob.com/data-structures/stack-stack.html"
          },
          {
            title: "队列 Queue：先进先出",
            type: "hands-on",
            desc: "理解队列的 FIFO 特性并实现",
            explain: "队列像排队买奶茶：先来的人先买到，后来的人站后面（FIFO）。打印任务、消息队列、BFS 广度优先遍历都用它。",
            criteria: "实现 enqueue / dequeue，并用队列模拟打印任务的处理顺序。",
            link: "https://www.runoob.com/data-structures/queue-queue.html"
          },
          {
            title: "哈希表 Hash Table：空间换时间",
            type: "hands-on",
            desc: "掌握哈希表的原理与实现",
            explain: "哈希表像一个有编号的储物柜：给物品算出一个编号（哈希函数），就能 O(1) 找到它。它是「查重、计数、快速查找」的万能工具，但要注意哈希冲突（两个物品算出同一编号）。",
            criteria: "用哈希表统计一篇文章中每个单词的出现次数。",
            link: "https://www.runoob.com/data-structures/hash-table.html"
          },
          {
            title: "递归：函数自己调用自己",
            type: "reading",
            desc: "建立递归思维，理解基线条件与递归步骤",
            explain: "递归像俄罗斯套娃：打开一层，里面还是一个更小的套娃，直到最里面最小的那个（基线条件）停住。写递归要问两个问题：什么时候停？怎么把大问题变小？",
            criteria: "能用手写递归求 n 的阶乘和斐波那契第 n 项，并说明基线条件。",
            link: "https://www.runoob.com/data-structures/data-structures-tutorial.html"
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
            title: "二叉树与三种遍历",
            type: "hands-on",
            desc: "掌握前序、中序、后序遍历",
            explain: "二叉树像公司组织架构图：每个「领导」最多管两个「下属」（左孩子、右孩子）。遍历就是按不同顺序「点名」：先领导（前序）、先左再中再右（中序）、先孩子后领导（后序）。",
            criteria: "实现二叉树构建与前/中/后序遍历，打印顺序并画图验证。",
            link: "https://www.runoob.com/data-structures/binary-tree-traverse.html"
          },
          {
            title: "二叉搜索树 BST",
            type: "practice",
            desc: "理解左小右大的规则与查找效率",
            explain: "BST 是一棵「讲规矩」的树：左子树所有节点都比根小，右子树都比根大。查找就像玩「猜数字」：每走一步排除一半，效率从 O(n) 提升到 O(log n)。",
            criteria: "实现 BST 的插入、查找、删除，并验证中序遍历结果是升序的。",
            link: "https://www.runoob.com/data-structures/binary-search-tree.html"
          },
          {
            title: "堆 Heap 与优先队列",
            type: "practice",
            desc: "理解堆的父子关系和 top-k 应用",
            explain: "堆像一个「自动露出最值的杂物堆」：不保证整体有序，但保证堆顶永远是最值。取最值只要 O(1)，插入只要 O(log n)。找「最大的前 k 个」这类题它最拿手。",
            criteria: "用堆实现一个优先队列，并能取出一组数中最大的 3 个。",
            link: "https://www.runoob.com/data-structures/heap-storage.html"
          },
          {
            title: "图：邻接矩阵与邻接表",
            type: "hands-on",
            desc: "掌握图的两种存储方式",
            explain: "图是「多点连线」：地图、社交网络、任务依赖都是图。邻接矩阵像课程表（有边画√），邻接表像每人的好友名单。稀疏图用邻接表更省内存。",
            criteria: "分别用邻接矩阵和邻接表存储同一张图，并遍历输出每个节点的邻居。",
            link: "https://www.runoob.com/data-structures/data-structures-tutorial.html"
          },
          {
            title: "典型坑与调试清单",
            type: "reading",
            desc: "总结初学者的高频错误与排查方法",
            explain: "学数据结构常见的坑：数组越界（走到第 n 个座位外面）、链表断链（忘了把新节点指回去）、死循环（递归没有出口）、空指针（访问了没连上的车厢）。把这些坑记成「体检清单」，报错时逐条排查。",
            criteria: "能列出至少 5 个常见错误，并写出对应的排查步骤。"
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
            title: "用栈实现浏览器的前进/后退",
            type: "mastery",
            desc: "综合应用栈解决真实场景",
            explain: "浏览器后退就是「从栈顶弹页面」：访问新页面 push 进栈，后退 pop 出来。把两个栈配合起来就能模拟完整的前进后退，这是栈最经典的真实应用。",
            criteria: "实现一个支持 visit / back / forward 的迷你浏览器历史功能。"
          },
          {
            title: "用哈希表 + 链表实现 LRU 缓存",
            type: "mastery",
            desc: "综合应用哈希表 + 双向链表解决缓存淘汰",
            explain: "LRU（最近最少使用）像健身房储物柜：新东西放进来，放不下就先把最久没用的清掉。用「哈希表 + 双向链表」配合，能让查找和淘汰都接近 O(1)，是大厂高频手撕题。",
            criteria: "实现 get / put 均为 O(1) 的 LRUCache，并通过 LeetCode 146。",
            link: "https://leetcode.cn/problems/lru-cache/"
          },
          {
            title: "中缀表达式求值（栈的综合运用）",
            type: "mastery",
            desc: "用栈实现带括号的四则运算",
            explain: "把人类写的 1+2*(3-4) 交给程序算，要先转成后缀（逆波兰式）再用栈一步步求值。这是「栈」最硬核的实战，做通了你对栈的理解就通了。",
            criteria: "实现能处理 + - * / 和括号的表达式求值程序，并通过自测用例。",
            link: "https://leetcode.cn/problems/basic-calculator-ii/"
          },
          {
            title: "综合项目：图书管理系统",
            type: "mastery",
            desc: "用多种数据结构构建一个完整系统",
            explain: "把前面学的东西全部用上：书库用数组/链表存，按书名查用哈希表索引，借阅记录用队列，热门排行用堆。一个系统把「数据怎么放」和「怎么放才快」完整串起来。",
            criteria: "完成一个可运行的控制台图书管理系统，包含增删查改和统计功能。"
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
            title: "平衡二叉树：AVL 与红黑树",
            type: "reading",
            desc: "理解自平衡机制与旋转操作",
            explain: "BST 不「锻炼」会退化成链表（一直插递增数据）。AVL 每次插入都「量身高」做旋转保持平衡；红黑树放宽了要求，用颜色标记保证路径不会太长，HashMap 的树化用的就是它。",
            criteria: "能画出 AVL 一次左旋/右旋过程，并说出红黑树的 5 条性质。",
            link: "https://www.runoob.com/data-structures/avl-tree.html"
          },
          {
            title: "Trie 字典树",
            type: "practice",
            desc: "实现前缀匹配与词频统计",
            explain: "Trie 像一本「按字母分叉」的词典：root 是首页，每个字母一条路。输入法联想、敏感词过滤、自动补全都是它。查一个单词只要按字母走一遍，和词库大小无关。",
            criteria: "实现 Trie 的 insert / search / startsWith，并通过 LeetCode 208。",
            link: "https://leetcode.cn/problems/implement-trie-prefix-tree/"
          },
          {
            title: "并查集 Union-Find",
            type: "practice",
            desc: "解决连通性问题",
            explain: "并查集像「拉帮结派」：谁和谁是一伙的（合并），两个人是不是一伙的（查询）。朋友圈、判断图连通、岛屿问题都靠它，代码很短但思路巧妙。",
            criteria: "实现带路径压缩的并查集，并解决一道连通性题目。",
            link: "https://leetcode.cn/problems/number-of-provinces/"
          },
          {
            title: "树状数组与线段树",
            type: "reading",
            desc: "区间查询与更新的高级结构",
            explain: "线段树像把一段区间「切蛋糕」：切成两半再切两半，每个节点管一段。要问区间和、区间最值，它能在 O(log n) 内回答，还能同时修改。适合竞赛和复杂业务统计。",
            criteria: "能说出线段树与树状数组的适用场景区别，并实现区间求和查询。"
          },
          {
            title: "阅读经典源码与扩展方向",
            type: "reading",
            desc: "在真实工程中观察数据结构",
            explain: "Java 的 HashMap、Python 的 dict 内部都是精心设计的数据结构。读它们的源码，你会发现教科书里的每个结构都被优化过。继续深造可学：B+ 树（数据库索引）、跳表（Redis）。",
            criteria: "能说出 HashMap 在链表过长时的处理方式，并列出 3 个进阶方向。",
            link: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html"
          }
        ]
      }
    ]
  },
  {
    id: "design-patterns",
    title: "设计模式学习路线",
    icon: "🏗️",
    subtitle: "从零基础到融会贯通 · 5 阶段、25 个知识点，零基础也能学会",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          {
            title: "认识设计模式：前人的工程经验库",
            type: "reading",
            desc: "理解设计模式是什么、解决什么问题",
            explain: "设计模式就是程序员的「菜谱」：前辈们在大量项目中总结出的、被验证过的代码结构套路。就像装修师傅知道水电怎么走最合理，写代码也有成熟套路，照着用就能少踩坑。",
            criteria: "能说出 3 个生活中的「套路」例子，并解释设计模式的价值。",
            link: "https://refactoringguru.cn/design-patterns"
          },
          {
            title: "前置准备：掌握一门面向对象语言",
            type: "hands-on",
            desc: "准备 Java/Python/TS 环境并复习类与对象",
            explain: "设计模式建立在面向对象之上，得先会「造类和对象」，就像学搭积木得先认识积木块。推荐 Java 或 TypeScript，先把 class、继承、多态练熟。",
            criteria: "能用所选语言写出一个包含继承和重写的类，并成功运行。",
            link: "https://www.runoob.com/design-pattern/design-pattern-tutorial.html"
          },
          {
            title: "面向对象三大特性：封装、继承、多态",
            type: "reading",
            desc: "回顾 OOP 基础，为模式打地基",
            explain: "封装是把内部细节藏起来（黑箱）；继承是子类复用父类（子承父业）；多态是同一个方法在不同类里有不同表现（同样说「叫」，猫喵狗汪）。三大特性是几乎所有设计模式的「原料」。",
            criteria: "能分别举例说明三大特性，并指出它们各自解决了什么问题。"
          },
          {
            title: "SOLID 设计原则总览",
            type: "reading",
            desc: "建立衡量代码好坏的原则框架",
            explain: "SOLID 是五个原则的缩写：单一职责、开闭、里氏替换、接口隔离、依赖倒置。它们像健身的五节课，训练你写出「好改、好扩展、不容易坏」的代码。先混个脸熟，后面逐个深入。",
            criteria: "能列出 SOLID 五个原则的名字，并各用一句话解释。",
            link: "https://refactoringguru.cn/design-patterns/why-patterns"
          },
          {
            title: "何时该用、何时不该用模式",
            type: "reading",
            desc: "理解合理使用与过度设计的边界",
            explain: "模式不是越多越好！就像工具箱，你不会为拧一颗螺丝搬出整套工具。当代码出现「重复、难扩展、难以理解」时才是用模式的时机，否则就是过度设计。",
            criteria: "能说出使用模式的三个信号（重复/难扩展/难理解）和过度设计的坏处。",
            link: "https://refactoringguru.cn/design-patterns/what-is-pattern"
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
            title: "单一职责原则 SRP：一个类只做一件事",
            type: "practice",
            desc: "学会拆分职责",
            explain: "SRP 说一个类只该有一个「要改它的理由」。就像餐厅里切菜和炒菜各司其职，一个类既管数据又管界面还管打印，改一处就会牵动全身。",
            criteria: "把一段职责混杂的代码拆成多个单一职责的类。",
            link: "https://refactoringguru.cn/design-patterns/solid/srp"
          },
          {
            title: "开闭原则 OCP 与依赖倒置 DIP",
            type: "practice",
            desc: "对扩展开放、对修改关闭",
            explain: "OCP 说：加新功能最好「加新代码」而不是「改旧代码」。依赖倒置说要依赖抽象（接口）而不是具体实现。两者配合就像插线板——想加电器插新插头即可，不用改电箱。",
            criteria: "设计一个可扩展的支付接口，新增一种支付方式时旧代码零改动。"
          },
          {
            title: "单例模式 Singleton",
            type: "hands-on",
            desc: "保证一个类只有一个实例",
            explain: "单例像「全世界只有一个校长」：配置中心、日志器、数据库连接池，全程序共享一份就够了。要防止别人 new 出新实例，常见做法是私有构造函数 + 静态方法返回同一个实例。",
            criteria: "实现一个线程安全的单例，并验证两次获取返回同一对象。",
            link: "https://refactoringguru.cn/design-patterns/singleton"
          },
          {
            title: "工厂模式 Factory",
            type: "hands-on",
            desc: "把「创建对象」从业务中抽出来",
            explain: "工厂模式像点餐：你只要说「我要汉堡」，后厨（工厂）负责决定做哪种汉堡。调用方不用知道具体类名，加新品种只改工厂。简单工厂、工厂方法、抽象工厂三兄弟难度递增。",
            criteria: "用工厂方法创建不同类型的对象，并演示新增类型不修改调用方代码。",
            link: "https://refactoringguru.cn/design-patterns/factory-method"
          },
          {
            title: "建造者模式 Builder",
            type: "hands-on",
            desc: "分步构建复杂对象",
            explain: "建造者像「自助选配汽车」：轮胎、颜色、座椅可以一步步配置，最后统一交货。当对象参数很多、可选项很多时，比写一个超长构造函数清晰得多。",
            criteria: "实现一个 Builder，链式调用配置参数并构建出完整对象。",
            link: "https://refactoringguru.cn/design-patterns/builder"
          },
          {
            title: "适配器模式 Adapter",
            type: "hands-on",
            desc: "让不兼容的接口协同工作",
            explain: "适配器像「转接头」：苹果充电线插不上 Windows 电脑，加一个转接头就能用。老代码和新接口对不上时，写个适配器类在中间翻译，两边都不用改。",
            criteria: "为一个旧接口实现适配器，使其能适配新接口并正常运行。",
            link: "https://refactoringguru.cn/design-patterns/adapter"
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
            title: "装饰器模式 Decorator",
            type: "hands-on",
            desc: "动态叠加功能",
            explain: "装饰器像「给咖啡加料」：美式 + 奶 = 拿铁，+ 糖浆 = 焦糖拿铁。每次加料都「包一层」，功能层层叠加而不改原类。适合日志、缓存、权限等横切功能。",
            criteria: "用装饰器为对象动态叠加两种以上功能，并验证叠加顺序。",
            link: "https://refactoringguru.cn/design-patterns/decorator"
          },
          {
            title: "代理模式 Proxy",
            type: "hands-on",
            desc: "控制对真实对象的访问",
            explain: "代理像明星的经纪人：你想见明星得先通过经纪人，他可以加过滤、加延时、加监控。访问远程服务、懒加载、权限控制都是代理的常见应用。",
            criteria: "实现一个做懒加载或权限校验的代理，并验证拦截生效。",
            link: "https://refactoringguru.cn/design-patterns/proxy"
          },
          {
            title: "观察者模式 Observer",
            type: "hands-on",
            desc: "一对多的事件通知机制",
            explain: "观察者像「关注公众号」：你一发文（被观察者），所有关注者（观察者）自动收到推送，不用挨个去问。事件监听、消息订阅、MVC 里的 Model 通知 View 都是它。",
            criteria: "实现一个简单的发布订阅系统，多个订阅者能收到同一事件的通知。",
            link: "https://refactoringguru.cn/design-patterns/observer"
          },
          {
            title: "策略模式 Strategy",
            type: "hands-on",
            desc: "把算法族封装起来可切换",
            explain: "策略像「出行方式选择」：坐公交、打车、骑车都能到同一目的地，但每种算法不同、可随时切换。把 if-else 满天飞的代码改成「每种策略一个类」，扩展时零修改。",
            criteria: "用策略模式重构一个多分支促销计算，能动态切换不同折扣策略。",
            link: "https://refactoringguru.cn/design-patterns/strategy"
          },
          {
            title: "模板方法 Template Method",
            type: "practice",
            desc: "固定流程骨架，子类填空",
            explain: "模板方法像「做菜的固定流程」：先热锅、再倒油、最后翻炒——步骤固定，但「炒什么菜」由子类决定。父类定骨架，子类只重写变化的步骤。",
            criteria: "实现一个饮料制作模板（煮水-冲泡-加料），子类分别实现茶和咖啡。",
            link: "https://refactoringguru.cn/design-patterns/template-method"
          },
          {
            title: "模式辨析：相似模式的对比与误用排查",
            type: "reading",
            desc: "搞清容易混淆的模式边界",
            explain: "很多模式长得像：工厂 vs 建造者、代理 vs 装饰器、观察者 vs 策略。区别在于「目的」：代理管访问、装饰器管增强；观察者是通知、策略是选择。列出对比表，动手写一遍感受差异。",
            criteria: "能说出至少 3 组易混模式的本质区别，并各配一个应用场景。"
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
            title: "实战：策略模式重构支付系统",
            type: "mastery",
            desc: "支付宝/微信/银行卡可切换",
            explain: "把支付从 if(payType==alipay) 这种代码中解放出来：每种支付方式一个策略类，调用方传类型即切换。加新支付方式（如云闪付）不用动旧代码，完美演示开闭原则。",
            criteria: "完成支持 3 种支付方式、可动态扩展的支付系统。"
          },
          {
            title: "实战：观察者模式实现事件总线",
            type: "mastery",
            desc: "订单状态变化自动通知多个模块",
            explain: "电商下单后，库存要扣、短信要发、日志要记——让订单「喊一嗓子」（广播事件），各模块自己来听。这就是事件总线，代码解耦得干干净净。",
            criteria: "实现一个事件总线，下单后自动触发库存、短信、日志三个模块。"
          },
          {
            title: "实战：工厂 + 单例改造配置管理",
            type: "mastery",
            desc: "集中配置加载与对象创建",
            explain: "全局配置「只读一份」用单例；根据配置类型创建不同对象用工厂。两个模式组合，做出一个规范化的配置中心模块，这是很多框架的真实做法。",
            criteria: "实现一个配置中心：单例加载配置，工厂按配置创建不同数据源连接。"
          },
          {
            title: "综合项目：组合模式构建菜单树",
            type: "mastery",
            desc: "用树形结构统一处理叶子与容器",
            explain: "菜单、文件夹、组织架构都是树。组合模式让「叶子」和「文件夹」用同一套方法，遍历整棵树时不用区分类型。做一个可展开的菜单系统，直观感受它的威力。",
            criteria: "实现菜单树的构建与统一打印/统计，叶子与目录用同一接口处理。",
            link: "https://refactoringguru.cn/design-patterns/composite"
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
            title: "源码中的设计模式",
            type: "reading",
            desc: "在 JDK / Spring 等框架中寻找模式",
            explain: "JDK 的 Iterator 是迭代器模式、Spring 的 BeanFactory 是工厂 + 单例、Servlet 过滤器链是责任链。读源码找模式，等于站在大师肩膀上复习一遍，比死记模式强百倍。",
            criteria: "在熟悉的一个框架/库源码中指出至少 5 处设计模式的应用。",
            link: "https://refactoringguru.cn/design-patterns/catalog"
          },
          {
            title: "函数式编程与设计模式",
            type: "reading",
            desc: "用高阶函数替代传统模式的写法",
            explain: "有些模式在函数式语言里被「内建」了：策略模式约等于传一个函数参数，观察者约等于回调，装饰器约等于高阶函数。理解这层关系，模式就不再是一堆类，而是一种思想。",
            criteria: "用函数式写法（回调/高阶函数）重写策略或观察者模式，并说明异同。"
          },
          {
            title: "反模式与过度设计",
            type: "reading",
            desc: "识别坏味道与常见反模式",
            explain: "有正就有反：上帝类（什么都干）、面条代码（逻辑纠缠不清）、复制粘贴编程。学会识别坏味道，才知道该在哪儿动手用模式重构。",
            criteria: "能列出至少 5 种代码坏味道/反模式，并说明对应的改进方向。",
            link: "https://refactoringguru.cn/smells"
          },
          {
            title: "模式在架构与 DDD 中的演进",
            type: "reading",
            desc: "从类级模式上升到架构级思想",
            explain: "单例、工厂解决「类怎么写」，而分层架构、依赖注入、领域事件解决「系统怎么搭」。学习模式不要停在 GOF 23 种，要看到它们在微服务、DDD 里的思想延伸。",
            criteria: "能说明单例/工厂等在 Spring 容器或微服务架构中的演化形态。"
          }
        ]
      }
    ]
  },
  {
    id: "algorithms",
    title: "算法学习路线",
    icon: "🧠",
    subtitle: "从零基础到融会贯通 · 5 阶段、26 个知识点，零基础也能学会",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          {
            title: "认识算法：解决问题的步骤",
            type: "reading",
            desc: "理解算法是什么、如何衡量好坏",
            explain: "算法就是「解决问题的一步步操作」，像菜谱：把材料（输入）按步骤加工成菜（输出）。同一个问题可以有多种算法，谁更快、谁更省内存，就是算法设计的意义。",
            criteria: "能用自己的话定义算法，并描述一个生活中的算法（如煮泡面的步骤）。",
            link: "https://www.runoob.com/data-structures/data-structures-tutorial.html"
          },
          {
            title: "大 O 复杂度：算法的速度表",
            type: "reading",
            desc: "学会分析时间与空间复杂度",
            explain: "大 O 不看绝对秒数，看「数据翻倍时用时怎么变」。O(log n) 是「猜数字每次排除一半」的快，O(n²) 是「两层循环」的慢。写代码前先算复杂度，是合格程序员的直觉。",
            criteria: "能分析冒泡排序、二分查找的复杂度，并比较不同量级的快慢。",
            link: "https://www.runoob.com/data-structures/data-structures-tutorial.html"
          },
          {
            title: "环境准备：注册 LeetCode 并跑通第一题",
            type: "hands-on",
            desc: "搭建刷题环境",
            explain: "LeetCode 是程序员的「健身房」：上面有几千道题带自动评测机。注册账号（leetcode.cn），进题库把「两数之和」用暴力法写出来提交通过——恭喜，你完成了第一次「刷题」。",
            criteria: "在 LeetCode 提交并通过至少 1 道简单题。",
            link: "https://leetcode.cn/"
          },
          {
            title: "暴力枚举：最朴素的解法",
            type: "hands-on",
            desc: "用穷举法解第一个算法题",
            explain: "暴力法就是「把所有可能性都试一遍」：两数之和就两两相加试，找最大值就一个一个比。它慢但正确，是复杂算法的「保底答案」，也是理解优化的起点。",
            criteria: "用暴力法解出「两数之和」，并分析其 O(n²) 复杂度。",
            link: "https://leetcode.cn/problems/two-sum/"
          },
          {
            title: "冒泡排序：第一个排序算法",
            type: "hands-on",
            desc: "理解交换排序思想",
            explain: "冒泡像「轻的气泡往上浮」：相邻两个比较，大的往后换，一趟下来最大的沉到末尾。重复 n 趟就排好了。代码好写，但 O(n²) 太慢，只适合入门理解。",
            criteria: "手写冒泡排序，并跟踪打印每一趟的数组变化。",
            link: "https://www.runoob.com/data-structures/bubble-sort.html"
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
            title: "选择排序与插入排序",
            type: "hands-on",
            desc: "掌握两种基础排序",
            explain: "选择排序像「每次挑最小的」：第 i 趟从剩余里挑最小的放到位置 i。插入排序像「理扑克牌」：把新牌插到已排好的牌堆里正确位置。理解它们为学更快的排序打底。",
            criteria: "分别实现选择排序和插入排序，并说出各自的最好/最坏复杂度。",
            link: "https://www.runoob.com/data-structures/selection-sort.html"
          },
          {
            title: "归并排序：分而治之",
            type: "hands-on",
            desc: "掌握 O(n log n) 的排序",
            explain: "归并排序像「拆零件再组装」：把数组一分为二、二分为四……每部分排好序，再两两合并。它稳定且总是 O(n log n)，是「分治」思想的第一次实战。",
            criteria: "手写归并排序，画出分治递归树，并说明为什么是 O(n log n)。",
            link: "https://www.runoob.com/data-structures/merge-sort.html"
          },
          {
            title: "快速排序：工程最常用",
            type: "hands-on",
            desc: "掌握快排与分区思想",
            explain: "快排像「抽个基准，比它小的放左边、大的放右边」，然后左右各自再快排。平均 O(n log n)、常数小，很多语言内置排序的底层就是它（或改良版）。",
            criteria: "手写快速排序（含分区函数），分析平均与最坏复杂度。",
            link: "https://www.runoob.com/data-structures/quick-sort.html"
          },
          {
            title: "二分查找：有序世界的对半猜",
            type: "practice",
            desc: "掌握 O(log n) 查找",
            explain: "二分查找就是「猜数字游戏」：每次取中间比较，大了往左、小了往右，一步排除一半。前提是数据有序。它是面试里「变形题」最多的基础算法之一。",
            criteria: "实现二分查找，并完成「搜索插入位置」或「查找第一个 ≥ target 的位置」。",
            link: "https://leetcode.cn/problems/binary-search/"
          },
          {
            title: "双指针技巧",
            type: "practice",
            desc: "用两个指针优化遍历",
            explain: "双指针像「两只手配合」：一快一慢（快慢指针）、一左一右（对撞指针）。有序数组找两数之和、判断回文、原地去重，都能从 O(n²) 优化到 O(n)。",
            criteria: "用双指针解决「有序数组的两数之和」和「回文串判断」。",
            link: "https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/"
          },
          {
            title: "滑动窗口：子串问题的利器",
            type: "practice",
            desc: "维护一段动态区间",
            explain: "滑动窗口像「用手电筒在墙上扫描」：左右边界像个窗，窗内是当前子串，右指针扩展、左指针收缩。最长无重复子串、字符串覆盖都是它的经典题。",
            criteria: "用滑动窗口解决「无重复字符的最长子串」，并分析复杂度。",
            link: "https://leetcode.cn/problems/longest-substring-without-repeating-characters/"
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
            title: "递归与分治",
            type: "hands-on",
            desc: "把大问题拆成小问题",
            explain: "分治三步走：分解、解决、合并，归并排序就是分治。写递归要相信「子问题已经解决了」（递归假设），只关心当前层怎么把结果拼起来。",
            criteria: "用递归实现「求 x 的 n 次幂」，并画出递归调用树。",
            link: "https://leetcode.cn/problems/powx-n/"
          },
          {
            title: "回溯算法：走不通就回头",
            type: "practice",
            desc: "掌握 DFS + 撤销选择",
            explain: "回溯像走迷宫：往前走，发现此路不通就退回上一个路口换条路。排列、组合、子集、N 皇后都是它。核心三件套：做选择、递归、撤销选择。",
            criteria: "用回溯生成数组的全排列，并解决一道组合题。",
            link: "https://leetcode.cn/problems/permutations/"
          },
          {
            title: "动态规划入门",
            type: "practice",
            desc: "用子问题答案组装大问题",
            explain: "DP 像「盖楼」：每一层的答案由下面几层算出来并记住（备忘录），避免重复算。爬楼梯就是入门题：到第 n 阶 = 到第 n-1 阶 + 到第 n-2 阶。",
            criteria: "用 DP 解决爬楼梯和斐波那契，并写出状态转移方程。",
            link: "https://leetcode.cn/problems/climbing-stairs/"
          },
          {
            title: "贪心算法：每一步选当下最优",
            type: "practice",
            desc: "理解局部最优到全局最优",
            explain: "贪心像「每步吃最大的蛋糕」：只要问题保证局部最优能凑成全局最优就能用。找零钱（特定面额）、活动安排、跳跃游戏都是经典例子。不是所有题都能贪心，要验证。",
            criteria: "用贪心解决「跳跃游戏」或「分发饼干」，并说明贪心为什么成立。",
            link: "https://leetcode.cn/problems/jump-game/"
          },
          {
            title: "图的遍历：BFS 与 DFS",
            type: "hands-on",
            desc: "掌握图的两大遍历",
            explain: "DFS 像「一条路走到黑再回头」（递归）；BFS 像「一圈圈水波扩散」（队列）。找最短路径用 BFS，找路径是否存在用 DFS。迷宫、岛屿数量是经典练手题。",
            criteria: "用 BFS 求迷宫最短步数，用 DFS 求岛屿数量。",
            link: "https://leetcode.cn/problems/number-of-islands/"
          },
          {
            title: "最短路：Dijkstra 算法",
            type: "practice",
            desc: "带权图求单源最短路径",
            explain: "Dijkstra 像「从家出发，一圈圈向外找最近的加油站」：每次从未确定点里挑距离最近的点确定下来，再更新邻居。配合优先队列（堆）能达到很高的效率。",
            criteria: "实现 Dijkstra 求单源最短路，并解决一道最短路题目。",
            link: "https://leetcode.cn/problems/network-delay-time/"
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
            title: "高频题专题：两数之和 → 三数之和",
            type: "mastery",
            desc: "从哈希到双指针的思维升级",
            explain: "同一系列题由浅入深：两数之和用哈希表 O(n)；三数之和排序 + 双指针 O(n²)。做完这一串，你会强烈感受到「数据结构和算法配合」的威力。",
            criteria: "独立 AC 两数之和、三数之和，并能讲清各自的核心技巧。",
            link: "https://leetcode.cn/problems/3sum/"
          },
          {
            title: "DP 实战：0-1 背包问题",
            type: "mastery",
            desc: "动态规划的进阶应用",
            explain: "背包问题像「行李箱装东西」：每个物品要么装要么不装，容量有限怎么装价值最高。它是 DP 的「分水岭」题目，吃透它，后面的 DP 题大都触类旁通。",
            criteria: "独立写出 0-1 背包的 DP 代码，并解决「分割等和子集」等变体。",
            link: "https://leetcode.cn/problems/partition-equal-subset-sum/"
          },
          {
            title: "拓扑排序：任务依赖编排",
            type: "mastery",
            desc: "处理有依赖关系的顺序问题",
            explain: "拓扑排序像「课程表」：先修课没上完，后续课不能上。把依赖画成图，用入度 + BFS 或 DFS 排出合法顺序，环检测也靠它。",
            criteria: "用拓扑排序解决「课程表」题目，并正确处理有环的情况。",
            link: "https://leetcode.cn/problems/course-schedule/"
          },
          {
            title: "综合项目：迷你搜索引擎",
            type: "mastery",
            desc: "倒排索引 + 排序 + 搜索",
            explain: "把零散知识组装成一个小产品：建文档库 → 分词 → 构建倒排索引（哈希表/字典树）→ 输入关键词 → 检索并按相关度排序。麻雀虽小五脏俱全，是你学习成果的「毕业设计」。",
            criteria: "实现一个可运行的迷你搜索引擎：能对 20+ 文档检索关键词并按相关度排序。"
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
            title: "高级动态规划",
            type: "reading",
            desc: "状态压缩、树形 DP、区间 DP",
            explain: "当状态维度太多需要压缩：位运算状态压缩（旅行商）、树上做 DP（打家劫舍 III）、区间划分 DP（戳气球）。这些是竞赛与高难度面试的「杀手锏」。",
            criteria: "能理解并实现一种高级 DP（如状态压缩），并说明适用场景。",
            link: "https://leetcode.cn/problems/burst-balloons/"
          },
          {
            title: "字符串算法：KMP",
            type: "reading",
            desc: "模式匹配的经典算法",
            explain: "KMP 像「带着预习笔记去匹配」：失配时不回退主串，用 next 数组（前缀表）跳到已知的匹配位置。理解 next 数组怎么求，是字符串算法进阶的敲门砖。",
            criteria: "能手工推导一个字符串的 next 数组，并解释 KMP 为什么是线性时间。",
            link: "https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/"
          },
          {
            title: "扩展结构算法：Trie、线段树、并查集",
            type: "reading",
            desc: "扩充算法工具库",
            explain: "Trie 管前缀、线段树管区间、并查集管连通。每个都有标志性的应用场景，把「什么场景用什么工具」这张表记牢，算法能力才算成体系。",
            criteria: "能说出三种高级结构的适用场景，并各实现一个核心操作。"
          },
          {
            title: "刷题策略与竞赛视野",
            type: "reading",
            desc: "科学的刷题方法与进阶方向",
            explain: "刷题不是题海战术：按专题刷（先排序→再二分→再双指针）、写总结模板、定期复习。进阶可参加周赛、看题解区「一题多解」，再到 ICPC/蓝桥杯等竞赛历练。",
            criteria: "制定一份自己的 4 周刷题计划，并坚持完成至少 20 题。",
            link: "https://leetcode.cn/contest/"
          },
          {
            title: "复杂度证明与工程应用",
            type: "reading",
            desc: "从「会写」到「会证、会用」",
            explain: "精通不止会写：能证明贪心正确性、能分析均摊复杂度（如动态数组扩容）、能把算法思想用到业务（推荐、调度、风控）。推荐精读《算法导论》与《编程珠玑》。",
            criteria: "能给出一个算法的正确性/复杂度证明，并说出它在真实系统中的一个应用。",
            link: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/"
          }
        ]
      }
    ]
  }
];

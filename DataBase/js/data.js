// study-kanban data — 三数据库学习路线（SQL Server / Oracle / MySQL）
// 结构见 SKILL.md：固定五阶段 入门→基础→进阶→实战→精通，每项含 explain 通俗讲解。
const boards = [
  {
    id: "sqlserver",
    title: "SQL Server 学习路线",
    icon: "🗄️",
    subtitle: "从入门到精通 · 5 阶段、32 个知识点，零基础也能学会",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          {
            title: "数据库与关系型数据库是什么",
            type: "reading",
            desc: "理解数据库、DBMS、表、行、列、主键等基础概念",
            explain: "把数据库想象成一个「超级 Excel」：里面有很多工作表（表），每张表有表头（列名）和一行行数据（行）。关系型数据库就是按这种「表 + 表之间用共同字段关联」的方式来存数据的仓库，SQL Server 就是帮我们管理这个仓库的软件。",
            criteria: "能用一句话向别人解释什么是关系型数据库，能说出表、行、列、主键的含义并举例",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/databases/databases"
          },
          {
            title: "SQL Server 是什么、能解决什么问题",
            type: "reading",
            desc: "认识 SQL Server 在软件世界的定位与典型使用场景",
            explain: "SQL Server 是微软出品的关系型数据库管理系统，就好比一个「24 小时营业的图书馆管理员」：帮你把书（数据）分门别类放好，谁要借（查询）、谁要还（更新）、谁想新进书（插入）都由它统一管理，还能保证多人同时使用时不出乱子。",
            criteria: "能说出 SQL Server 的 3 个典型使用场景，并能说明它和 Excel 的区别",
            link: "https://learn.microsoft.com/zh-cn/sql/sql-server/sql-server-technical-documentation"
          },
          {
            title: "安装 SQL Server 与 SSMS",
            type: "hands-on",
            desc: "下载安装 SQL Server 开发版（Developer/Express）和 SSMS 图形工具",
            explain: "装 SQL Server 就像给电脑装一个「数据仓库」，SSMS（SQL Server Management Studio）则是仓库的「控制面板」——所有建库、建表、写查询都可以在图形界面里点来点去完成，不用记黑窗口命令。",
            criteria: "成功安装 SQL Server 并用 SSMS 连上本机实例，能看到服务器名称显示在对象资源管理器中",
            link: "https://learn.microsoft.com/zh-cn/sql/ssms/download-sql-server-management-studio-ssms"
          },
          {
            title: "连接数据库并执行第一条 SQL",
            type: "hands-on",
            desc: "在 SSMS 中新建查询，跑通第一条 SELECT 语句",
            explain: "连上服务器后，SSMS 的「新建查询」窗口就像数据库的「对话输入框」。你输入一句人话般的指令（比如 SELECT 1），点执行，数据库就把结果回给你——这是你与数据库的第一次正式对话。",
            criteria: "在 SSMS 中成功执行 SELECT 1 或 SELECT GETDATE()，并能在结果窗格看到输出",
            link: "https://learn.microsoft.com/zh-cn/sql/tools/ssms/quickstarts/ssms-connect-query-sql-server"
          },
          {
            title: "认识 SSMS 界面与对象资源管理器",
            type: "hands-on",
            desc: "熟悉对象资源管理器中的数据库、表、视图等节点",
            explain: "对象资源管理器是 SSMS 左边的「目录树」，就像文件资源管理器：数据库是「文件夹」，里面的表、视图、存储过程是「子文件夹」。学会在这里展开、查找对象，是日常操作的地基。",
            criteria: "能通过对象资源管理器找到系统数据库 master，并展开任意用户数据库看到「表」节点",
            link: "https://learn.microsoft.com/zh-cn/sql/ssms/object-explorer"
          },
          {
            title: "前置准备：SQL 语言三大类（DDL/DML/DQL）",
            type: "reading",
            desc: "分清建库建表（DDL）、增删改（DML）、查询（DQL）三种 SQL",
            explain: "SQL 就像一门「指挥数据库的话」，分三句常用语：DQL 是「问」（查询，SELECT）、DML 是「改内容」（INSERT/UPDATE/DELETE）、DDL 是「盖房子/装修」（建库建表，CREATE/ALTER/DROP）。先分清这三类，后面学什么都不会迷路。",
            criteria: "能正确判断 CREATE、SELECT、INSERT 分别属于 DDL、DQL、DML 中的哪一类",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/language-reference"
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
            title: "SELECT 查询基础：列选择与别名",
            type: "practice",
            desc: "掌握 SELECT 基本语法、选择多列、AS 起别名",
            explain: "SELECT 就是「把数据拿出来看看」。你可以指定要哪几列（像只看表格里的某几格），还可以用 AS 给列起个临时小名（别名），让结果更好读——这就像给文件重命名成你记得住的名字。",
            criteria: "能从示例表中选出指定列并正确使用 AS 别名，结果列名显示为别名",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/queries/select-transact-sql"
          },
          {
            title: "WHERE 条件过滤与运算符",
            type: "practice",
            desc: "用 WHERE 过滤行，掌握 =、>、<、LIKE、IN、BETWEEN",
            explain: "WHERE 是「筛子」：只保留满足条件的行。比如想看 2024 年之后的订单，就写 WHERE 日期 > '2024-01-01'。LIKE 是模糊匹配（名字像不像）、IN 是「在一堆值里」、BETWEEN 是「在区间内」，都是筛子上的不同孔眼。",
            criteria: "能用 WHERE + 至少 3 种运算符写出正确过滤查询，且结果与手工核对一致",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/queries/where-transact-sql"
          },
          {
            title: "ORDER BY 排序与 TOP / OFFSET 分页",
            type: "practice",
            desc: "给查询结果排序，并用 TOP、OFFSET-FETCH 实现分页",
            explain: "ORDER BY 就像把名单按成绩从高到低排队；TOP 是「只要前几名」，OFFSET-FETCH 是「跳过前 N 行再取 M 行」——这正是网页上「第 1 页、第 2 页」的实现方式。",
            criteria: "能写出按指定列升降序排序的查询，并用 OFFSET-FETCH 实现第 2 页数据",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/queries/select-order-by-clause-transact-sql"
          },
          {
            title: "数据类型与 CREATE TABLE 建表",
            type: "hands-on",
            desc: "掌握 INT、VARCHAR、DATETIME 等常用类型并实际建表",
            explain: "建表就是给仓库设计「储物格」：每列要声明装什么类型的东西——数字（INT）、文字（VARCHAR）、时间（DATETIME）。类型定对了，数据不会乱，就像储物格分好了放书的、放衣服的。",
            criteria: "能用 CREATE TABLE 独立建一张含主键、至少 4 个字段（含文本和数字类型）的表，并在对象资源管理器中看到它",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/statements/create-table-transact-sql"
          },
          {
            title: "INSERT / UPDATE / DELETE 增删改",
            type: "practice",
            desc: "掌握向表插入、修改、删除数据的三种 DML 语句",
            explain: "数据仓库不是摆设，要能进能出：INSERT 是「进货」（加一行），UPDATE 是「改价签」（改某几行），DELETE 是「下架」（删某几行）。记住：写 UPDATE/DELETE 一定带 WHERE，否则会把整张表都改了——这是新手第一大事故。",
            criteria: "能独立完成对一张表的增删改操作，且知道不带 WHERE 的 UPDATE/DELETE 会有多危险",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/queries/data-modification-language-dml-statements"
          },
          {
            title: "主键、外键与约束",
            type: "reading",
            desc: "理解 PRIMARY KEY、FOREIGN KEY、UNIQUE、NOT NULL 的作用",
            explain: "主键是每行数据的「身份证号」，保证不重不漏；外键是「关系纽带」，把这张表的某列和另一张表的主键连起来（比如订单表里的客户编号指向客户表）；约束就是各种「规定」，比如不允许为空、不允许重复——数据库用它来替你守规矩。",
            criteria: "能解释主键与外键的区别，并在两表之间设计一个正确的外键关联",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/tables/primary-and-foreign-key-constraints"
          },
          {
            title: "聚合函数与 GROUP BY / HAVING",
            type: "practice",
            desc: "用 COUNT、SUM、AVG、MAX、MIN 汇总数据，按组统计",
            explain: "聚合函数是「算总账」：一共多少条（COUNT）、一共多少钱（SUM）、平均分多少（AVG）。GROUP BY 是按类别分组再算（比如按部门统计人数），HAVING 是对分组后的结果再筛选（比如只留人数大于 10 的部门）。",
            criteria: "能用 GROUP BY + 聚合函数完成「按某列分组的汇总统计」，并用 HAVING 过滤分组",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/queries/select-group-by-transact-sql"
          },
          {
            title: "多表连接 JOIN",
            type: "practice",
            desc: "掌握 INNER JOIN / LEFT JOIN 将多张表的数据关联起来",
            explain: "现实中数据拆在多张表里，JOIN 就是「拼图」：按共同的字段（比如客户编号）把两张表拼成一张大表。INNER JOIN 只要两边都有的（有订单也有客户的）；LEFT JOIN 以左表为准，右表没有就填空（比如列出所有客户，哪怕他没下过单）。",
            criteria: "能写出 INNER JOIN 与 LEFT JOIN 查询并解释结果差异，理解 ON 连接条件的含义",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/queries/from-transact-sql"
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
            title: "索引原理与创建",
            type: "reading",
            desc: "理解索引如何加速查询，掌握 CREATE INDEX",
            explain: "索引就像书的「目录」：没有目录要一页页翻（全表扫描），有了目录直接翻到对应页码（索引查找）。给经常查询的列建索引能大幅提速，但索引也占空间、会拖慢写入，所以要「好钢用在刀刃上」。",
            criteria: "能用 CREATE INDEX 为指定列建索引，并解释为什么索引能加速查询、又有何代价",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/indexes/indexes"
          },
          {
            title: "视图 View",
            type: "hands-on",
            desc: "把常用查询保存为视图，像表一样使用",
            explain: "视图就是「存起来的查询」，像一个虚拟表：你把一段老写的复杂查询保存成视图，以后直接 SELECT 视图名即可。它不存真实数据，只是每次查询时替你执行背后的 SQL——相当于把常用菜谱写成便签贴墙上。",
            criteria: "能创建视图并对其查询，能解释视图不保存数据的特性",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/views/views"
          },
          {
            title: "存储过程 Stored Procedure",
            type: "hands-on",
            desc: "把 SQL 逻辑封装成可重复调用的存储过程",
            explain: "存储过程是「打包好的 SQL 程序」：把多条语句、判断、循环写在一起存进数据库，调用时只传参数即可（EXEC 过程名 @参数）。好处是复用、安全（不直接暴露表）、性能好——就像给常用操作录了个「宏」。",
            criteria: "能创建带输入参数的存储过程并调用，能在其中使用 IF 判断与返回结果集",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/stored-procedures/stored-procedures-database-engine"
          },
          {
            title: "事务与 ACID",
            type: "reading",
            desc: "理解事务的原子性、一致性、隔离性、持久性",
            explain: "事务是把「一组操作打包成一件不可分割的事」：要么全部成功，要么全部回滚。比如转账 = 扣钱 + 加钱，两步必须一起完成。ACID 四个字母分别是：全部做或全不做（原子）、数据始终合理（一致）、互不干扰（隔离）、做完不丢（持久）。",
            criteria: "能说出 ACID 的含义，并用 BEGIN TRAN / COMMIT / ROLLBACK 演示一个带错误回滚的事务",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/language-elements/transactions-transact-sql"
          },
          {
            title: "触发器 Trigger",
            type: "reading",
            desc: "理解在 INSERT/UPDATE/DELETE 时自动执行的触发器",
            explain: "触发器是「守卫」：当某张表发生增删改时，数据库自动帮你执行一段预设逻辑（比如记录日志、更新库存）。它很强大但也要克制使用——触发器里的逻辑出错，可能让原本简单的写入直接失败，调试起来也较隐蔽。",
            criteria: "能创建 AFTER 触发器（如写操作后自动记录日志）并验证其自动触发",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/triggers/dml-triggers"
          },
          {
            title: "窗口函数 ROW_NUMBER / RANK 等",
            type: "practice",
            desc: "用 OVER(PARTITION BY ... ORDER BY ...) 实现排名与分组内计算",
            explain: "窗口函数是「带着上下文计算」：不合并行，而是给每一行算一个值（比如按部门给每个人排名）。ROW_NUMBER 是编号、RANK 是允许并列排名——它解决了「每组取前 N 名」这类 GROUP BY 搞不定的问题。",
            criteria: "能用 ROW_NUMBER() OVER(PARTITION BY ...) 实现「每个分组内取前 N 条」的查询",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/queries/select-over-clause-transact-sql"
          },
          {
            title: "常见坑与排查清单",
            type: "reading",
            desc: "避开空值 NULL、字符串拼接、大小写、死锁等新手高频坑",
            explain: "新手常踩的坑有：NULL 参与运算结果全是 NULL（要用 IS NULL 判断）、字符串拼数字类型不匹配、忘记带 WHERE 全表更新、死锁导致超时。记住这几条「避雷指南」，配合错误信息里的行号逐条排查，能省下大量排查时间。",
            criteria: "能说出至少 4 个新手高频坑及其规避方法，遇到报错能根据错误码定位大致原因",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/functions/functions"
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
            title: "项目：图书馆借阅管理系统",
            type: "mastery",
            desc: "从建库建表到查询统计，完整实现一个可运行的图书借阅库",
            explain: "把前面所有知识串起来：设计读者表、图书表、借阅表（含外键），写借书/还书的事务，统计热门图书、逾期未还名单（JOIN + 聚合 + 窗口函数），再加一个按图书分类分页浏览的查询——这是从「会语法」到「会做系统」的关键一跃。",
            criteria: "交付完整建库脚本 + 至少 8 个业务查询（含事务、JOIN、聚合、分页），全部在 SSMS 中运行通过",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/tutorials/getting-started-with-the-database-engine"
          },
          {
            title: "SSMS 调试：执行计划与错误排查",
            type: "hands-on",
            desc: "学会看执行计划、捕获错误并定位慢查询",
            explain: "执行计划是数据库告诉你「它打算怎么干活」的说明书（谁先查、谁后连、有没有全表扫描）。按下「显示估计的执行计划」按钮，一眼看出查询慢在哪；遇到报错先看错误号和行号，再到文档查含义——这套「看计划 + 看报错」的能力是专业级的开始。",
            criteria: "能打开并大致读懂一个查询的执行计划，能指出是否存在表扫描并解释优化方向",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/performance/execution-plans"
          },
          {
            title: "备份与还原数据库",
            type: "hands-on",
            desc: "掌握 BACKUP DATABASE 与 RESTORE DATABASE 全流程",
            explain: "数据是企业的命根子，备份就是把仓库「整仓打包」存到安全地方（备份文件），还原是「灾难后重新打开仓库」。务必亲手做一次「备份 → 删数据 → 还原」的演练，感受备份救场的过程——这是 DBA 的基本功，也是程序员的好习惯。",
            criteria: "能对示例库执行完整备份，删除部分数据后通过还原恢复，验证数据完好",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases"
          },
          {
            title: "用户与权限管理",
            type: "hands-on",
            desc: "创建登录名、数据库用户并授予最小必要权限",
            explain: "不能让所有人都拿管理员账号随便操作。正确做法是：为不同人建不同「门禁卡」——普通员工只能 SELECT，录入员能增删改，管理员才全权限。用 CREATE LOGIN、CREATE USER、GRANT/DENY 来发卡，是安全底线。",
            criteria: "能创建登录名和用户，用 GRANT 授予 SELECT 权限，并验证无权限账号执行 INSERT 会报错",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/security/authentication-access/principals-database-engine"
          },
          {
            title: "T-SQL 综合编程练习",
            type: "practice",
            desc: "用变量、IF/WHILE、游标、错误处理完成综合任务",
            explain: "T-SQL 不只是单句查询，还能写「小程序」：声明变量存中间结果，用 IF/WHILE 做判断循环，用 TRY...CATCH 捕获错误，偶尔用游标逐行处理数据。做一两个综合练习（比如批量归档过期订单），编程能力就真正用在了数据库上。",
            criteria: "独立完成一个含变量、循环、错误处理的 T-SQL 批处理脚本并运行成功",
            link: "https://learn.microsoft.com/zh-cn/sql/t-sql/language-elements/control-of-flow"
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
            title: "查询优化与执行计划深度分析",
            type: "mastery",
            desc: "读懂各类型操作符，针对表扫描、缺失索引等做针对性优化",
            explain: "到这一步，你看查询不再只看结果对不对，而是看「够不够快」：抓住执行计划里的「表扫描」和「高代价操作」，分析缺失索引提示，比较多种写法（IN vs EXISTS、子查询 vs JOIN）的代价，把慢查询从分钟级优化到毫秒级。",
            criteria: "能找到一条慢查询，利用执行计划定位瓶颈并通过改写 SQL 或加索引显著提速（可量化对比）",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/performance/query-tuning"
          },
          {
            title: "索引调优与统计信息",
            type: "mastery",
            desc: "分析缺失索引、冗余索引，理解统计信息对优化器的影响",
            explain: "索引不是越多越好：冗余索引浪费空间、拖慢写入。精通者会做「索引体检」——找出缺失索引、重复索引，定期更新统计信息（优化器靠它估算数据量），并用数据库引擎优化顾问等工具辅助决策。",
            criteria: "能对一张表分析出缺失索引与冗余索引，并给出添加/删除的具体建议",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/indexes/index-optimization-tools"
          },
          {
            title: "高可用：Always On 可用性组",
            type: "reading",
            desc: "理解主副本、只读副本、自动故障转移的高可用方案",
            explain: "单个数据库服务器挂了怎么办？Always On 可用性组让多台服务器组成「互助小组」：一台是主副本（干活），另有副本随时同步数据；主服务器出故障时自动切换到副本，业务几乎不中断——就像备胎自动顶上，车照常开。",
            criteria: "能画出 Always On 的架构图，说出主副本与次要副本的角色及故障转移流程",
            link: "https://learn.microsoft.com/zh-cn/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server"
          },
          {
            title: "分区表与内存优化表",
            type: "reading",
            desc: "理解按分区管理大数据量，以及内存表的高性能场景",
            explain: "数据量上亿后，一张表管不过来——分区表把它按规则（如按月份）拆成多个「小房间」，查询只进需要的房间，维护（删老数据）也快。内存优化表把数据放内存里读写，适合极高并发低延迟场景，但要注意内存容量与持久化。",
            criteria: "能解释分区表解决什么问题、内存优化表适合什么场景，并说出各自的取舍",
            link: "https://learn.microsoft.com/zh-cn/sql/relational-databases/partitions/partitioned-tables-and-indexes"
          },
          {
            title: "与 .NET / Java / Python 应用集成",
            type: "mastery",
            desc: "从应用程序连接 SQL Server，使用参数化查询与连接池",
            explain: "数据库最终要为应用服务：C# 用 SqlClient、Java 用 JDBC、Python 用 pyodbc。核心要点是「参数化查询」（防止 SQL 注入）、用完释放连接（连接池复用）、处理好事务边界。做一个增删改查的 Web 小应用，就是把数据库接入了真实世界。",
            criteria: "用你熟悉的语言写一个连接 SQL Server 并执行参数化增删改查的完整小程序并跑通",
            link: "https://learn.microsoft.com/zh-cn/sql/connect/sql-connection-libraries"
          },
          {
            title: "Azure SQL 云数据库",
            type: "reading",
            desc: "了解云端数据库、托管实例与上云迁移的基本思路",
            explain: "很多公司把数据库搬到云上：Azure SQL Database 免去自己装服务器、打补丁、备份的麻烦，还能按需扩容、自动高可用。学会把本地库迁移到云端、理解 PaaS 与自建的区别，是跟上行业趋势的重要一步。",
            criteria: "能说出 Azure SQL 与自建 SQL Server 的三个区别，并描述上云迁移的大致步骤",
            link: "https://learn.microsoft.com/zh-cn/azure/azure-sql/azure-sql-iaas-vs-paas-what-is-overview"
          }
        ]
      }
    ]
  },
  {
    id: "oracle",
    title: "Oracle 学习路线",
    icon: "🏛️",
    subtitle: "从入门到精通 · 5 阶段、32 个知识点，零基础也能学会",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          {
            title: "Oracle 数据库是什么、能解决什么问题",
            type: "reading",
            desc: "认识 Oracle 数据库的定位、特点与典型应用场景",
            explain: "Oracle 是甲骨文公司出品的企业级关系型数据库，被誉为「数据库界的劳斯莱斯」：银行、电信、大型企业都在用，特点是非常稳定、功能极其强大（但也较复杂、成本高）。你学它，就是学最正统、最完整的数据库知识体系。",
            criteria: "能说出 Oracle 的三个核心特点及至少两个典型使用场景（如银行、电信核心系统）",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/"
          },
          {
            title: "关系型数据库核心概念",
            type: "reading",
            desc: "复习表、行、列、主键、SQL 等关系型数据库共通的底层概念",
            explain: "不管什么数据库，底层都是同一套「表思维」：数据存在表里（像表格），行是记录、列是字段、主键唯一标识一行。Oracle 只是在这个基础上加了更多「高级玩具」（表空间、用户体系、PL/SQL 等）。地基通了，学 Oracle 只是学它的方言。",
            criteria: "能解释表、行、列、主键、外键的含义，并说明它们与 SQL 的关系",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/cncpt/database-introduction.html"
          },
          {
            title: "安装 Oracle 与 SQL Developer",
            type: "hands-on",
            desc: "下载安装 Oracle 数据库（XE 免费版）与图形工具 SQL Developer",
            explain: "Oracle 官方提供免费版 Oracle XE 供学习，SQL Developer 是它的图形「控制台」。安装比一般软件稍讲究（内存、服务），但跟着官方文档一步步来就行。装好后，你的电脑就多了一个「企业级数据仓库」。",
            criteria: "成功安装 Oracle XE 并用 SQL Developer 连接到本地数据库，能正常执行查询",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/xeinl/index.html"
          },
          {
            title: "连接数据库并执行第一条 SQL",
            type: "hands-on",
            desc: "用 SQL Developer 连接用户（如 SYSTEM），执行第一条 SELECT",
            explain: "连接 Oracle 需要三要素：主机、端口（默认 1521）、服务名（如 XEPDB1）。连上后打开 SQL 工作表，输入 SELECT 1 FROM DUAL 回车——注意 Oracle 没有 FROM 也要写 DUAL 这个「占位表」，这是它的特色语法。",
            criteria: "能在 SQL Developer 中成功连接并执行 SELECT * FROM DUAL，理解 DUAL 的作用",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/DUAL.html"
          },
          {
            title: "SQL*Plus / SQLcl 命令行",
            type: "hands-on",
            desc: "体验 Oracle 的命令行工具，理解 SQL 与 SQL*Plus 命令的区别",
            explain: "SQL*Plus 是 Oracle 的「黑窗口」客户端，DBA 老兵们的最爱：一条条 SQL 敲进去、结果一行行打出来。它把「SQL 命令」和「工具命令」（如 SET、DESC）分开——这个区分是 Oracle 入门的一个小分水岭。",
            criteria: "能在 SQL*Plus 中连接数据库、用 DESC 查看表结构、执行 SELECT 并退出",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqpug/index.html"
          },
          {
            title: "前置准备：SQL 三大类（DDL/DML/DQL）",
            type: "reading",
            desc: "分清建表（DDL）、增删改（DML）、查询（DQL）三类语句",
            explain: "和学任何数据库一样，先分清「盖房子」（CREATE/ALTER/DROP 建表改表）、「改内容」（INSERT/UPDATE/DELETE）、「问问题」（SELECT）。Oracle 的 DDL 还会牵涉到它特有的「表空间」「段」等概念，稍后逐个认识。",
            criteria: "能判断 CREATE、SELECT、INSERT 各自属于哪一类 SQL，并说明 DDL 与 DML 的区别",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/Table-of-Contents.html"
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
            title: "SELECT 基础与 DUAL 表",
            type: "practice",
            desc: "掌握 Oracle 查询语法、别名与表达式计算的 DUAL 用法",
            explain: "Oracle 的 SELECT 基本和标准 SQL 一致：SELECT 列 FROM 表。它有个特色是 DUAL 表——需要「算个表达式」或「取个系统时间」又没有具体表时，就 FROM DUAL（如 SELECT SYSDATE FROM DUAL）。记住它，练习效率会高很多。",
            criteria: "能用 SELECT 完成列选择、别名、表达式计算，并会用 DUAL 取系统时间",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/SELECT.html"
          },
          {
            title: "WHERE / ORDER BY 过滤与排序",
            type: "practice",
            desc: "掌握条件过滤、运算符与排序，注意 NULL 的特殊处理",
            explain: "WHERE 筛行、ORDER BY 排序，和别的数据库一样。但 Oracle 有个经典陷阱：NULL 参与比较结果永远是「未知」，所以判断空值必须写 IS NULL / IS NOT NULL，字符串拼接用 || 而不是 +。这些「方言细节」正是考试和企业面试的常客。",
            criteria: "能写出含 AND/OR/LIKE/IN 的过滤查询并排序，能用 IS NULL 正确筛选空值行",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/Conditions.html"
          },
          {
            title: "Oracle 数据类型与建表",
            type: "hands-on",
            desc: "掌握 NUMBER、VARCHAR2、DATE 等类型并创建表",
            explain: "Oracle 的类型很有特色：NUMBER(p,s) 一个类型通吃整数和小数，VARCHAR2 是变长字符串，DATE 自带时分秒，CLOB 存大文本。建表时还能设主键、非空、默认值等约束，把表的设计意图直接写进数据库。",
            criteria: "能用 CREATE TABLE 建一张含 NUMBER、VARCHAR2、DATE 字段并带主键的表",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/Data-Types.html"
          },
          {
            title: "DML 增删改与事务",
            type: "practice",
            desc: "掌握 INSERT/UPDATE/DELETE，理解 Oracle 默认事务提交机制",
            explain: "Oracle 有个和别家不同的习惯：它默认「手动提交」——你执行 DML 后，其他会话看不到你的修改，直到你执行 COMMIT 才算真正落库；反悔就 ROLLBACK 撤销。这个「先改后交」的设计保证数据安全，但也需要你养成随手提交的好习惯。",
            criteria: "能完成增删改操作，并用 COMMIT/ROLLBACK 演示未提交数据对其他会话不可见",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/cncpt/data-concurrency-and-consistency.html"
          },
          {
            title: "单行函数与 NULL 处理",
            type: "practice",
            desc: "掌握字符、数字、日期函数及 NVL、DECODE、CASE 等空值处理",
            explain: "单行函数是「逐行加工数据」的工具：UPPER 转大写、SUBSTR 截字符串、ROUND 四舍五入、TO_DATE 转日期格式。空值处理更是重点：NVL(值, 默认值) 把空值换成默认，DECODE/CASE 实现「如果…就…」的分支逻辑——报表里天天用。",
            criteria: "能用至少 6 个常用单行函数处理数据，并用 NVL 和 CASE 完成空值替换与条件分支",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/Functions.html"
          },
          {
            title: "聚合与 GROUP BY / HAVING",
            type: "practice",
            desc: "用 COUNT、SUM、AVG 等做分组统计，注意与 WHERE 的先后",
            explain: "聚合函数算总账（人数、总额、平均），GROUP BY 按组算（按部门、按月份）。要记住执行顺序：WHERE 先筛行、再分组、HAVING 再筛组——顺序错了，统计结果就错了，这是聚合查询最经典的一个坑。",
            criteria: "能用 GROUP BY 完成分组汇总，并用 HAVING 过滤分组，能说清 WHERE 与 HAVING 的区别",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/SELECT.html"
          },
          {
            title: "多表连接 JOIN 与集合运算",
            type: "practice",
            desc: "掌握 INNER/LEFT JOIN，以及 UNION、MINUS 等集合运算",
            explain: "JOIN 是把多张表按关联字段「拼起来」，Oracle 还支持旧的 (+) 写法，但建议学标准的 JOIN 语法。集合运算 UNION（合并去重）、UNION ALL（合并不去重）、MINUS（差集）用来把两个查询的结果「做加减法」，在核对数据时非常好用。",
            criteria: "能写出 INNER JOIN 与 LEFT JOIN 查询，并用 UNION / MINUS 完成两个结果集的合并与求差",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/Joins.html"
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
            title: "序列 Sequence、同义词与表空间",
            type: "hands-on",
            desc: "用序列生成主键、同义词简化访问，理解表空间的概念",
            explain: "Oracle 没有 MySQL 那种「自增列」，而是用序列（Sequence）生成连续编号，建表后配合触发器自动填入主键。同义词是给表起的「小名/别名」。表空间则是数据的「物理房间」——Oracle 把逻辑表放在表空间这个容器里管理。",
            criteria: "能创建序列并配合 INSERT 生成主键值，能创建同义词并说明表空间的作用",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/CREATE-SEQUENCE.html"
          },
          {
            title: "索引与执行计划基础",
            type: "reading",
            desc: "理解 B 树索引原理，学会用 EXPLAIN PLAN 看执行计划",
            explain: "索引就是数据库的「目录」，Oracle 默认用 B 树结构：数据多时仍能快速定位。用 EXPLAIN PLAN FOR 或 SQL Developer 的「解释计划」按钮，可以看到数据库实际「怎么干活」——全表扫描还是索引扫描，一眼便知，这是后续调优的基石。",
            criteria: "能为表创建索引，并用 EXPLAIN PLAN 查看一条查询是否走索引",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/tgsql/using-explain-plan.html"
          },
          {
            title: "PL/SQL 块结构与变量、异常",
            type: "hands-on",
            desc: "掌握 PL/SQL 匿名块、变量声明、IF/LOOP 与异常处理",
            explain: "PL/SQL 是 Oracle 的编程语言，语法像 Pascal 混合 SQL：DECLARE 声明变量、BEGIN...END 写逻辑、EXCEPTION 处理错误。它让 SQL 从「问一句答一句」升级成「写一段程序」，比如批量处理、复杂校验。这是 Oracle 区别于其他数据库的招牌能力。",
            criteria: "能编写并运行一个包含变量、IF 判断、循环和异常处理的 PL/SQL 匿名块",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/lnpls/plsql-fundamentals.html"
          },
          {
            title: "存储过程、函数与包 Package",
            type: "hands-on",
            desc: "把 PL/SQL 逻辑封装为可复用的存储过程、函数与包",
            explain: "存储过程是「打包好的 PL/SQL 程序」（无返回值，用 OUT 参数传结果），函数 FUNCTION 有返回值（可以写进 SELECT 里），包 PACKAGE 则是把相关的过程函数「装进一个工具箱」，统一管理、统一授权——企业级应用几乎都用包组织业务逻辑。",
            criteria: "能创建带 IN/OUT 参数的存储过程并调用，能创建函数并在 SELECT 中使用",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/lnpls/plsql-procedures-and-functions.html"
          },
          {
            title: "触发器 Trigger",
            type: "reading",
            desc: "理解 DML 触发器：自动执行、审计日志、数据校验",
            explain: "触发器是数据库的「自动守卫」：某表增删改时自动触发指定逻辑，常用于记录操作日志、维护冗余数据、自动生成主键。注意触发器在后台悄悄执行，性能与调试成本较高，慎用、少用、用来保证关键一致性。",
            criteria: "能创建 AFTER INSERT 触发器记录审计日志，并验证操作表时自动写入日志",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/lnpls/plsql-triggers.html"
          },
          {
            title: "视图与物化视图",
            type: "reading",
            desc: "理解普通视图与物化视图的差别与适用场景",
            explain: "视图是「存起来的查询」（不占存储，查时现算），适合简化复杂查询、做权限隔离。物化视图则是「把结果真的存成一张表」：提前算好、查询飞快，但数据可能过期，需要定时刷新——用「空间换时间」，适合报表场景。",
            criteria: "能创建视图与物化视图，能说出两者的核心区别及各自适用场景",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/admin/managing-views-sequences-and-synonyms.html"
          },
          {
            title: "锁与并发控制",
            type: "reading",
            desc: "理解行级锁、乐观并发、阻塞与死锁的基本原理",
            explain: "多人同时改同一行数据怎么办？Oracle 用锁来「排队」：改数据时先拿行锁，别人只能等。它采用「读不阻塞写、写不阻塞读」的多版本并发控制，所以查询永远不被锁卡住。理解锁的粒度与阻塞/死锁，是处理并发问题的必修课。",
            criteria: "能解释 Oracle 行级锁与多版本读一致性的含义，能说出死锁产生的大致原因",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/cncpt/data-concurrency-and-consistency.html"
          },
          {
            title: "常见坑与排查清单",
            type: "reading",
            desc: "避开 ORA- 错误、字符集、NULL、分页等高频陷阱",
            explain: "Oracle 报错以 ORA- 开头，每个错误号都有固定含义（如 ORA-00942 表不存在、ORA-00001 违反唯一约束），学会「见号查文档」是核心技能。另外注意：NULL 一切运算皆空、分页要用 FETCH FIRST/OFFSET（新版）或 ROWNUM（旧版）、字符集不一致会乱码。",
            criteria: "能说出至少 4 个 ORA- 常见错误号的含义及应对方法，能正确使用分页写法",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/errmg/ORA-00000-to-ORA-00999.html"
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
            title: "项目：订单管理系统（PL/SQL 全流程）",
            type: "mastery",
            desc: "用序列、触发器、存储过程、包完整实现订单入库与统计",
            explain: "做一个综合项目把知识串起来：客户表 + 订单表 + 订单明细表（外键约束），用序列+触发器自动生成订单号，写一个「下订单」的存储过程（校验库存、扣减库存、生成订单——全程在一个事务里），再用包组织所有业务函数。跑通它，你就真正会用 Oracle 做业务了。",
            criteria: "交付完整建库脚本与至少 3 个存储过程/函数，模拟下单流程运行通过并验证库存正确扣减",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/tdddg/creating-applications-with-oracle-database.html"
          },
          {
            title: "SQL Developer 调试与解释计划",
            type: "hands-on",
            desc: "学会断点调试 PL/SQL 与查看解释计划优化查询",
            explain: "SQL Developer 不只是写 SQL 的地方：它可以给存储过程「打断点」单步调试（像 IDE 一样看变量值），可以一键生成「解释计划」看查询走了什么路径。这两招在手，业务逻辑出 bug、查询跑得慢，你都能自己快速定位。",
            criteria: "能对存储过程设置断点并单步执行，能用解释计划对比优化前后两条查询",
            link: "https://docs.oracle.com/en/database/oracle/sql-developer/"
          },
          {
            title: "备份与恢复：RMAN / Data Pump",
            type: "hands-on",
            desc: "掌握 expdp/impdp 逻辑备份与 RMAN 物理备份的基础用法",
            explain: "Oracle 备份分两派：Data Pump（expdp/impdp）是「逻辑搬家」——把数据导出成文件再导入，适合迁移库、导数据；RMAN 是「物理整容」——备份数据库文件本身，适合灾难恢复。动手做一次「导出 → 删表 → 导入恢复」的演练，体会备份的意义。",
            criteria: "能用 expdp 导出表数据并删除后用 impdp 恢复，能说出 RMAN 与 Data Pump 的区别",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sutil/oracle-data-pump.html"
          },
          {
            title: "用户、角色与权限管理",
            type: "hands-on",
            desc: "创建用户、授予权限、用角色简化权限分配",
            explain: "Oracle 的权限体系是它最讲究的地方之一：建用户、GRANT 给权限、用角色（角色=权限包）批量发权限，还有细到「列级」的权限控制。企业里一个账号权限过大的事故比比皆是，学会「最小权限原则」是职业素养。",
            criteria: "能创建两个用户并分配不同角色/权限，验证不同权限下操作的差异",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/dbseg/managing-users-and-privileges.html"
          },
          {
            title: "性能排查：AWR 报告入门",
            type: "practice",
            desc: "生成并大致读懂 AWR 报告中的关键性能指标",
            explain: "AWR 是 Oracle 自带的「体检报告」：数据库跑一段时间后，生成一份报告，里面有 CPU 等待、SQL 排行榜、缓冲区命中率等关键指标。DBA 靠它判断系统哪里紧张。入门阶段只要会生成报告、看懂「Top SQL」和「等待事件」两大板块即可。",
            criteria: "能用 SQL*Plus 生成 AWR 报告并指出报告中最耗时的 Top SQL 名称",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/tgdba/gathering-database-statistics.html"
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
            title: "SQL 调优与执行计划深挖",
            type: "mastery",
            desc: "分析访问路径、连接方式、驱动顺序，改写 SQL 提升性能",
            explain: "精通的标志是把慢查询当「案子」来破：看执行计划里的访问路径（全表扫描还是索引扫描）、表连接方式（嵌套循环还是哈希连接）、驱动表选谁，配合 SQL 改写（如把函数包在列上导致索引失效的问题改掉），一个词：追根究底。",
            criteria: "能定位一条慢查询的根因（如索引失效、错误驱动顺序）并通过改写 SQL 或优化结构提升性能",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/tgsql/index.html"
          },
          {
            title: "分区表与索引优化",
            type: "mastery",
            desc: "掌握范围分区、列表分区及分区索引的维护与查询",
            explain: "亿级数据表用分区管理：按时间/地区拆成多个分区「小仓库」，查询只扫相关分区（分区裁剪），清理老数据直接 DROP 分区（秒删）。再配合本地/全局索引的选择，这套能力是大数据量系统稳定运行的关键。",
            criteria: "能创建范围分区表并验证「分区裁剪」生效（查询只访问对应分区），能解释本地索引与全局索引的区别",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/vldbg/partitioning-concepts.html"
          },
          {
            title: "RAC 与 Data Guard 高可用",
            type: "reading",
            desc: "理解集群扩展（RAC）与灾备（Data Guard）两大架构",
            explain: "RAC 是让多台服务器「一起干同一份活」（共享数据库，横向扩展 + 高可用）；Data Guard 是「异地备胎」（主库数据实时同步到备库，主库挂了备库顶上，用于容灾）。大企业 Oracle 系统的底座就是这两大件，理解架构是走向资深 DBA 的必修课。",
            criteria: "能画出 RAC 与 Data Guard 的架构图，说出各自解决什么问题及典型应用场景",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/racad/overview-of-oracle-real-application-clusters.html"
          },
          {
            title: "闪回 Flashback 技术",
            type: "reading",
            desc: "掌握查询历史数据、闪回删除表、闪回版本查询等恢复手段",
            explain: "误删数据是每个人的噩梦，Oracle 的闪回技术就是「时光机」：闪回查询能看表在 5 分钟前的样子，闪回表能把整张表恢复到过去时间点，闪回删除能捞回被 DROP 的表。这些能力让「手滑」不再致命——是 Oracle 领先的可靠性设计。",
            criteria: "能演示闪回查询（AS OF TIMESTAMP）查看历史数据，并说出闪回删除的恢复方法",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/adfns/flashback.html"
          },
          {
            title: "JDBC / 客户端连接应用程序",
            type: "mastery",
            desc: "从 Java 等语言用 JDBC 连接 Oracle，掌握连接串与参数化查询",
            explain: "数据库最终要接应用：Java 用 JDBC（ojdbc 驱动）连 Oracle，连接串形如 jdbc:oracle:thin:@host:1521/服务名。核心是连接池（复用连接）、参数化查询（防 SQL 注入）、事务控制。写一个简单的 CRUD 应用，你就把 Oracle 用到了真实项目中。",
            criteria: "用 Java JDBC 或你熟悉的语言完成一个连接 Oracle 的增删改查程序并跑通",
            link: "https://docs.oracle.com/en/database/oracle/oracle-database/23/jjdbc/index.html"
          },
          {
            title: "数据库方向进阶：DBA 技能与 OCI 云",
            type: "reading",
            desc: "了解 DBA 成长路径、OCP 认证与 Oracle 云（OCI）趋势",
            explain: "学完主线，你可以选择深耕：走 DBA 路线（补网络/存储/操作系统知识，考 OCP/OCM 认证），或走开发路线（Oracle + Java/中间件），或跟上云化趋势（Oracle 数据库也提供云服务 OCI 与自治数据库 Autonomous Database）。每一条路都能通向资深专家。",
            criteria: "能结合自身目标说出接下来 3 个月的进阶计划（认证/项目/云方向选一）",
            link: "https://www.oracle.com/database/technologies/cloud-database.html"
          }
        ]
      }
    ]
  },
  {
    id: "mysql",
    title: "MySQL 学习路线",
    icon: "🐬",
    subtitle: "从入门到精通 · 5 阶段、30 个知识点，零基础也能学会",
    stages: [
      {
        id: 1,
        title: "入门",
        subtitle: "零基础起步 · 建立认知",
        color: "#3b82f6",
        items: [
          {
            title: "MySQL 是什么、能解决什么问题",
            type: "reading",
            desc: "认识 MySQL 的定位、开源特性与海量应用场景",
            explain: "MySQL 是世界上最流行的开源关系型数据库，号称「互联网公司的默认选择」：从个人博客到淘宝级系统都用它。它免费、轻快、社区庞大，是新手入门数据库的第一选择——就像学开车先开大众，好上手又普及。",
            criteria: "能说出 MySQL 的三个特点及至少 3 个应用场景，能说明它和 Excel 的本质区别",
            link: "https://dev.mysql.com/doc/refman/8.4/en/what-is-mysql.html"
          },
          {
            title: "关系型数据库核心概念",
            type: "reading",
            desc: "理解库、表、行、列、主键、外键等通用概念",
            explain: "所有关系型数据库共用一套「表格思维」：库是仓库（多个库互不干扰），表是货架（存一类东西），行是货品、列是货品属性，主键是每个货品的唯一编号。这些概念先想明白，之后学任何 SQL 都只是学「说法不同」。",
            criteria: "能用自己的话解释库、表、行、列、主键，并举例说明",
            link: "https://dev.mysql.com/doc/refman/8.4/en/tutorial.html"
          },
          {
            title: "安装 MySQL 8 与可视化工具",
            type: "hands-on",
            desc: "安装 MySQL Server 与 MySQL Workbench（或 DBeaver）",
            explain: "安装 MySQL 就像给电脑装一个「数据仓库」：装完有个 mysql 服务在后台跑。配套工具 MySQL Workbench 是官方图形界面（也可以装更流行的 DBeaver），建库、写 SQL、看结果都可视化，比黑窗口舒服太多。",
            criteria: "成功安装 MySQL 并用 Workbench/DBeaver 连接到本地，能看到服务器版本信息",
            link: "https://dev.mysql.com/doc/refman/8.4/en/installing.html"
          },
          {
            title: "连接服务器并执行第一条 SQL",
            type: "hands-on",
            desc: "在命令行或图形工具中连接 root，执行第一条查询",
            explain: "连接 MySQL 要有三样：地址（localhost）、端口（3306）、账号密码（root）。连上后输入 SELECT VERSION(); 或 SELECT 1;，看到结果就说明你与数据库「接通电话」了。图形工具里通常就是新建连接 → 输入密码 → 打开查询窗口。",
            criteria: "能成功连接并执行 SELECT VERSION() 和 SELECT NOW()，理解每条 SQL 以分号结尾",
            link: "https://dev.mysql.com/doc/refman/8.4/en/connecting-disconnecting.html"
          },
          {
            title: "认识 SQL 三大类（DDL/DML/DQL）",
            type: "reading",
            desc: "分清建库建表、增删改、查询三类语句",
            explain: "SQL 按用途分三类：DQL 是「问问题」（SELECT），DML 是「改数据」（INSERT/UPDATE/DELETE），DDL 是「盖房子」（CREATE DATABASE/TABLE 等）。先建立这个分类框架，后面学新语句时你就知道它属于哪类、该在哪一步用。",
            criteria: "能判断 CREATE DATABASE、SELECT、DELETE 各属于哪类，并说出三类各自的任务",
            link: "https://dev.mysql.com/doc/refman/8.4/en/sql-statements.html"
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
            title: "SELECT 查询基础",
            type: "practice",
            desc: "掌握列选择、别名、DISTINCT 去重",
            explain: "SELECT 是数据库使用率最高的语句：选出要看的列、用 AS 起别名、用 DISTINCT 去重（比如查有哪些城市，去掉重复）。它就像在超市货架上「挑你要看的标签」，动作简单但天天在用。",
            criteria: "能从表中完成列选择、别名与 DISTINCT 去重，结果正确",
            link: "https://dev.mysql.com/doc/refman/8.4/en/select.html"
          },
          {
            title: "WHERE 过滤与运算符",
            type: "practice",
            desc: "掌握 =、!=、>、<、LIKE、IN、BETWEEN、逻辑运算符",
            explain: "WHERE 是「筛子」：只留符合条件的行。= 精确匹配、LIKE 模糊匹配（% 代表任意多个字符，如 '张%' 匹配所有姓张的）、IN 匹配一组值、BETWEEN 匹配区间。多个条件用 AND（同时满足）/ OR（满足其一）连接——注意优先级，必要时加括号。",
            criteria: "能用 WHERE 组合至少 4 种运算符正确过滤，结果与手工核对一致",
            link: "https://dev.mysql.com/doc/refman/8.4/en/where-optimizations.html"
          },
          {
            title: "MySQL 数据类型与建表规范",
            type: "hands-on",
            desc: "掌握 INT、VARCHAR、DATETIME、DECIMAL 等类型并规范建表",
            explain: "建表要「量体裁衣」选类型：整数 INT、变长字符串 VARCHAR(长度)、日期 DATETIME、金额 DECIMAL（别用 FLOAT 存钱，会精度丢失）。加好主键、非空、默认值、注释，再选对存储引擎（默认 InnoDB）。规范的表结构是项目的地基。",
            criteria: "能建一张包含整数、字符串、日期、金额字段且带主键和注释的表",
            link: "https://dev.mysql.com/doc/refman/8.4/en/data-types.html"
          },
          {
            title: "INSERT / UPDATE / DELETE",
            type: "practice",
            desc: "掌握数据增删改，牢记 UPDATE/DELETE 必须带 WHERE",
            explain: "INSERT 加一行、UPDATE 改数据、DELETE 删数据。最关键的一句提醒：写 UPDATE 和 DELETE 前先确认 WHERE 条件，否则一条语句会把整张表清空或改光——这是数据库界最惨烈的新手事故，务必养成「先 SELECT 确认，再 UPDATE/DELETE」的习惯。",
            criteria: "能完成增删改操作，并能演示「不带 WHERE 的 UPDATE/DELETE」的危险性",
            link: "https://dev.mysql.com/doc/refman/8.4/en/insert.html"
          },
          {
            title: "排序 ORDER BY 与分页 LIMIT",
            type: "practice",
            desc: "掌握 ORDER BY 升降序与 LIMIT/OFFSET 分页",
            explain: "ORDER BY 排序（ASC 升序 / DESC 降序，多个字段可以组合排序），LIMIT 是「只取前几条」：LIMIT 10 取前 10 条，LIMIT 10, 5 跳过 10 条再取 5 条（第 3 页）。网页列表的分页就是靠 LIMIT 实现的，必须熟练。",
            criteria: "能写出组合排序查询，并用 LIMIT 实现指定页的分页查询",
            link: "https://dev.mysql.com/doc/refman/8.4/en/order-by-optimization.html"
          },
          {
            title: "聚合函数与 GROUP BY / HAVING",
            type: "practice",
            desc: "用 COUNT/SUM/AVG/MAX/MIN 分组统计，理解执行顺序",
            explain: "聚合函数算总账（COUNT 条数、SUM 合计、AVG 平均、MAX/MIN 极值）。GROUP BY 按类别分组再算（按用户统计订单数），HAVING 对分组结果再筛选。执行顺序是：WHERE 先筛行 → 分组 → 聚合 → HAVING 筛组，顺序记错统计就错。",
            criteria: "能用 GROUP BY 完成分组汇总并用 HAVING 过滤，能说清 WHERE 和 HAVING 的先后与区别",
            link: "https://dev.mysql.com/doc/refman/8.4/en/aggregate-functions.html"
          },
          {
            title: "多表连接 JOIN 与子查询",
            type: "practice",
            desc: "掌握 INNER/LEFT JOIN 与子查询的写法与适用场景",
            explain: "业务数据常拆多张表，JOIN 按关联字段「拼图」：INNER JOIN 只留两边都有的，LEFT JOIN 以左表为全（右表没有就 NULL）。子查询是把「查出来的结果」再当条件用（如查比平均工资高的人）。JOIN 与子查询各有适用场景，都学会才能在实战里选对。",
            criteria: "能写出 INNER JOIN 与 LEFT JOIN 查询，并至少用一次子查询完成条件过滤",
            link: "https://dev.mysql.com/doc/refman/8.4/en/join.html"
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
            title: "索引原理与 EXPLAIN 分析",
            type: "reading",
            desc: "理解 B+ 树索引、覆盖索引，学会用 EXPLAIN 查看执行计划",
            explain: "索引像书的目录：没目录整本翻（全表扫描），有目录直接翻页（索引查找）。MySQL 默认 InnoDB 用 B+ 树组织索引。用 EXPLAIN SELECT ... 可以看到查询是否走索引（type 字段、key 字段）——判断「为什么慢」的第一个工具。",
            criteria: "能为常用查询列创建索引，并用 EXPLAIN 对比加索引前后的 key 字段变化",
            link: "https://dev.mysql.com/doc/refman/8.4/en/explain.html"
          },
          {
            title: "事务与隔离级别",
            type: "reading",
            desc: "理解 ACID 与四种隔离级别（读未提交/读已提交/可重复读/串行化）",
            explain: "事务把一组操作打包成「要么全成、要么全毁」。MySQL 默认隔离级别是「可重复读」：同一事务内多次查询结果一致。隔离级别低→并发高但可能读到脏数据；级别高→更安全但性能差。理解这四个档位，是理解并发数据库的关键。",
            criteria: "能说出四种隔离级别及各自解决什么问题，能解释 MySQL 默认级别为何是可重复读",
            link: "https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html"
          },
          {
            title: "视图与存储过程",
            type: "hands-on",
            desc: "创建视图简化查询，用存储过程封装业务逻辑",
            explain: "视图是「存起来的查询」（虚拟表），把复杂 JOIN 存成视图，之后查询就简单了。存储过程是「打包的 SQL 程序」，传参数进去、执行一段逻辑、返回结果。两者都能提升复用性，但存储过程要慎用过度（逻辑放数据库里不好维护）。",
            criteria: "能创建视图并查询，能创建带参数的存储过程并成功调用",
            link: "https://dev.mysql.com/doc/refman/8.4/en/create-view.html"
          },
          {
            title: "触发器与事件调度",
            type: "hands-on",
            desc: "用触发器自动执行逻辑，用 EVENT 定时任务",
            explain: "触发器是「自动守卫」：表发生增删改时自动执行一段逻辑（如自动更新统计表）。事件调度器（EVENT）则像「闹钟」：定时执行 SQL（如每天凌晨归档旧数据）。两者都适合后台自动化，但要注意别写复杂逻辑拖累主操作。",
            criteria: "能创建 AFTER INSERT 触发器并验证自动触发，能创建定时执行的事件",
            link: "https://dev.mysql.com/doc/refman/8.4/en/trigger-syntax.html"
          },
          {
            title: "用户权限管理",
            type: "hands-on",
            desc: "掌握 CREATE USER、GRANT、REVOKE，遵守最小权限原则",
            explain: "别所有应用都用一个 root！正确姿势是：每个应用/每个开发各建一个账号，只授所需权限（比如只读账号只给 SELECT）。GRANT 发权限、REVOKE 收回，权限粒度能细到「某张表的某几列」。权限管得严，数据才安全。",
            criteria: "能创建用户并授权/收权，能验证权限不足时操作被拒绝",
            link: "https://dev.mysql.com/doc/refman/8.4/en/grant.html"
          },
          {
            title: "字符集与排序规则",
            type: "reading",
            desc: "理解 utf8mb4 字符集与排序规则，避开中文乱码",
            explain: "字符集决定「字怎么编码存进电脑」。MySQL 一定要用 utf8mb4（真正的完整 UTF-8，能存中文、emoji），排序规则 utf8mb4_unicode_ci 之类的决定比较/排序方式。连接串、建库、建表三层字符集不一致，就会出现著名的「???」乱码，务必统一。",
            criteria: "能解释为什么用 utf8mb4 而非 utf8，能排查并修复一次中文乱码问题",
            link: "https://dev.mysql.com/doc/refman/8.4/en/charset.html"
          },
          {
            title: "常见坑与排查清单",
            type: "reading",
            desc: "避开 NULL、索引失效、隐式转换、慢查询等高频陷阱",
            explain: "高频坑：NULL 参与运算结果全 NULL（用 IFNULL 兜底）、对索引列套函数导致索引失效（如 WHERE DATE(字段)=... 应改写为范围查询）、字符串和数字比较发生隐式转换不走索引、LIKE '%xxx' 前导通配符无法用索引。背下这份避雷清单，调优少走一半弯路。",
            criteria: "能说出至少 5 个 MySQL 高频坑及规避方法，遇到慢查询能初步判断原因",
            link: "https://dev.mysql.com/doc/refman/8.4/en/problems.html"
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
            title: "项目：电商/博客数据库设计与实现",
            type: "mastery",
            desc: "从需求分析、ER 设计到建表查询，完整做一个业务库",
            explain: "选一个真实场景（如「电商订单库」或「博客评论库」）全程走一遍：分析需求 → 画表关系（用户表、商品表、订单表…）→ 建库建表（含主外键、索引）→ 写业务查询（下订单事务、热销排行、分页列表）。这是把语法变成「能干活的能力」最关键的一步。",
            criteria: "交付完整建库脚本 + 至少 10 个业务查询（含事务、JOIN、聚合、索引），全部运行通过",
            link: "https://dev.mysql.com/doc/refman/8.4/en/examples.html"
          },
          {
            title: "备份与恢复（mysqldump）",
            type: "hands-on",
            desc: "用 mysqldump 导出备份，模拟误删后恢复",
            explain: "备份是保命符：mysqldump -u root -p 库名 > backup.sql 就把整个库导出成 SQL 文件；恢复时 mysql < backup.sql 导回去。亲手演练「备份 → 删表 → 恢复」全流程，你就再也不怕手滑删库了——这也是面试常问的实操题。",
            criteria: "能用 mysqldump 备份一个库，删除数据后成功恢复并验证数据完整",
            link: "https://dev.mysql.com/doc/refman/8.4/en/mysqldump.html"
          },
          {
            title: "慢查询日志与性能排查",
            type: "hands-on",
            desc: "开启慢查询日志，定位并优化慢 SQL",
            explain: "慢查询日志是 MySQL 自带的「超速记录仪」：超过设定时间（如 2 秒）的查询会被记进日志。开启它 → 找出慢 SQL → 用 EXPLAIN 分析 → 加索引或改写 → 再测。这套「发现问题 → 定位 → 解决 → 验证」的闭环，是性能调优的标准动作。",
            criteria: "能开启慢查询日志并制造一条慢查询，能分析其执行计划并给出优化方案",
            link: "https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html"
          },
          {
            title: "主从复制配置",
            type: "hands-on",
            desc: "搭建一主一从，理解二进制日志与复制的原理",
            explain: "主从复制就是「数据双保险」：主库把每个操作写进二进制日志（binlog），从库「照着做一遍」保持数据一致。主库挂了从库顶上（高可用），还能把读请求分流到从库（读写分离）。亲手配一次主从，就理解了互联网高可用架构的第一课。",
            criteria: "能配置一主一从复制，在主库插入数据后验证从库同步，理解 binlog 的作用",
            link: "https://dev.mysql.com/doc/refman/8.4/en/replication.html"
          },
          {
            title: "连接 Java / Python 应用",
            type: "mastery",
            desc: "用 JDBC 或 pymysql 连接 MySQL，完成带参数化的增删改查",
            explain: "数据库要接上应用才算真正落地：Java 用 JDBC（驱动 com.mysql.cj.jdbc.Driver），Python 用 pymysql。核心三件事：连接串写对（含字符集参数）、用参数化占位符防 SQL 注入、用完关连接（或交给连接池）。写一个带界面的小应用，成就感满满。",
            criteria: "用熟悉语言完成连接 MySQL 的完整增删改查程序（含参数化查询），运行通过",
            link: "https://dev.mysql.com/doc/connectors/en/"
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
            title: "InnoDB 存储引擎与锁机制",
            type: "reading",
            desc: "理解聚簇索引、行锁/间隙锁、MVCC 多版本并发控制",
            explain: "InnoDB 是 MySQL 默认引擎，它的本事藏在细节里：聚簇索引（数据就存在主键索引的叶子上）、MVCC（多版本并发控制，让读不阻塞写）、行锁与间隙锁（防止幻读）。搞懂这些，你就能解释「为什么某些查询会锁表」「为什么并发下数据不乱」。",
            criteria: "能解释聚簇索引与二级索引的区别，能说出 MVCC 让读不加锁的原理",
            link: "https://dev.mysql.com/doc/refman/8.4/en/innodb-introduction.html"
          },
          {
            title: "查询优化与索引调优实战",
            type: "mastery",
            desc: "针对真实慢查询做索引设计与 SQL 改写，量化性能提升",
            explain: "进阶到「优化师」：为高频查询设计复合索引（注意最左前缀原则）、用覆盖索引避免回表、把 OR 改 UNION、把函数包列的写法改掉、必要时拆大查询。每优化一条，用执行时间和 EXPLAIN 前后对比，用数据说话——这才是真正会调优。",
            criteria: "能优化至少 2 条真实慢查询，提供优化前后执行时间与 EXPLAIN 对比",
            link: "https://dev.mysql.com/doc/refman/8.4/en/optimization.html"
          },
          {
            title: "高可用与读写分离架构",
            type: "reading",
            desc: "理解 MHA、Orchestrator、Group Replication 等高可用方案",
            explain: "单台 MySQL 是单点故障，高可用就是「挂了自动换备机」：MHA/Orchestrator 做故障自动切换，Group Replication 是官方集群方案，再配合中间件做读写分离（主写从读）。画清「架构图 + 故障切换流程」，是资深工程师的必备视野。",
            criteria: "能画出主从 + 读写分离 + 自动故障切换的架构图，并说明各组件职责",
            link: "https://dev.mysql.com/doc/refman/8.4/en/group-replication.html"
          },
          {
            title: "分库分表与分布式扩展",
            type: "reading",
            desc: "理解垂直拆分、水平拆分（Sharding）与 MyCat/ShardingSphere",
            explain: "数据量突破单机极限后就要「拆」：垂直拆分是按业务拆库（订单库、用户库分开），水平拆分是把一张大表按规则（如用户 ID 取模）拆到多张表/多个库（分片）。ShardingSphere、MyCat 等中间件帮你屏蔽拆分细节。理解拆分的权衡（跨片查询、全局 ID），是架构师的分水岭。",
            criteria: "能解释垂直拆分与水平拆分的区别，说出分库分表带来的 3 个新挑战及应对",
            link: "https://shardingsphere.apache.org/document/current/cn/overview/"
          },
          {
            title: "MySQL 8 新特性（窗口函数、CTE）",
            type: "practice",
            desc: "掌握窗口函数、公共表表达式 WITH、通用表等新语法",
            explain: "MySQL 8 把以前只有 Oracle/SQL Server 才有的高级语法补上了：窗口函数（ROW_NUMBER 排名、分组内计算）、CTE（WITH 临时结果集，让复杂查询像搭积木一样清晰）、CHECK 约束。学会这些，你的 SQL 能写得更优雅，求职面试也更有底气。",
            criteria: "能用窗口函数实现「每组取前 N」，能用 WITH 写出可读性良好的多步查询",
            link: "https://dev.mysql.com/doc/refman/8.4/en/window-functions.html"
          },
          {
            title: "云数据库与生态对比",
            type: "reading",
            desc: "了解云上 MySQL（RDS）、与 PostgreSQL/TiDB 的选型对比",
            explain: "如今很多公司直接用云数据库（阿里云 RDS、腾讯云、AWS RDS）：免运维、自动备份、一键扩容。同时也该横向看看生态：PostgreSQL（功能更全）、TiDB（分布式、兼容 MySQL 协议）等。了解「什么场景选什么数据库」，是从执行者走向决策者的标志。",
            criteria: "能对比 MySQL 与 PostgreSQL/TiDB 的适用场景，能说出云 RDS 的三个优势",
            link: "https://dev.mysql.com/doc/refman/8.4/en/"
          }
        ]
      }
    ]
  }
];

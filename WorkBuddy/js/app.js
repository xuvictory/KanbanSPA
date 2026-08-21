// ===== WorkBuddy 学习看板：逻辑层 =====
// 依赖：data.js 先加载，提供全局 stages / advancedStages

// ===== 看板配置（配置驱动，合并 beginner/advanced 两套重复逻辑） =====
const BOARDS = {
  beginner: {
    boardId: 'board',
    colPrefix: 'stage-col',
    keyPrefix: '', // localStorage key 前缀（beginner 无前缀，保持旧数据兼容）
    storageKey: 'workbuddy_learning_progress',
    stages: stages,
    currentStage: 1,
    groupId: 'group-guide',
    headerId: 'header-guide',
    title: 'WorkBuddy 学习路线看板',
    subtitle: '从零基础到熟练运用 — 7 个阶段、35 个知识点，逐步攻克',
    resetName: '入门指南'
  },
  advanced: {
    boardId: 'board-advanced',
    colPrefix: 'adv-stage-col',
    keyPrefix: 'adv-',
    storageKey: 'workbuddy_advanced_progress',
    stages: advancedStages,
    currentStage: 1,
    groupId: 'group-advanced',
    headerId: 'header-advanced',
    title: 'WorkBuddy 功能说明看板',
    subtitle: '从入门到精通 — 25 个阶段、112 个知识点，深度掌握',
    resetName: '进阶指南'
  }
};

// 进度存储：beginner / advanced 两个独立对象
const progressStore = { beginner: {}, advanced: {} };
let currentBoard = 'beginner';
// 点击顶部阶段按钮后，在平滑滚动动画期间忽略 scroll 同步，避免滚动停止后重新计算最左侧列覆盖用户点击选择
let suppressScrollSyncUntil = 0;

// ===== 进度读写 =====
function loadProgress(type) {
  try {
    const saved = localStorage.getItem(BOARDS[type].storageKey);
    if (saved) progressStore[type] = JSON.parse(saved);
  } catch (e) { progressStore[type] = {}; }
}

function saveProgress(type) {
  try {
    localStorage.setItem(BOARDS[type].storageKey, JSON.stringify(progressStore[type]));
  } catch (e) {}
}

function isDone(type, stageId, itemIdx) {
  return progressStore[type][`${BOARDS[type].keyPrefix}${stageId}-${itemIdx}`] === true;
}

function getStageDone(type, stage) {
  return stage.items.filter((_, i) => isDone(type, stage.id, i)).length;
}

function getTotalDone(type) {
  return BOARDS[type].stages.reduce((sum, s) => sum + getStageDone(type, s), 0);
}

function getTotalItems(type) {
  return BOARDS[type].stages.reduce((sum, s) => sum + s.items.length, 0);
}

function updateProgress(type) {
  const total = getTotalItems(type);
  const done = getTotalDone(type);
  const pct = Math.round((done / total) * 100);
  document.getElementById('progressText').textContent = pct + '%';
  document.getElementById('progressDetail').textContent = `${done} / ${total} 知识点`;
  const deg = (pct / 100) * 360;
  document.getElementById('progressCircle').style.background =
    `conic-gradient(white ${deg}deg, rgba(255,255,255,0.2) ${deg}deg)`;
  renderStageButtons();
}

// ===== 顶部阶段按钮 =====
function renderStageButtons() {
  const container = document.getElementById('stageButtons');
  if (!container) return;
  const cfg = BOARDS[currentBoard];
  const currentId = cfg.currentStage;
  container.innerHTML = cfg.stages.map(s => {
    const done = getStageDone(currentBoard, s);
    const total = s.items.length;
    const active = currentId === s.id ? 'active' : '';
    return `<button class="stage-button ${active}" data-board="${currentBoard}" data-stage-id="${s.id}" style="--button-color: ${s.color}">
      <span class="stage-button-dot" style="background: ${s.color}"></span>
      <span class="stage-button-label">${s.title}</span>
      <span class="stage-button-value">${done}/${total}</span>
    </button>`;
  }).join('');
  // 同步当前列高亮
  highlightActiveColumn(currentId);
}

function onStageClick(type, id) {
  BOARDS[type].currentStage = id;
  // 按钮互斥：只选中点击的那一个
  document.querySelectorAll('#stageButtons .stage-button').forEach(b => {
    b.classList.toggle('active', Number(b.dataset.stageId) === id);
  });
  // 看板列互斥：立即选中对应列
  highlightActiveColumn(id);
  // 在平滑滚动期间忽略 scroll 同步，避免滚动停止后被自动回退到其它阶段
  suppressScrollSyncUntil = Date.now() + 600;
  // 滚动看板，让该列贴到最左侧
  scrollToStage(type, id);
}

// 点击看板列 → 同步选中顶部对应按钮（反向联动，不触发滚动避免与滚动联动互相干扰）
function onColumnClick(type, id) {
  BOARDS[type].currentStage = id;
  // 按钮互斥：重新渲染顶部按钮，保证 active 状态与 currentStage 严格一致
  renderStageButtons();
  // 列互斥：highlightActiveColumn 内部会先全局清除两个看板所有列的 active-column
  highlightActiveColumn(id);
  // 抑制滚动同步，避免当前平滑滚动/惯性滚动把刚点击的列状态覆盖回去
  suppressScrollSyncUntil = Date.now() + 600;
}

function highlightActiveColumn(id) {
  // 全页面彻底清除所有列的 active-column，包括另一个看板，避免任何残留
  document.querySelectorAll('.column.active-column').forEach(c => c.classList.remove('active-column'));
  const cfg = BOARDS[currentBoard];
  const board = document.getElementById(cfg.boardId);
  if (!board) return;
  const col = document.getElementById(`${cfg.colPrefix}-${id}`);
  if (col) col.classList.add('active-column');
}

// ===== 看板滚动双向联动 =====
// 监听 board 横向滚动，滚动停止后再同步最左侧可见列对应的按钮高亮（双向联动）
// 防抖设计：平滑滚动途中不切换，避免按钮/列高亮来回闪跳
let scrollSyncRaf = null;
let scrollSyncTimer = null;
function syncStageFromScroll() {
  if (Date.now() < suppressScrollSyncUntil) return;
  if (scrollSyncRaf) return;
  scrollSyncRaf = requestAnimationFrame(() => {
    scrollSyncRaf = null;
    if (scrollSyncTimer) clearTimeout(scrollSyncTimer);
    scrollSyncTimer = setTimeout(() => {
      const cfg = BOARDS[currentBoard];
      const board = document.getElementById(cfg.boardId);
      if (!board) return;
      const boardLeft = board.getBoundingClientRect().left + 32; // 32 = board padding-left
      const cols = board.querySelectorAll('.column');
      let bestId = null;
      let bestDist = Infinity;
      cols.forEach(c => {
        const rect = c.getBoundingClientRect();
        // 找最接近 boardLeft（最贴近最左侧）的列
        const dist = Math.abs(rect.left - boardLeft);
        if (rect.left <= boardLeft + 50 && dist < bestDist) {
          bestDist = dist;
          bestId = Number(c.id.replace(`${cfg.colPrefix}-`, ''));
        }
      });
      if (!bestId) return;
      if (cfg.currentStage === bestId) return;
      cfg.currentStage = bestId;
      document.querySelectorAll('#stageButtons .stage-button').forEach(b => {
        b.classList.toggle('active', Number(b.dataset.stageId) === bestId);
      });
      highlightActiveColumn(bestId);
    }, 150);
  });
}

function bindBoardScrollSync() {
  Object.values(BOARDS).forEach(cfg => {
    const board = document.getElementById(cfg.boardId);
    if (board) board.addEventListener('scroll', syncStageFromScroll, { passive: true });
  });
}

// ===== 渲染看板 =====
function renderBoard(type) {
  const cfg = BOARDS[type];
  const board = document.getElementById(cfg.boardId);
  let html = '';
  cfg.stages.forEach(stage => {
    const done = getStageDone(type, stage);
    const total = stage.items.length;
    html += `<div class="column" id="${cfg.colPrefix}-${stage.id}" data-board="${type}" data-stage-id="${stage.id}" style="--col-color: ${stage.color}">
      <div class="column-header" style="border-top-color: var(--col-color)">
        <div class="column-title">
          <div class="stage-badge" style="background: ${stage.color}">${stage.id}</div>
          <div>
            <h3>${stage.title}</h3>
            <div class="subtitle">${stage.subtitle}</div>
          </div>
        </div>
        <span class="column-count">${done}/${total}</span>
      </div>
      <div class="column-body">`;

    stage.items.forEach((item, idx) => {
      const done = isDone(type, stage.id, idx);
      const tagClass = `tag-${item.type}`;
      const typeLabel = {
        'reading': '阅读理解',
        'hands-on': '动手实操',
        'practice': '练习巩固',
        'mastery': '综合应用'
      }[item.type];
      html += `<div class="card ${done ? 'done' : ''}" data-board="${type}" data-stage-id="${stage.id}" data-item-idx="${idx}">
        <div class="card-top">
          <div class="card-checkbox"></div>
          <div class="card-title">${item.title}</div>
        </div>
        <span class="card-tag ${tagClass}">${typeLabel}</span>
        <div class="card-desc">${item.desc}</div>
        <div class="card-criteria">
          <strong>验收标准</strong><br>${item.criteria}
        </div>
        <a class="card-link" href="${item.link}" target="_blank">查看文档 →</a>
      </div>`;
    });

    html += `</div></div>`;
  });
  board.innerHTML = html;
}

function toggleCard(type, stageId, itemIdx) {
  // 点击卡片同时选中该列并联动上方按钮
  onColumnClick(type, stageId);
  const key = `${BOARDS[type].keyPrefix}${stageId}-${itemIdx}`;
  progressStore[type][key] = !progressStore[type][key];
  saveProgress(type);
  renderBoard(type);
  updateProgress(type);
}

function scrollToStage(type, id) {
  const cfg = BOARDS[type];
  const col = document.getElementById(`${cfg.colPrefix}-${id}`);
  const board = document.getElementById(cfg.boardId);
  if (col && board) {
    // 计算该列相对 board 左边的偏移，滚动到最左侧（减去 board 的 padding 32px）
    const colRect = col.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();
    const offset = colRect.left - boardRect.left + board.scrollLeft - 32;
    board.scrollTo({ left: offset, behavior: 'smooth' });
  }
}

// ===== 一键全选 / 重置 =====
function completeAll() {
  const cfg = BOARDS[currentBoard];
  cfg.stages.forEach(s => {
    s.items.forEach((_, i) => {
      progressStore[currentBoard][`${cfg.keyPrefix}${s.id}-${i}`] = true;
    });
  });
  saveProgress(currentBoard);
  renderBoard(currentBoard);
  updateProgress(currentBoard);
}

function resetAll() {
  const name = BOARDS[currentBoard].resetName;
  if (confirm(`确定要重置${name}所有学习进度吗？`)) {
    progressStore[currentBoard] = {};
    saveProgress(currentBoard);
    renderBoard(currentBoard);
    updateProgress(currentBoard);
  }
}

// ===== 看板切换 =====
function switchBoard(type) {
  if (!BOARDS[type]) return;
  currentBoard = type;
  const cfg = BOARDS[type];

  // 菜单组互斥：目标已展开则保持，否则折叠其它组并展开目标
  const targetGroup = document.getElementById(cfg.groupId);
  if (targetGroup.classList.contains('collapsed')) {
    document.querySelectorAll('.menu-group').forEach(g => g.classList.add('collapsed'));
    targetGroup.classList.remove('collapsed');
  }

  // 看板互斥显示
  document.querySelectorAll('.board').forEach(b => b.classList.add('hidden'));
  document.getElementById(cfg.boardId).classList.remove('hidden');

  // 头部菜单高亮互斥
  document.querySelectorAll('.menu-group-header').forEach(h => h.classList.remove('active'));
  document.getElementById(cfg.headerId).classList.add('active');

  // 更新标题与副标题
  document.querySelector('.header-left h1').textContent = cfg.title;
  document.querySelector('.header-left p').textContent = cfg.subtitle;

  updateProgress(type);
}

// ===== 侧边栏 =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

function toggleMenuGroup(id) {
  const target = document.getElementById(id);
  const isCollapsed = target.classList.contains('collapsed');
  // 先折叠所有菜单组
  document.querySelectorAll('.menu-group').forEach(g => g.classList.add('collapsed'));
  // 如果目标之前是折叠的，就展开它（实现互斥：其他自动关闭）
  if (isCollapsed) {
    target.classList.remove('collapsed');
  }
}

// ===== 侧边栏子菜单选中（与右侧阶段按钮选中样式一致） =====
function selectMenuItem(item) {
  const group = item.closest('.menu-group');
  if (!group) return;
  group.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
  item.classList.add('active');
  const items = Array.from(group.querySelectorAll('.menu-item'));
  localStorage.setItem('activeMenuItem:' + group.id, String(items.indexOf(item)));
}
(function initMenuItems() {
  document.querySelectorAll('.menu-group').forEach(group => {
    const items = Array.from(group.querySelectorAll('.menu-item'));
    const saved = localStorage.getItem('activeMenuItem:' + group.id);
    const idx = saved !== null ? parseInt(saved, 10) : 0;
    const target = items.length ? items[Math.max(0, Math.min(idx, items.length - 1))] : null;
    if (target) target.classList.add('active');
    items.forEach(item => item.addEventListener('click', () => selectMenuItem(item)));
  });
})();

// ===== 事件绑定（HTML 保持纯标签，全部在此统一绑定） =====
function bindEvents() {
  // 侧边栏折叠
  document.querySelector('.sidebar-toggle').addEventListener('click', toggleSidebar);

  // 菜单组头部：点击切换看板（遍历 BOARDS 配置）
  Object.keys(BOARDS).forEach(type => {
    document.getElementById(BOARDS[type].headerId).addEventListener('click', () => switchBoard(type));
  });

  // 菜单组箭头：仅折叠/展开当前组（互斥），不触发切换
  document.querySelectorAll('.menu-group-header .arrow').forEach(arrow => {
    arrow.addEventListener('click', e => {
      e.stopPropagation();
      toggleMenuGroup(arrow.closest('.menu-group').id);
    });
  });

  // 工具栏：一键全选 / 重置
  document.querySelector('.btn-complete').addEventListener('click', completeAll);
  document.querySelector('.btn-reset').addEventListener('click', resetAll);

  // 顶部阶段按钮：事件委托
  document.getElementById('stageButtons').addEventListener('click', e => {
    const btn = e.target.closest('.stage-button');
    if (!btn) return;
    onStageClick(btn.dataset.board, Number(btn.dataset.stageId));
  });

  // 看板列 / 卡片：事件委托（链接优先于卡片，卡片优先于列）
  Object.values(BOARDS).forEach(cfg => {
    document.getElementById(cfg.boardId).addEventListener('click', e => {
      // 点击"查看文档"链接不触发卡片勾选
      if (e.target.closest('.card-link')) return;
      const card = e.target.closest('.card');
      if (card) {
        toggleCard(card.dataset.board, Number(card.dataset.stageId), Number(card.dataset.itemIdx));
        return;
      }
      const col = e.target.closest('.column');
      if (col) onColumnClick(col.dataset.board, Number(col.dataset.stageId));
    });
  });
}

// ===== Init =====
Object.keys(BOARDS).forEach(type => {
  loadProgress(type);
  renderBoard(type);
});
updateProgress(currentBoard);
// 初始化时只展开当前看板对应的菜单组，保持"同时只展开一个"
Object.values(BOARDS).forEach(cfg => {
  document.getElementById(cfg.groupId).classList.toggle('collapsed', cfg !== BOARDS[currentBoard]);
});
bindBoardScrollSync();
bindEvents();

// ===== study-kanban 逻辑层 =====
// 依赖：data.js 先加载，提供全局 boards / TYPE_LABELS
// boards 结构见 SKILL.md：每个 board 是一个学习主题，对应一个左侧一级菜单 + 一个右侧看板。
// 单主题时 boards 长度为 1（退化为单看板，无切换菜单）；多主题时长度为 N（左侧 N 个一级菜单）。

// ===== 由 boards 动态构建看板配置（配置驱动，复用 WorkBuddy 的 switchBoard 模式） =====
const BOARDS = {};
boards.forEach((board, i) => {
  const id = board.id || `board-${i + 1}`;
  BOARDS[id] = {
    boardId: `board-${id}`,
    colPrefix: `col-${id}`,
    keyPrefix: `${id}-`,                       // localStorage key 前缀，保证多主题互不覆盖
    storageKey: `study_kanban_progress_${id}`, // 每个 board 独立进度
    stages: board.stages,
    currentStage: 1,
    groupId: `group-${id}`,
    headerId: `header-${id}`,
    title: board.title || (board.stages && board.stages[0] && board.stages[0].title) || '学习看板',
    subtitle: board.subtitle || '',
    resetName: board.title || '看板'
  };
});
const BOARD_IDS = Object.keys(BOARDS);
const singleBoard = BOARD_IDS.length <= 1;

// 进度存储：每个 board 一个独立对象
const progressStore = {};
BOARD_IDS.forEach(id => { progressStore[id] = {}; });
let currentBoard = BOARD_IDS[0];
// 点击顶部阶段按钮后，在平滑滚动动画期间忽略 scroll 同步，避免滚动停止后重新计算覆盖用户点击
let suppressScrollSyncUntil = 0;

// ===== 进度读写（localStorage 为主，OPFS 为 file:// 下的强兜底，保证关浏览器再开仍自动加载） =====
// 检测 localStorage 是否可用（部分浏览器在 file:// / 隐私模式下会禁用）
const STORAGE_AVAILABLE = (() => {
  try {
    const k = '__kb_test__';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return true;
  } catch (e) { return false; }
})();

function lsGet(key) {
  if (!STORAGE_AVAILABLE) return null;
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function lsSet(key, val) {
  if (!STORAGE_AVAILABLE) return;
  try { localStorage.setItem(key, val); } catch (e) {}
}

// OPFS（Origin Private File System）：Chromium 在 file:// 下可用且跨会话持久化，
// 即使 localStorage 被禁用也能恢复进度；不支持的浏览器静默回退到 localStorage。
let opfsDir = null;
async function opfsInit() {
  try {
    if (navigator.storage && navigator.storage.getDirectory) {
      opfsDir = await navigator.storage.getDirectory();
    }
  } catch (e) { opfsDir = null; }
}
async function opfsRead(key) {
  if (!opfsDir) return null;
  try {
    const handle = await opfsDir.getFileHandle(key, { create: false });
    const file = await handle.getFile();
    return await file.text();
  } catch (e) { return null; }
}
async function opfsWrite(key, val) {
  if (!opfsDir) return;
  try {
    const handle = await opfsDir.getFileHandle(key, { create: true });
    const w = await handle.createWritable();
    await w.write(val);
    await w.close();
  } catch (e) {}
}

function loadProgress(id) {
  // 主路径：localStorage（同步，保证首次渲染即可见）
  const raw = lsGet(BOARDS[id].storageKey);
  if (raw) {
    try { progressStore[id] = JSON.parse(raw); } catch (e) { progressStore[id] = {}; }
  }
  // 兜底路径：OPFS 异步读取。若 localStorage 为空则以 OPFS 为准并补渲染；
  // 若两者都有数据，则合并（OPFS 通常更新，覆盖同名 key）。
  opfsRead(BOARDS[id].storageKey).then(raw2 => {
    if (!raw2) return;
    try {
      const data = JSON.parse(raw2);
      const wasEmpty = !raw;
      progressStore[id] = { ...progressStore[id], ...data };
      if (wasEmpty) {
        renderBoard(id);
        if (!singleBoard) refreshMenuLinkStates(id);
        updateProgress(id);
      }
    } catch (e) {}
  });
}

function saveProgress(id) {
  const val = JSON.stringify(progressStore[id]);
  lsSet(BOARDS[id].storageKey, val);
  opfsWrite(BOARDS[id].storageKey, val); // 异步兜底，失败不影响主路径
}

function isDone(id, stageId, itemIdx) {
  return progressStore[id][`${BOARDS[id].keyPrefix}${stageId}-${itemIdx}`] === true;
}

function getStageDone(id, stage) {
  return stage.items.filter((_, i) => isDone(id, stage.id, i)).length;
}

function getTotalDone(id) {
  return BOARDS[id].stages.reduce((sum, s) => sum + getStageDone(id, s), 0);
}

function getTotalItems(id) {
  return BOARDS[id].stages.reduce((sum, s) => sum + s.items.length, 0);
}

function updateProgress(id) {
  const total = getTotalItems(id);
  const done = getTotalDone(id);
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('progress-text').textContent = pct + '%';
  document.getElementById('progress-detail').textContent = `${done} / ${total} 知识点`;
  const deg = (pct / 100) * 360;
  document.getElementById('progress-circle').style.background =
    `conic-gradient(white ${deg}deg, rgba(255,255,255,0.2) ${deg}deg)`;
  renderStageButtons();
}

// ===== 顶部阶段按钮 =====
function renderStageButtons() {
  const container = document.getElementById('stage-buttons');
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
  highlightActiveColumn(currentId);
}

function onStageClick(id, stageId) {
  BOARDS[id].currentStage = stageId;
  document.querySelectorAll('#stage-buttons .stage-button').forEach(b => {
    b.classList.toggle('active', Number(b.dataset.stageId) === stageId);
  });
  highlightActiveColumn(stageId);
  suppressScrollSyncUntil = Date.now() + 600;
  scrollToStage(id, stageId);
}

function onColumnClick(id, stageId) {
  BOARDS[id].currentStage = stageId;
  renderStageButtons();
  highlightActiveColumn(stageId);
  suppressScrollSyncUntil = Date.now() + 600;
}

function highlightActiveColumn(stageId) {
  document.querySelectorAll('.column.active-column').forEach(c => c.classList.remove('active-column'));
  const cfg = BOARDS[currentBoard];
  const board = document.getElementById(cfg.boardId);
  if (!board) return;
  const col = document.getElementById(`${cfg.colPrefix}-${stageId}`);
  if (col) col.classList.add('active-column');
}

// ===== 看板滚动双向联动 =====
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
      const boardLeft = board.getBoundingClientRect().left + 32;
      const cols = board.querySelectorAll('.column');
      let bestId = null;
      let bestDist = Infinity;
      cols.forEach(c => {
        const rect = c.getBoundingClientRect();
        const dist = Math.abs(rect.left - boardLeft);
        if (rect.left <= boardLeft + 50 && dist < bestDist) {
          bestDist = dist;
          bestId = Number(c.id.replace(`${cfg.colPrefix}-`, ''));
        }
      });
      if (!bestId) return;
      if (cfg.currentStage === bestId) return;
      cfg.currentStage = bestId;
      document.querySelectorAll('#stage-buttons .stage-button').forEach(b => {
        b.classList.toggle('active', Number(b.dataset.stageId) === bestId);
      });
      highlightActiveColumn(bestId);
    }, 150);
  });
}

function bindBoardScrollSync() {
  BOARD_IDS.forEach(id => {
    const board = document.getElementById(BOARDS[id].boardId);
    if (board) board.addEventListener('scroll', syncStageFromScroll, { passive: true });
  });
}

// ===== 渲染看板 =====
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeLink(url) {
  if (!url) return '#';
  // 仅允许 http/https 链接
  return /^https?:\/\//i.test(url) ? url : '#';
}

function renderBoard(id) {
  const cfg = BOARDS[id];
  const board = document.getElementById(cfg.boardId);
  let html = '';
  cfg.stages.forEach(stage => {
    const done = getStageDone(id, stage);
    const total = stage.items.length;
    html += `<div class="column" id="${cfg.colPrefix}-${stage.id}" data-board="${id}" data-stage-id="${stage.id}" style="--col-color: ${stage.color}">
      <div class="column-header" style="border-top-color: var(--col-color)">
        <div class="column-title">
          <div class="stage-badge" style="background: ${stage.color}">${stage.id}</div>
          <div>
            <h3>${escapeHtml(stage.title)}</h3>
            <div class="subtitle">${escapeHtml(stage.subtitle)}</div>
          </div>
        </div>
        <span class="column-count">${done}/${total}</span>
      </div>
      <div class="column-body">`;

    stage.items.forEach((item, idx) => {
      const done = isDone(id, stage.id, idx);
      const tagClass = `tag-${item.type}`;
      const typeLabel = TYPE_LABELS[item.type] || item.type;
      html += `<div class="card ${done ? 'done' : ''}" data-board="${id}" data-stage-id="${stage.id}" data-item-idx="${idx}">
        <div class="card-top">
          <div class="card-checkbox"></div>
          <div class="card-title">${escapeHtml(item.title)}</div>
        </div>
        <span class="card-tag ${tagClass}">${escapeHtml(typeLabel)}</span>
        <div class="card-desc">${escapeHtml(item.desc)}</div>
        <div class="card-explain"><span class="card-explain-label">通俗讲解</span>${escapeHtml(item.explain)}</div>
        <div class="card-criteria">
          <strong>验收标准</strong><br>${escapeHtml(item.criteria)}
        </div>
        <a class="card-link" href="${safeLink(item.link)}" target="_blank" rel="noopener">查看文档 →</a>
      </div>`;
    });

    html += `</div></div>`;
  });
  board.innerHTML = html;
}

function toggleCard(id, stageId, itemIdx) {
  onColumnClick(id, stageId);
  const key = `${BOARDS[id].keyPrefix}${stageId}-${itemIdx}`;
  progressStore[id][key] = !progressStore[id][key];
  saveProgress(id);
  renderBoard(id);
  updateProgress(id);
  // 同步左侧子菜单对应知识点勾选态
  syncMenuLinkState(id, stageId, itemIdx, progressStore[id][key]);
}

function scrollToStage(id, stageId) {
  const cfg = BOARDS[id];
  const col = document.getElementById(`${cfg.colPrefix}-${stageId}`);
  const board = document.getElementById(cfg.boardId);
  if (col && board) {
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
  refreshMenuLinkStates(currentBoard);
}

function resetAll() {
  const name = BOARDS[currentBoard].resetName;
  if (confirm(`确定要重置${name}所有学习进度吗？`)) {
    progressStore[currentBoard] = {};
    saveProgress(currentBoard);
    renderBoard(currentBoard);
    updateProgress(currentBoard);
    refreshMenuLinkStates(currentBoard);
  }
}

// ===== 左侧多主题菜单渲染 =====
function renderMenuGroups() {
  const container = document.getElementById('menuGroupsContainer');
  if (!container) return;

  // 单主题：不渲染切换菜单（隐藏菜单区），直接展示该看板
  if (singleBoard) {
    container.style.display = 'none';
    return;
  }

  container.innerHTML = BOARD_IDS.map((id, i) => {
    const cfg = BOARDS[id];
    // 子菜单：每个阶段一组，组内是该阶段的知识点链接
    const stageLinks = cfg.stages.map(stage => {
      const links = stage.items.map((item, idx) => {
        const done = isDone(id, stage.id, idx);
        return `<a class="menu-link ${done ? 'done' : ''}" data-board="${id}" data-stage-id="${stage.id}" data-item-idx="${idx}" href="${safeLink(item.link)}" target="_blank" rel="noopener">
          <span class="menu-link-check"></span>${escapeHtml(item.title)}
        </a>`;
      }).join('');
      return `<div class="menu-stage">
        <div class="menu-stage-label" style="--stage-color: ${stage.color}">${escapeHtml(stage.title)}</div>
        <div class="menu-link-list">${links}</div>
      </div>`;
    }).join('');

    return `<div class="menu-group" id="${cfg.groupId}">
      <div class="menu-group-header" id="${cfg.headerId}" data-board="${id}">
        <span class="menu-group-title">${escapeHtml(cfg.title)}</span>
        <span class="arrow">▾</span>
      </div>
      <div class="menu-group-items">${stageLinks}</div>
    </div>`;
  }).join('');
}

// 同步左侧知识点链接勾选态（单条）
function syncMenuLinkState(id, stageId, itemIdx, done) {
  if (singleBoard) return;
  const link = document.querySelector(
    `.menu-link[data-board="${id}"][data-stage-id="${stageId}"][data-item-idx="${itemIdx}"]`
  );
  if (link) link.classList.toggle('done', !!done);
}

// 全量刷新左侧知识点链接勾选态（用于全选/重置后）
function refreshMenuLinkStates(id) {
  if (singleBoard) return;
  BOARDS[id].stages.forEach(stage => {
    stage.items.forEach((_, idx) => {
      syncMenuLinkState(id, stage.id, idx, isDone(id, stage.id, idx));
    });
  });
}

// ===== 看板切换 =====
function switchBoard(id) {
  if (!BOARDS[id]) return;
  currentBoard = id;
  const cfg = BOARDS[id];

  // 单主题无切换菜单，直接渲染
  if (!singleBoard) {
    // 菜单组互斥：目标已展开则保持，否则折叠其它组并展开目标
    const targetGroup = document.getElementById(cfg.groupId);
    if (targetGroup.classList.contains('collapsed')) {
      document.querySelectorAll('#menuGroupsContainer .menu-group').forEach(g => g.classList.add('collapsed'));
      targetGroup.classList.remove('collapsed');
    }
    // 头部菜单高亮互斥
    document.querySelectorAll('.menu-group-header').forEach(h => h.classList.remove('active'));
    document.getElementById(cfg.headerId).classList.add('active');
  }

  // 看板互斥显示
  document.querySelectorAll('.board').forEach(b => b.classList.add('hidden'));
  document.getElementById(cfg.boardId).classList.remove('hidden');

  // 更新标题与副标题
  const h1 = document.querySelector('.header-left h1');
  const p = document.querySelector('.header-left p');
  if (h1) h1.textContent = cfg.title;
  if (p) p.textContent = cfg.subtitle;

  updateProgress(id);
  // 切换回当前看板后，同步左侧子菜单勾选态
  refreshMenuLinkStates(id);
}

// 默认展开第一个看板的菜单组，其余折叠（保持"同时只展开一个"）
function initMenuGroupState() {
  if (singleBoard) return;
  BOARD_IDS.forEach((id, i) => {
    document.getElementById(BOARDS[id].groupId).classList.toggle('collapsed', i !== 0);
  });
}

// ===== 侧边栏 =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

function toggleMenuGroup(groupId) {
  const target = document.getElementById(groupId);
  const isCollapsed = target.classList.contains('collapsed');
  document.querySelectorAll('#menuGroupsContainer .menu-group').forEach(g => g.classList.add('collapsed'));
  if (isCollapsed) target.classList.remove('collapsed');
}

// ===== 事件绑定（HTML 保持纯标签，全部在此统一绑定） =====
function bindEvents() {
  // 侧边栏折叠（HTML 中按钮 class 为 collapse-btn，兼容 sidebar-toggle 选择器）
  const toggleBtn = document.querySelector('.sidebar-toggle') || document.getElementById('collapse-btn');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);

  // 顶部阶段按钮：事件委托
  document.getElementById('stage-buttons').addEventListener('click', e => {
    const btn = e.target.closest('.stage-button');
    if (!btn) return;
    onStageClick(btn.dataset.board, Number(btn.dataset.stageId));
  });

  // 工具栏：一键全选 / 重置
  const selectAll = document.getElementById('select-all') || document.querySelector('.action-btn.select-all');
  const resetAllBtn = document.getElementById('reset-all') || document.querySelector('.action-btn.reset');
  if (selectAll) selectAll.addEventListener('click', completeAll);
  if (resetAllBtn) resetAllBtn.addEventListener('click', resetAll);
  // 兼容 HTML 中可能的旧 id
  const sidebarReset = document.getElementById('sidebar-reset');
  if (sidebarReset) sidebarReset.addEventListener('click', resetAll);

  // 返回顶部
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) backToTop.addEventListener('click', () => {
    const board = document.getElementById(BOARDS[currentBoard].boardId);
    if (board) board.scrollTo({ left: 0, behavior: 'smooth' });
  });

  // 看板列 / 卡片：事件委托（链接优先于卡片，卡片优先于列）
  BOARD_IDS.forEach(id => {
    const board = document.getElementById(BOARDS[id].boardId);
    board.addEventListener('click', e => {
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

  // 多主题：菜单组头部点击 → 切换看板；箭头点击 → 仅折叠/展开
  if (!singleBoard) {
    document.querySelectorAll('.menu-group-header').forEach(header => {
      header.addEventListener('click', e => {
        if (e.target.closest('.arrow')) {
          e.stopPropagation();
          toggleMenuGroup(header.closest('.menu-group').id);
          return;
        }
        switchBoard(header.dataset.board);
      });
    });
  }
}

// ===== Init =====
(async function init() {
  await opfsInit();                 // 先初始化 OPFS，使兜底存储可用
  BOARD_IDS.forEach(id => {
    loadProgress(id);               // 同步读 localStorage，并异步触发 OPFS 合并
    renderBoard(id);
  });
  renderMenuGroups();
  initMenuGroupState();
  // 设置初始可见看板（多主题时隐藏其余 board；单主题时直接显示）
  switchBoard(currentBoard);
  bindBoardScrollSync();
  bindEvents();
  // 若两种持久化均不可用，给出轻量提示（仅当前会话内有效）
  if (!STORAGE_AVAILABLE && !opfsDir) {
    const tip = document.createElement('div');
    tip.className = 'persist-warning';
    tip.textContent = '当前浏览器禁用了本地存储，学习进度不会被保存。';
    document.body.appendChild(tip);
  }
})();

// study-kanban app.js — 单看板逻辑（基于 WorkBuddy app.js 裁剪；视觉风格保持一致）
(function () {
  'use strict';

  const STORAGE_KEY = 'study_kanban_progress';
  const board = document.getElementById('board');
  const stageButtonsEl = document.getElementById('stage-buttons');
  const progressCircle = document.getElementById('progress-circle');
  const progressText = document.getElementById('progress-text');
  const progressDetail = document.getElementById('progress-detail');
  const sidebarBoardTitle = document.getElementById('sidebar-board-title');
  const sidebarBoardMeta = document.getElementById('sidebar-board-meta');

  let progress = loadProgress();

  /* ---------- 进度持久化 ---------- */
  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
  function cardKey(stageId, idx) { return stageId + '-' + idx; }

  /* ---------- 渲染看板 ---------- */
  function renderBoard() {
    board.innerHTML = '';
    let totalItems = 0;

    stages.forEach((stage) => {
      const col = document.createElement('div');
      col.className = 'column';
      col.style.setProperty('--col-color', stage.color || '#3b82f6');
      col.id = 'col-' + stage.id;
      col.dataset.stage = stage.id;

      const header = document.createElement('div');
      header.className = 'column-header';
      header.innerHTML =
        '<div class="column-title-row">' +
          '<span class="column-badge">' + stage.id + '</span>' +
          '<span class="column-title"></span>' +
        '</div>' +
        '<div class="column-sub"></div>' +
        '<div class="column-count"></div>';
      header.querySelector('.column-title').textContent = stage.title || '';
      header.querySelector('.column-sub').textContent = stage.subtitle || '';
      col.appendChild(header);

      const body = document.createElement('div');
      body.className = 'column-body';

      (stage.items || []).forEach((item, idx) => {
        totalItems++;
        const key = cardKey(stage.id, idx);
        const done = !!progress[key];

        const card = document.createElement('div');
        card.className = 'card' + (done ? ' done' : '');
        card.dataset.key = key;

        const tagLabel = TYPE_LABELS[item.type] || item.type || '';
        card.innerHTML =
          '<div class="card-top">' +
            '<div class="card-check"></div>' +
            '<div class="card-title"></div>' +
          '</div>' +
          (tagLabel ? '<span class="card-tag ' + (item.type || '') + '">' + tagLabel + '</span>' : '') +
          '<div class="card-desc"></div>' +
          (item.criteria ? '<div class="card-criteria"><strong>验收标准</strong><br>' + escapeHtml(item.criteria) + '</div>' : '') +
          (item.link ? '<a class="card-link" href="' + item.link + '" target="_blank" rel="noopener">查看文档 →</a>' : '');

        card.querySelector('.card-title').textContent = item.title || '';
        card.querySelector('.card-desc').textContent = item.desc || '';

        card.addEventListener('click', function (e) {
          if (e.target.closest('.card-link')) return; // 链接不触发勾选
          toggleCard(key, card);
        });

        body.appendChild(card);
      });

      header.querySelector('.column-count').textContent =
        (stage.items || []).length + ' 个知识点';
      col.appendChild(body);
      board.appendChild(col);
    });

    updateProgress();
    if (sidebarBoardMeta) {
      const stageCount = stages.length;
      const itemCount = board.querySelectorAll('.card').length;
      sidebarBoardMeta.textContent = stageCount + ' 个阶段 · ' + itemCount + ' 个知识点';
    }
  }

  /* ---------- 阶段胶囊按钮 ---------- */
  function renderStageButtons() {
    stageButtonsEl.innerHTML = '';
    stages.forEach((stage) => {
      const btn = document.createElement('button');
      btn.className = 'stage-pill';
      btn.textContent = stage.id + '. ' + (stage.title || '');
      btn.style.borderColor = stage.color || 'var(--border)';
      btn.addEventListener('click', function () {
        const col = document.getElementById('col-' + stage.id);
        if (col) col.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      });
      btn.addEventListener('mouseenter', function () {
        const col = document.getElementById('col-' + stage.id);
        if (col) col.classList.add('highlight');
      });
      btn.addEventListener('mouseleave', function () {
        const col = document.getElementById('col-' + stage.id);
        if (col) col.classList.remove('highlight');
      });
      stageButtonsEl.appendChild(btn);
    });
  }

  /* ---------- 卡片勾选 ---------- */
  function toggleCard(key, card) {
    if (progress[key]) {
      delete progress[key];
      card.classList.remove('done');
    } else {
      progress[key] = true;
      card.classList.add('done');
    }
    saveProgress();
    updateProgress();
  }

  /* ---------- 进度环 ---------- */
  function updateProgress() {
    const cards = board.querySelectorAll('.card');
    const total = cards.length;
    const done = cards.length ? board.querySelectorAll('.card.done').length : 0;
    const pct = total ? Math.round((done / total) * 100) : 0;

    progressText.textContent = pct + '%';
    progressDetail.textContent = done + ' / ' + total;

    const deg = (pct / 100) * 360;
    progressCircle.style.background =
      'conic-gradient(#ffffff ' + deg + 'deg, rgba(255,255,255,0.18) ' + deg + 'deg)';
  }

  /* ---------- 工具栏动作 ---------- */
  document.getElementById('select-all').addEventListener('click', function () {
    board.querySelectorAll('.card').forEach((card) => {
      const key = card.dataset.key;
      progress[key] = true;
      card.classList.add('done');
    });
    saveProgress();
    updateProgress();
  });

  document.getElementById('reset-all').addEventListener('click', function () {
    if (!confirm('确定要重置所有学习进度吗？')) return;
    progress = {};
    saveProgress();
    board.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('done');
    });
    updateProgress();
  });

  /* ---------- 侧边栏 ---------- */
  const sidebar = document.getElementById('sidebar');
  document.getElementById('collapse-btn').addEventListener('click', function () {
    sidebar.classList.toggle('collapsed');
    this.textContent = sidebar.classList.contains('collapsed') ? '›' : '‹';
  });
  document.getElementById('back-to-top').addEventListener('click', function () {
    board.scrollTo({ left: 0, behavior: 'smooth' });
  });
  document.getElementById('sidebar-reset').addEventListener('click', function () {
    document.getElementById('reset-all').click();
  });

  /* ---------- 工具 ---------- */
  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- 启动 ---------- */
  renderStageButtons();
  renderBoard();
  if (sidebarBoardTitle) {
    sidebarBoardTitle.textContent = document.querySelector('.header-left h1').textContent;
  }
})();

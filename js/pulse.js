/**
 * STELLAR MIND - Daily Industry Pulse Module
 * 每日行业动态脉冲、AI 自动检索模拟与【1键一键审核发布】流
 */

window.PulseModule = (function() {
  let isAdminView = false;

  function init() {
    renderPulseList();
    bindCrawlSimulation();
  }

  function renderPulseList() {
    const listContainer = document.getElementById('pulse-list-container');
    if (!listContainer) return;

    const data = window.STELLAR_DATA.dailyPulse;
    
    // In normal view, only show 'approved' items. In admin view, show 'pending' & 'approved'
    const visibleItems = isAdminView ? data : data.filter(item => item.status === 'approved');

    if (visibleItems.length === 0) {
      listContainer.innerHTML = `<div style="color:var(--text-dim); text-align:center; padding:20px;">暂无最新的行业脉冲</div>`;
      return;
    }

    listContainer.innerHTML = visibleItems.map(item => `
      <div class="pulse-card glass-panel ${item.status === 'pending' ? 'pending-card' : ''}" data-id="${item.id}" style="${item.status === 'pending' ? 'border: 1px solid rgba(245, 158, 11, 0.5); background: rgba(245, 158, 11, 0.05);' : ''}">
        <div class="pulse-meta">
          <span class="badge ${item.status === 'approved' ? 'badge-cyan' : 'badge-amber'}">${item.category} ${item.status === 'pending' ? '⏳ 待审核草稿' : ''}</span>
          <span style="font-size:0.75rem; color:var(--accent-amber); font-weight:600;"><i class="fa-solid fa-fire"></i> Impact: ${item.impactScore || '9.0/10'}</span>
        </div>
        <div class="pulse-card-title">${item.title}</div>
        <div class="pulse-summary">${item.aiSummary}</div>
        
        ${item.personalInsight ? `
          <div class="pulse-insight">
            💡 <strong>虞兮叹视点：</strong> ${item.personalInsight}
          </div>
        ` : ''}

        ${isAdminView && item.status === 'pending' ? `
          <div class="admin-actions">
            <button class="btn-approve" onclick="window.PulseModule.approveItem('${item.id}')">✓ 一键核准上架</button>
            <button class="btn-reject" onclick="window.PulseModule.rejectItem('${item.id}')">✕ 忽略</button>
          </div>
        ` : ''}
      </div>
    `).join('');

    // Bind click to focus on related planet
    listContainer.querySelectorAll('.pulse-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.admin-actions')) return; // ignore admin buttons
        const id = card.dataset.id;
        const item = data.find(i => i.id === id);
        if (item && item.relatedPlanetId) {
          const planetMesh = window.CosmosEngine.getPlanetMeshes().find(m => m.userData.id === item.relatedPlanetId);
          if (planetMesh) window.CosmosEngine.flyToPlanet(planetMesh);
        }
      });
    });
  }

  // 1-Click Approve Function
  function approveItem(id) {
    const item = window.STELLAR_DATA.dailyPulse.find(i => i.id === id);
    if (item) {
      item.status = 'approved';
      renderPulseList();
      window.UIModule.showToast(`✅ 已成功核准发布：${item.title.substring(0, 15)}...`);
    }
  }

  function rejectItem(id) {
    window.STELLAR_DATA.dailyPulse = window.STELLAR_DATA.dailyPulse.filter(i => i.id !== id);
    renderPulseList();
    window.UIModule.showToast(`🗑️ 已忽略此条行业资讯`);
  }

  // Simulate AI Agent Crawl & Summarize Trigger
  function bindCrawlSimulation() {
    const triggerBtn = document.getElementById('btn-trigger-ai-crawl');
    if (!triggerBtn) return;

    triggerBtn.addEventListener('click', () => {
      window.UIModule.showToast('🤖 AI 抓取 Agent 启动中：正在搜集 ArXiv / X / TechCrunch 最新资讯...');

      triggerBtn.disabled = true;
      triggerBtn.style.opacity = '0.5';

      setTimeout(() => {
        // Add a new simulated news draft item
        const newDraft = {
          id: 'pulse-' + Date.now(),
          title: '[全新捕获] Google 推出最新 Gemini 2.5 闪电多模态引擎',
          category: 'AI 模型',
          date: new Date().toISOString().split('T')[0],
          aiSummary: '1. 延迟相比上一代降低 60%；\n2. 原生支持 10M 超长 Token 上下文解析；\n3. 适合做实时语音与视频 Agent 交互。',
          personalInsight: '建议针对该 API 开展实时语音咨询分身的技术验证。',
          status: 'pending',
          relatedPlanetId: 'node-agent-multi',
          impactScore: '9.8 / 10'
        };

        window.STELLAR_DATA.dailyPulse.unshift(newDraft);
        renderPulseList();
        
        triggerBtn.disabled = false;
        triggerBtn.style.opacity = '1';

        window.UIModule.showToast('✨ AI 抓取完成！捕获 1 条高价值动态待审核');
      }, 2500);
    });
  }

  function toggleAdminView(enabled) {
    isAdminView = enabled;
    renderPulseList();
  }

  return {
    init,
    renderPulseList,
    approveItem,
    rejectItem,
    toggleAdminView
  };
})();

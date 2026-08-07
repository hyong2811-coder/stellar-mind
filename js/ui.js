/**
 * STELLAR MIND - Glass UI & Landing Page Interaction Module
 * 处理 UI 弹框、知识卡片渲染、搜索过滤、视图切换、媒体放大与 Toast 通知
 */

window.UIModule = (function() {
  let activeCategory = 'all';
  let isAdminMode = false;

  function init() {
    bindCategoryButtons();
    bindSearchInput();
    bindHeaderActions();
    bindNavScroll();
    renderKnowledgeGrid();
  }

  // Bind Top Header Nav Active Highlighting on Scroll
  function bindNavScroll() {
    const navItems = document.querySelectorAll('.nav-links .nav-item');
    window.addEventListener('scroll', () => {
      let current = '';
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    });
  }

  // Bind Bottom Dock Item 3D Fly-To Actions
  function bindDockNavigation() {
    const dockItems = document.querySelectorAll('.bottom-dock .dock-item');
    dockItems.forEach(item => {
      item.addEventListener('click', () => {
        dockItems.forEach(d => d.classList.remove('active'));
        item.classList.add('active');

        const target = item.dataset.target;
        if (target === 'home') {
          window.CosmosEngine.resetCamera();
        } else if (target === 'gallery') {
          handleKnowledgeCardClick('node-gallery');
        } else if (target === 'cases') {
          handleKnowledgeCardClick('node-case-studies');
        } else if (target === 'bio') {
          handleKnowledgeCardClick('node-bio');
        }
      });
    });
  }

  // Category Pills Filter
  function bindCategoryButtons() {
    const navContainer = document.getElementById('nav-categories');
    if (!navContainer) return;

    const categories = window.STELLAR_DATA.categories;
    navContainer.innerHTML = categories.map(cat => `
      <button class="cat-btn ${cat.id === 'all' ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    navContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-btn');
      if (!btn) return;

      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeCategory = btn.dataset.cat;
      const searchInput = document.getElementById('global-search');
      const searchVal = searchInput ? searchInput.value : '';

      window.CosmosEngine.filterNodes(activeCategory, searchVal);
      renderKnowledgeGrid(activeCategory, searchVal);
    });
  }

  // Global Search Input with Keyboard Shortcut Cmd/Ctrl + K
  function bindSearchInput() {
    const input = document.getElementById('global-search');
    if (!input) return;

    input.addEventListener('input', (e) => {
      window.CosmosEngine.filterNodes(activeCategory, e.target.value);
      renderKnowledgeGrid(activeCategory, e.target.value);
    });

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        input.focus();
        showToast('🔍 搜索模式已开启');
      }
    });
  }

  // Render Knowledge Cards Grid on Main Landing Page
  function renderKnowledgeGrid(catId = 'all', searchQuery = '') {
    const container = document.getElementById('knowledge-grid-container');
    if (!container) return;

    const nodes = window.STELLAR_DATA.nodes;
    const query = searchQuery.toLowerCase().trim();

    const filtered = nodes.filter(node => {
      const matchCat = catId === 'all' || node.category === catId;
      const matchSearch = !query || 
        node.title.toLowerCase().includes(query) || 
        node.summary.toLowerCase().includes(query) ||
        node.tags.some(t => t.toLowerCase().includes(query));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1 / -1; color: var(--text-dim); text-align: center; padding: 40px;">未找到匹配的技术文章与知识节点</div>`;
      return;
    }

    container.innerHTML = filtered.map(node => `
      <div class="knowledge-card glass-panel" onclick="window.UIModule.handleKnowledgeCardClick('${node.id}')">
        <div>
          <div class="card-top">
            <span class="badge badge-cyan">${getCategoryName(node.category)}</span>
            <span style="font-size:0.75rem; color:var(--text-dim);"><i class="fa-regular fa-clock"></i> ${node.readTime || '5 min'}</span>
          </div>
          <h3 class="card-title">${node.title}</h3>
          <p class="card-summary">${node.summary}</p>
        </div>
        <div>
          <div class="card-tags">
            ${(node.tags || []).map(tag => `<span class="tag-chip"># ${tag}</span>`).join('')}
          </div>
          <div class="card-footer">
            <span><i class="fa-regular fa-eye"></i> ${node.stats ? node.stats.views : 2100} 阅读</span>
            <span class="btn-read-more">阅读全篇 <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function handleKnowledgeCardClick(nodeId) {
    const data = window.STELLAR_DATA.nodes.find(n => n.id === nodeId);
    if (!data) return;

    // Bi-directional linkage: fly 3D camera to planet AND open details
    const planetMesh = window.CosmosEngine.getPlanetMeshes().find(m => m.userData.id === nodeId);
    if (planetMesh) {
      window.CosmosEngine.flyToPlanet(planetMesh);
    } else {
      openPlanetModal(data);
    }
  }

  // Open Planet Detail Modal & Link to Page Sections
  function openPlanetModal(data) {
    // Bi-directional Scroll Linkage based on Node ID
    if (data.id === 'node-gallery') {
      const gallerySec = document.getElementById('gallery');
      if (gallerySec) gallerySec.scrollIntoView({ behavior: 'smooth' });
    } else if (data.id === 'node-bio' || data.id === 'node-case-studies') {
      const servicesSec = document.getElementById('services');
      if (servicesSec) servicesSec.scrollIntoView({ behavior: 'smooth' });
    }

    const modal = document.getElementById('planet-detail-modal');
    if (!modal) return;

    modal.querySelector('.modal-category-badge').textContent = getCategoryName(data.category);
    modal.querySelector('.modal-title').textContent = data.title;
    
    // Parse Simple Markdown to HTML
    const formattedContent = simpleMarkdownToHTML(data.content);
    modal.querySelector('.modal-body').innerHTML = formattedContent;

    // Actions
    const bookBtn = modal.querySelector('.btn-book-consult');
    if (bookBtn) {
      bookBtn.onclick = () => {
        openBookingModal(data.title);
      };
    }

    modal.classList.add('active');
  }

  function closePlanetModal() {
    const modal = document.getElementById('planet-detail-modal');
    if (modal) modal.classList.remove('active');
  }

  // 1v1 Consultation Booking Modal
  function openBookingModal(topic = '通用技术咨询') {
    const bookingHtml = `
      <div id="booking-modal-overlay" class="interactive" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.8); backdrop-filter:blur(15px); z-index:100; display:flex; align-items:center; justify-content:center;">
        <div class="glass-panel glass-panel-glow" style="width: 460px; padding: 32px; border-radius: 24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
            <h3 style="font-size:1.25rem; color:#fff;"><i class="fa-solid fa-calendar-plus" style="color:var(--accent-sky);"></i> 预约 1v1 深度 AI 咨询</h3>
            <button onclick="document.getElementById('booking-modal-overlay').remove()" style="background:none; border:none; color:#aaa; font-size:1.4rem; cursor:pointer;">✕</button>
          </div>
          <p style="font-size:0.88rem; color:#cbd5e1; margin-bottom:18px;">当前预约主题：<strong style="color:var(--accent-sky);">${topic}</strong></p>
          <form id="booking-form" onsubmit="event.preventDefault(); window.UIModule.submitBooking();">
            <div style="margin-bottom:14px;">
              <label style="font-size:0.8rem; color:#94a3b8; display:block; margin-bottom:6px;">您的姓名 / 称呼</label>
              <input type="text" required placeholder="如：张总 / Alex" style="width:100%; padding:12px 16px; border-radius:10px; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:0.88rem;" />
            </div>
            <div style="margin-bottom:14px;">
              <label style="font-size:0.8rem; color:#94a3b8; display:block; margin-bottom:6px;">联系方式 (微信 / 邮箱 / 电话)</label>
              <input type="text" required placeholder="微信 ID 或 2294690131@qq.com" style="width:100%; padding:12px 16px; border-radius:10px; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:0.88rem;" />
            </div>
            <div style="margin-bottom:24px;">
              <label style="font-size:0.8rem; color:#94a3b8; display:block; margin-bottom:6px;">期望咨询的企业问题或技术诉求简述</label>
              <textarea rows="3" placeholder="例如：我们想为内部客服搭建一个 RAG 向量数据库，想评估选型与成本..." style="width:100%; padding:12px 16px; border-radius:10px; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:0.88rem; resize:none;"></textarea>
            </div>
            <button type="submit" class="btn-primary" style="width:100%; padding:14px; font-size:0.95rem; justify-content:center;">确认提交预约申请</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', bookingHtml);
  }

  function submitBooking() {
    const modal = document.getElementById('booking-modal-overlay');
    if (modal) modal.remove();
    showToast('🎉 预约申请已成功提交！虞兮叹将在 2 小时内主动联系您。');
  }

  // Toast Notification System
  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // Utility: Category ID to Readable Name
  function getCategoryName(catId) {
    const found = window.STELLAR_DATA.categories.find(c => c.id === catId);
    return found ? found.name : 'AI 专区';
  }

  // Utility: Advanced Markdown to HTML Parser
  function simpleMarkdownToHTML(md) {
    if (!md) return '';
    let html = md;

    // Code blocks with syntax highlighting container
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, lang, code) {
      return `<div style="background:rgba(0,0,0,0.6); border:1px solid rgba(56,189,248,0.3); border-radius:10px; padding:14px; margin:14px 0; overflow-x:auto; font-family:var(--font-mono); font-size:0.84rem; color:#38bdf8;"><pre><code>${code.trim()}</code></pre></div>`;
    });

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote style="border-left:3px solid var(--accent-sky); background:rgba(56,189,248,0.08); padding:10px 16px; margin:14px 0; border-radius:0 8px 8px 0; color:#e2e8f0;">$1</blockquote>');

    // LaTeX Math Blocks
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, '<div style="background:rgba(192,132,252,0.1); border:1px solid rgba(192,132,252,0.3); padding:10px 16px; border-radius:8px; text-align:center; font-family:var(--font-mono); color:#c084fc; margin:14px 0;">$$ $1 $$</div>');

    // Markdown Tables Parsing
    html = html.replace(/^\|(.+)\|$/gim, function(match) {
      const cells = match.split('|').filter(c => c.trim() !== '');
      if (match.includes('---')) return ''; // header divider
      return `<tr style="border-bottom:1px solid rgba(255,255,255,0.08);">${cells.map(c => `<td style="padding:8px 12px; font-size:0.86rem; color:#cbd5e1;">${c.trim()}</td>`).join('')}</tr>`;
    });
    html = html.replace(/(<tr[\s\S]*?<\/tr>)/g, '<table style="width:100%; border-collapse:collapse; margin:16px 0; background:rgba(0,0,0,0.4); border-radius:10px; overflow:hidden;">$1</table>');

    // Headings
    html = html
      .replace(/^# (.*$)/gim, '<h1 style="font-size:1.6rem; color:#fff; font-family:var(--font-heading); margin:18px 0 10px 0; font-weight:800;">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 style="font-size:1.3rem; color:var(--accent-sky); font-family:var(--font-heading); margin:16px 0 8px 0; font-weight:700;">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 style="font-size:1.1rem; color:#e2e8f0; font-family:var(--font-heading); margin:14px 0 6px 0; font-weight:700;">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 style="font-size:0.95rem; color:var(--accent-amber); margin:12px 0 4px 0; font-weight:600;">$1</h4>')
      .replace(/---/g, '<hr style="border:none; border-top:1px solid rgba(255,255,255,0.12); margin:20px 0;" />')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff;">$1</strong>')
      .replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.1); color:var(--accent-sky); padding:2px 6px; border-radius:4px; font-family:var(--font-mono); font-size:0.85em;">$1</code>')
      .replace(/^\- (.*$)/gim, '<li style="margin-left:18px; margin-bottom:4px; color:#cbd5e1;">$1</li>')
      .replace(/\n\n/g, '<br/>');

    return html;
  }

  // Lightbox Modal for Fullscreen Image Viewing
  function openLightbox(src, title = '') {
    const existing = document.getElementById('lightbox-overlay');
    if (existing) existing.remove();

    const html = `
      <div id="lightbox-overlay" class="interactive" onclick="this.remove()" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); backdrop-filter:blur(15px); z-index:200; display:flex; flex-direction:column; align-items:center; justify-content:center; animation:fadeIn 0.25s ease;">
        <button onclick="document.getElementById('lightbox-overlay').remove()" style="position:absolute; top:24px; right:28px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; font-size:1.5rem; width:44px; height:44px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">✕</button>
        <div onclick="event.stopPropagation()" style="max-width:90vw; max-height:82vh; text-align:center;">
          <img src="${src}" alt="${title}" style="max-width:100%; max-height:75vh; border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(56,189,248,0.2); border:1px solid rgba(255,255,255,0.15);" />
          ${title ? `<div style="margin-top:14px; font-size:1rem; color:#fff; font-weight:600; text-shadow:0 2px 10px rgba(0,0,0,0.8);">${title}</div>` : ''}
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function openPulseModal() {
    const modal = document.getElementById('pulse-drawer-modal');
    if (modal) {
      modal.classList.add('active');
      if (window.PulseModule && window.PulseModule.renderPulseList) {
        window.PulseModule.renderPulseList();
      }
    }
  }

  function closePulseModal() {
    const modal = document.getElementById('pulse-drawer-modal');
    if (modal) modal.classList.remove('active');
  }

  return {
    init,
    openPlanetModal,
    closePlanetModal,
    openPulseModal,
    closePulseModal,
    openBookingModal,
    submitBooking,
    openLightbox,
    handleKnowledgeCardClick,
    showToast
  };
})();

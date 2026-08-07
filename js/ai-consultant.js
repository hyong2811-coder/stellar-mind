/**
 * STELLAR MIND - AI Persona Consultant Module
 * 个人 AI 咨询分身、快速问题快捷引导与 1v1 预约转化
 */

window.AIConsultantModule = (function() {
  let isChatOpen = false;

  function init() {
    bindChatToggle();
    bindChatInput();
    renderQuickQuestions();
  }

  function bindChatToggle() {
    const trigger = document.getElementById('ai-chat-trigger');
    const windowEl = document.getElementById('ai-chat-window');
    const closeBtn = document.getElementById('ai-chat-close');

    if (trigger && windowEl) {
      trigger.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        windowEl.classList.toggle('active', isChatOpen);
      });
    }

    if (closeBtn && windowEl) {
      closeBtn.addEventListener('click', () => {
        isChatOpen = false;
        windowEl.classList.remove('active');
      });
    }
  }

  function renderQuickQuestions() {
    const quickContainer = document.getElementById('chat-quick-questions');
    if (!quickContainer) return;

    const questions = window.STELLAR_DATA.aiPersona.quickQuestions;
    quickContainer.innerHTML = questions.map(q => `
      <button class="chat-quick-btn" style="padding:4px 10px; border-radius:9999px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); color:var(--text-muted); font-size:0.75rem; cursor:pointer; text-align:left; transition:all 0.2s;" onclick="window.AIConsultantModule.sendQuickQuestion('${q}')">
        ${q}
      </button>
    `).join('');
  }

  function sendQuickQuestion(text) {
    const cleanText = text.replace(/^👉\s*/, '');
    appendUserMessage(cleanText);
    generateAIResponse(cleanText);
  }

  function bindChatInput() {
    const input = document.getElementById('chat-input-field');
    const sendBtn = document.getElementById('chat-send-btn');

    if (!input || !sendBtn) return;

    const handleSend = () => {
      const val = input.value.trim();
      if (!val) return;
      input.value = '';
      appendUserMessage(val);
      generateAIResponse(val);
    };

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  function appendUserMessage(text) {
    const messagesContainer = document.getElementById('chat-messages-list');
    if (!messagesContainer) return;

    const msg = document.createElement('div');
    msg.className = 'chat-bubble chat-bubble-user';
    msg.textContent = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendAIMessage(text, showBookingBtn = false) {
    const messagesContainer = document.getElementById('chat-messages-list');
    if (!messagesContainer) return;

    const msg = document.createElement('div');
    msg.className = 'chat-bubble chat-bubble-ai';
    msg.innerHTML = text;

    if (showBookingBtn) {
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.style.cssText = 'margin-top:10px; padding:6px 14px; font-size:0.78rem; display:block; width:100%;';
      btn.textContent = '📅 立即预约 1v1 深度咨询';
      btn.onclick = () => {
        window.UIModule.openBookingModal('通过 AI 分身发起的深度咨询');
      };
      msg.appendChild(btn);
    }

    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Pre-seeded RAG Knowledge Retrieval Simulation
  function generateAIResponse(userText) {
    const text = userText.toLowerCase();

    // Show typing indicator
    const messagesContainer = document.getElementById('chat-messages-list');
    const typing = document.createElement('div');
    typing.className = 'chat-bubble chat-bubble-ai';
    typing.id = 'chat-typing-indicator';
    typing.innerHTML = `<span style="font-style:italic; color:#94a3b8;">Alex AI 分身正在思考并检索知识库...</span>`;
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      if (typing) typing.remove();

      if (text.includes('服务') || text.includes('帮助') || text.includes('做哪些')) {
        appendAIMessage(`
          虞兮叹 (Alex) 提供以下三大核心 AI 咨询与落地服务：<br/><br/>
          1. <strong>企业 Multi-Agent 架构设计与陪跑</strong>（解决复杂长流程自洽问题）<br/>
          2. <strong>高精度 RAG 与防幻觉数据库搭建</strong>（防幻觉，召回率提升至 90%+）<br/>
          3. <strong>定制化 AI 专属星空知识库与数字分身</strong><br/><br/>
          您可以随时预约 1v1 极速答疑！
        `, true);
      } else if (text.includes('rag') || text.includes('检索') || text.includes('幻觉') || text.includes('准确')) {
        appendAIMessage(`
          根据虞兮叹的 RAG 知识库节点：<br/>
          解决 RAG 幻觉的核心在于：<strong>“放弃单一向量检索，改为 Hybrid Search (Vector + BM25) + Cohere Rerank 重排序”</strong>，并在生成后引入 Self-RAG 反查机制。<br/><br/>
          具体的架构切片策略可以在星空的 <strong>【企业级 RAG 架构拆解与防幻觉】</strong> 节点中查看。
        `, true);
      } else if (text.includes('收费') || text.includes('流程') || text.includes('预约') || text.includes('价格')) {
        appendAIMessage(`
          咨询流程十分高效：<br/>
          1. <strong>1v1 60 分钟单次深度答疑</strong>：评估业务场景、梳理架构避坑点。<br/>
          2. <strong>月度/季度项目陪跑</strong>：全程指导研发团队落地交付。<br/><br/>
          提交下方预约信息后， Alex 会亲自联系您沟通具体排期。
        `, true);
      } else {
        appendAIMessage(`
          我是基于 Alex 个人星空知识库微调的 AI 分身。针对您提到的“${userText}”，建议点击星空中对应的星球节点查看详细深度文章，或者直接预约与 Alex 1v1 交流。
        `, true);
      }
    }, 1200);
  }

  return {
    init,
    sendQuickQuestion
  };
})();

/**
 * STELLAR MIND - Core Data Configuration (v7.0.0)
 * 包含：体系化深度文档 (AI 训练师全套、2026 大模型八股、Multi-Agent、RAG 防幻觉与 Token 降本)
 */

window.STELLAR_DATA = {
  categories: [
    { id: 'all', name: '全部专区', color: '#38bdf8', icon: 'sparkles' },
    { id: 'trainer_full', name: '🎓 AI 训练师全套体系', color: '#fbbf24', icon: 'graduation-cap' },
    { id: 'agent_multi', name: '🤖 Multi-Agent 范式', color: '#06b6d4', icon: 'robot' },
    { id: 'rag_guard', name: '🛡️ RAG 防幻觉', color: '#10b981', icon: 'shield-halved' },
    { id: 'llm_2026', name: '🔥 2026 大模型八股', color: '#c084fc', icon: 'fire' },
    { id: 'personal', name: '📸 骑行摄影与作品集', color: '#f43f5e', icon: 'camera' }
  ],

  nodes: [
    {
      id: 'node-bio',
      title: '虞兮叹 · AI 架构与训练师顾问 Profile',
      category: 'personal',
      orbitRadius: 0,
      orbitSpeed: 0,
      size: 3.5,
      color: '#fbbf24',
      emissive: '#f59e0b',
      position: { x: 0, y: 0, z: 0 },
      summary: '虞兮叹：骑行旅行者、AI 训练师导师与大模型架构顾问。专注于数据标注 SOP、RAG 防幻觉与 Agent 商业落地。',
      content: `
# 🌟 虞兮叹 · AI 训练师与数字大脑 Profile

欢迎来到我的数字星空！我是 **虞兮叹 (Yu Xitan)**，一名专注于大模型后训练 (Post-training) 架构落地、AI 训练师体系构建与企业智能化转型的咨询顾问。

---

### 💡 核心技术优势与架构能力

#### 1. AI 训练师全套体系与数据 SOP 建设
- 熟练掌握从**原始数据清洗 (Data Cleaning)**、**SFT 指令集构建 (Instruction Pairs)** 到 **RLHF/DPO 人类偏好对齐 (Preference Alignment)** 的全流程闭环。
- 制定 10% ~ 20% 动态抽检比例、准确率 95%+ 严格返修 SOP 以及人工/LLM-as-Judge 双轨评测 Benchmark。

#### 2. Multi-Agent 协同拓扑设计
- 擅长 Supervisor-Worker 主从编排、Sequential Pipeline 链式管道与 Peer Consensus 辩论网格。
- 结合 JSON Schema 规范化 Function Calling 工具调用，实现零漂移的业务自动化闭环。

#### 3. 高精度 RAG 知识库防幻觉与 Token 降本
- **混合检索 (Hybrid Search)**：结合 Dense Embedding 语义向量与 BM25 Sparse 关键词粗检索。
- **重排 (Reranking)**：引入 BGE-Reranker 对 Top 50 结果重新打分，准确率突破 95%+。
- **Token 降本 70%**：语义缓存 (Semantic Caching) + Prompt 剪裁 + 智能模型路由。

---

### 📊 个人能力与服务矩阵
| 服务维度 | 适用场景 | 交付产出 |
| :--- | :--- | :--- |
| **AI 训练师团队搭设** | 企业内部需要建立标注/微调队伍 | 标注规则文档、SOP 抽检表格与培训教程 |
| **RAG 知识库防幻觉诊断** | 企业私有知识库回答频繁“胡言乱语” | 混合检索架构改造、Reranking 接入方案 |
| **Multi-Agent 拓扑定制** | 复杂业务流程自动化（如代码审查/客服） | 状态机代码、JSON Schema 工具接口定义 |

---

### 📍 联系方式与 1v1 预约
- **所在地**：江西 · 赣州
- **邮箱**：\`2294690131@qq.com\`
- **咨询服务**：提供企业 AI 选型诊断、SFT 规范设计与 1v1 架构指导。
      `,
      tags: ['虞兮叹', 'AI 训练师', 'RAG 防幻觉', '1v1 咨询'],
      readTime: '3 min',
      stats: { views: 9800, stars: 1250 }
    },
    /* --- 1. AI 训练师全套体系 深度文档 --- */
    {
      id: 'node-trainer-stage1',
      title: '🎓 AI 训练师体系一：数据清洗与 SFT 指令对构建 SOP',
      category: 'trainer_full',
      orbitRadius: 20,
      orbitSpeed: 0.003,
      size: 2.6,
      color: '#fbbf24',
      emissive: '#d97706',
      position: { x: 20, y: 14, z: -10 },
      summary: '全套 SFT 阶段数据工程体系：文本去重 (MinHash)、有害过滤、ChatML 格式规范与多姿性 Instruction Pairs 编写。',
      content: `
# 🎓 AI 训练师体系一：数据清洗与 SFT 指令对构建 SOP

在 LLM 的后训练 (Post-training) 阶段，数据质量决定了模型的“智商上限”。本文档提供了系统化的数据工程规范。

---

### 1. 原始数据清洗与去毒 (Data Cleaning & Safety)

#### 1.1 文本去重与清洗算法
- **MinHash + LSH (局部敏感哈希)**：用于海量网页抓取文本的 Jaccard 相似度去重，设定阈值 0.85。
- **正则过滤**：去除 HTML 标签、特殊不可见字符、重复标点与低质量爬虫噪音。

#### 1.2 有害信息过滤 (Safety & Toxicity Filtering)
- 设定 6 大违规禁忌维度：政治敏感、暴力色情、违法犯罪、个人隐私 (PII)、仇恨言论、自我伤害。
- 引入轻量级 Classifier 过滤得分过高的违规文本。

---

### 2. SFT 指令集 (Instruction-Response Pairs) 构建标准

#### 2.1 Standard ChatML JSON 格式规范
\`\`\`json
{
  "id": "sft_train_00124",
  "domain": "finance_analysis",
  "messages": [
    { "role": "system", "content": "你是一名精通财报分析的资深金融 AI 助手。" },
    { "role": "user", "content": "请分析腾讯 2025 年 Q4 财报中增值服务收入的增长原因。" },
    { "role": "assistant", "content": "腾讯 2025 年 Q4 财报显示，增值服务收入同比上升 12%..." }
  ]
}
\`\`\`

#### 2.2 SFT 指令对编写四大金律
1. **多姿性 (Diversity)**：涵盖问答、摘要、翻译、代码、逻辑推理与角色扮演等 10+ 领域。
2. **复杂性 (Complexity)**：逐步增加 Multi-turn 逻辑链条，避免简单的单句对答。
3. **真实性 (Factuality)**：所有事实类回答必须附带权威引用出处，防止训练集引入幻觉。
4. **一致性 (Self-Consistency)**：确保同一模型在相同 System Prompt 下输出逻辑与语气统一。

---

### 3. 标注规则文档 (Annotation Guidelines) 设计
训练师在下发标注任务前，必须撰写标准的规则文档，包含：
- **定义说明**：对任务边界（如“摘要长度 100-200 字”）做精准量化。
- **Bad Case 示例**：罗列 5 个以上的典型错误案例及扣分项。
- ** Good Case 示例**：提供满分标杆回答供标注员对齐。
      `,
      tags: ['AI 训练师', 'SFT 数据集', '数据清洗', '标注规范'],
      readTime: '12 min',
      stats: { views: 5100, stars: 720 }
    },
    {
      id: 'node-trainer-stage2',
      title: '🎓 AI 训练师体系二：SFT 微调与 LoRA/QLoRA 实战教程',
      category: 'trainer_full',
      orbitRadius: 30,
      orbitSpeed: 0.0025,
      size: 2.5,
      color: '#f59e0b',
      emissive: '#b45309',
      position: { x: -25, y: -12, z: 15 },
      summary: '深入 Supervised Fine-Tuning 机制，详解 LoRA 低秩矩阵分解公式 $W + B \\cdot A$、QLoRA 4-bit 量化与训练 Loss 诊断。',
      content: `
# 🎓 AI 训练师体系二：SFT 微调与 LoRA/QLoRA 实战教程

SFT (Supervised Fine-Tuning) 是让基座模型 (Base LLM) 学会“听懂人类指令并规整回答”的核心环节。

---

### 1. SFT 微调原理与损失函数

SFT 的本质是**有监督的最大似然估计 (MLE)**。在给定 Prompt $x$ 的条件下，最大化目标回答 $y = (y_1, y_2, ..., y_T)$ 的条件概率：

$$\\mathcal{L}_{SFT}(\\theta) = - \\sum_{t=1}^{T} \\log P_\\theta(y_t \\mid x, y_{<t})$$

---

### 2. PEFT / LoRA 低秩分解原理

全参数微调 (Full Fine-Tuning) 显存开销极大。LoRA (Low-Rank Adaptation) 通过冻结预训练权重 $W_0 \\in \\mathbb{R}^{d \\times k}$，引入低秩分解矩阵：

$$h = W_0 x + \\Delta W x = W_0 x + \\frac{\\alpha}{r} B A x$$

其中 $A \\in \\mathbb{R}^{r \\times k}$ 使用高斯分布初始化，$B \\in \\mathbb{R}^{d \\times r}$ 初始化为零，$r \\ll \\min(d, k)$ (通常取 $r=8$ 或 $r=16$)。

#### LoRA 核心参数配置
- **r (Rank)**：决定低秩矩阵维数。大模型常规任务设 8~16；复杂代码/数学设 32~64。
- **lora_alpha**：缩放系数，通常设为 $2 \\times r$。
- **target_modules**：推荐覆盖 Attention 的 \`q_proj, k_proj, v_proj, o_proj\` 及 MLP 层。

---

### 3. QLoRA 4-bit 量化与显存优化

QLoRA 引入 3 大创新：
1. **NF4 (NormalFloat 4)**：针对正态分布权重优化的 4-bit 分位数量化。
2. **Double Quantization (双重量化)**：对量化常数再次量化，节省每参数 0.37 bit。
3. **Paged Optimizers (分页优化器)**：利用 CUDA 统一内存，防止 OOM 显存突发尖刺。

---

### 4. 训练监控与 Loss 诊断 SOP
- **Loss 持续下降但验证集上升**：模型发生**过拟合 (Overfitting)**，需调小 Epoch 或加大 Weight Decay。
- **Loss 居高不下**：学习率 (Learning Rate) 过小，建议调大或使用 Cosine 衰减调度器。
      `,
      tags: ['SFT 微调', 'LoRA', 'QLoRA', 'PEFT'],
      readTime: '15 min',
      stats: { views: 4900, stars: 650 }
    },
    {
      id: 'node-trainer-stage3',
      title: '🎓 AI 训练师体系三：人类偏好对齐 (RLHF & DPO) 深度指南',
      category: 'trainer_full',
      orbitRadius: 40,
      orbitSpeed: 0.002,
      size: 2.7,
      color: '#ef4444',
      emissive: '#b91c1c',
      position: { x: 30, y: -18, z: -20 },
      summary: '奖励模型 (RM) 打分标注、PPO 强化学习 KL 散度惩罚与 Direct Preference Optimization (DPO) 损失函数推导。',
      content: `
# 🎓 AI 训练师体系三：人类偏好对齐 (RLHF & DPO) 深度指南

RLHF (Reinforcement Learning from Human Feedback) 是解决大模型生成内容符合人类“有用性 (Helpfulness)、真实性 (Honesty)、无害性 (Harmlessness)”的核心武器。

---

### 1. 奖励模型 (Reward Model, RM) 训练与 Pairwise 打分

训练师对针对同一 Prompt $x$ 生成的 2 个回答 $(y_w, y_l)$ 进行 Pairwise 排序 ($y_w$ 优于 $y_l$)，损失函数为 Bradley-Terry 模型：

$$\\mathcal{L}_{RM}(\\psi) = - \\mathbb{E}_{(x, y_w, y_l)} \\left[ \\log \\sigma \\left( r_\\psi(x, y_w) - r_\\psi(x, y_l) \\right) \\right]$$

---

### 2. PPO 强化学习三阶段

1. **SFT 阶段**：训练符合格式要求的基座策略 $\\pi^{SFT}$。
2. **RM 阶段**：基于人类偏好排序拟合标量标度 $r_\\psi(x, y)$。
3. **PPO 阶段**：优化策略 $\\pi_\\phi^{RL}$，加入 KL 散度惩罚防止偏离原模型过远：

$$\\max_{\\phi} \\mathbb{E} \\left[ r_\\psi(x, y) - \\beta D_{KL}(\\pi_\\phi^{RL}(y \\mid x) \\parallel \\pi^{SFT}(y \\mid x)) \\right]$$

---

### 3. DPO (Direct Preference Optimization) 直接偏好优化

DPO 证明了可通过解析替换，直接利用 SFT 模型隐式表示奖励函数，无需显式训练 Reward Model：

$$\\mathcal{L}_{DPO}(\\theta; \\pi_{ref}) = - \\mathbb{E}_{(x, y_w, y_l)} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_\\theta(y_w \\mid x)}{\\pi_{ref}(y_w \\mid x)} - \\beta \\log \\frac{\\pi_\\theta(y_l \\mid x)}{\\pi_{ref}(y_l \\mid x)} \\right) \\right]$$

> 💡 **训练优势**：DPO 训练极为稳定，完全避免了 PPO 阶段 Actor-Critic 模型的复杂超参数调优。
      `,
      tags: ['RLHF', 'DPO', 'Reward Model', '价值观对齐'],
      readTime: '16 min',
      stats: { views: 6300, stars: 890 }
    },
    {
      id: 'node-trainer-stage4',
      title: '🎓 AI 训练师体系四：Eval 评估评测与抽检 SOP 手册',
      category: 'trainer_full',
      orbitRadius: 50,
      orbitSpeed: 0.0015,
      size: 2.6,
      color: '#10b981',
      emissive: '#047857',
      position: { x: -35, y: 18, z: -15 },
      summary: '主客观结合评测体系：Win Rate 胜率双盲测试、LLM-as-Judge 自动评分、抽检返修制度与安全护栏 (Guardrails)。',
      content: `
# 🎓 AI 训练师体系四：Eval 评估评测与抽检 SOP 手册

没有量化评估就没有模型优化。本手册总结了工业级 LLM 评估与训练师质量管控体系。

---

### 1. 评估四大方法论

| 评估维度 | 方法 | 关键指标 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **客观硬性指标** | 自动匹配脚本 | Pass@1, ROUGE-L, BLEU-4 | 代码生成、数学推导、选择题 |
| **双盲胜率测试** | 人工 Pairing 比对 | Win / Tie / Loss Rate, ELO | 复杂问答、写作创意、角色扮演 |
| **LLM-as-Judge** | 强模型 (GPT-4) 评分 | 1-10 分 Likert 量表 | 批量大规模自动化快速回归 |
| **安全对抗测试** | 红队测试 (Red Teaming) | Jailbreak Success Rate | 越狱攻击、安全护栏验证 |

---

### 2. 训练师质量管理与抽检返修 SOP

\`\`\`
[数据标注/生成] ➔ [10%-20% 动态抽检] ➔ [准确率 ≥ 95%?] ➔ (Yes: 入库训练)
                                             ↓ (No)
                                     [全量返修 + 处罚扣分]
\`\`\`

1. **抽检比例**：新手标注员 100% 审核；稳定期员工每日随机抽检 15%。
2. **返修阈值**：抽检准确率低于 95% 时，整批数据驳回全量重做。
3. **Consistency 一致性校验**：不同训练师对同一数据的评分一致性 Cohen's Kappa 系数须 $\\ge 0.75$。
      `,
      tags: ['LLM 评估', 'Win Rate', 'LLM-as-Judge', '抽检 SOP'],
      readTime: '14 min',
      stats: { views: 5700, stars: 780 }
    },
    /* --- 2. 2026 大模型八股 深度文档 --- */
    {
      id: 'node-llm-interview-2026',
      title: '🔥 2026 AI 大模型应用开发八股与面试真题',
      category: 'llm_2026',
      orbitRadius: 48,
      orbitSpeed: 0.0012,
      size: 2.7,
      color: '#c084fc',
      emissive: '#9333ea',
      position: { x: -40, y: 20, z: -16 },
      summary: '提炼自 2026 最新大厂面试八股：Transformer 算力开销、RoPE 位置编码、KV Cache 显存与 Agent ReAct 闭环。',
      content: `
# 🔥 2026 AI 大模型应用开发八股与面试真题

提炼自墨圆大模型 2026 全网最新大厂面试八股文（深度归档自 \`docs/2026最全AI大模型面试题...html\`）。

---

### 1. Transformer 架构与计算复杂度分析
- **Q：Standard Self-Attention 的时间与空间复杂度是多少？**
  - **A**：对于序列长度为 $N$、隐层维度为 $d$ 的输入，$Q, K, V$ 投影维度为 $d$。Attention Matrix $A = \\text{softmax}(QK^T / \\sqrt{d})$ 的计算复杂度为 $O(N^2 d)$，空间复杂度为 $O(N^2)$。当 $N$ 极大时（如 128k），$N^2$ 成为瓶颈，因此诞生了 FlashAttention (利用 Tile 优化 SRAM 读写) 与 Multi-Query Attention (MQA/GQA)。

---

### 2. KV Cache 原理与显存占用公式
- **Q：解码阶段 (Decode Phase) 为什么需要 KV Cache？显存如何计算？**
  - **A**：在逐 Token 生成时，历史 Token 的 $K, V$ 向量保持不变。若不缓存，第 $t$ 步生成需要重新计算前 $t-1$ 个 Token 的 $K, V$。
  - **显存公式**：对于 $L$ 层模型，注意力头数 $H$，Head 维度 $D$，序列长度 $S$，batch size $B$，使用 FP16 (2 bytes)：
    $$\\text{KV Cache Size} = 2 \\times 2 \\times B \\times L \\times H \\times D \\times S \\text{ bytes}$$

---

### 3. Agent vs Workflow 与 ReAct 循环
- **Q：什么是 ReAct (Reason + Action) 循环？**
  - **A**：ReAct 将 LLM 的思考过程显式拆解为 **Thought ➔ Action ➔ Observation** 的交替循环。LLM 生成 Thought 分析当前状态，输出 Action 触发外部工具，系统捕捉 Observation 作为下一个提示词反馈给 LLM，直至得到 Final Answer。
      `,
      tags: ['大模型八股', 'Agent 面试题', 'KV Cache', 'Transformer'],
      readTime: '18 min',
      stats: { views: 6100, stars: 890 }
    },
    /* --- 3. Multi-Agent 范式 深度文档 --- */
    {
      id: 'node-agent-multi',
      title: '🤖 Multi-Agent 协同范式与工具调用拓扑设计',
      category: 'agent_multi',
      orbitRadius: 28,
      orbitSpeed: 0.0028,
      size: 2.5,
      color: '#06b6d4',
      emissive: '#0284c7',
      position: { x: 22, y: 10, z: -12 },
      summary: 'Supervisor-Worker 状态机、Sequential Pipeline 管道、Peer Consensus 辩论网格与 JSON Schema 工具调用。',
      content: `
# 🤖 Multi-Agent 协同范式与工具调用拓扑设计

单 Agent 在面对长流程、跨领域的多步骤任务时，常因为上下文漂移 (Context Drift) 和工具滥用导致失败。**Multi-Agent 模块化系统** 是解法。

---

### 1. 三大经典 Multi-Agent 拓扑架构

#### 1.1 主从监督架构 (Supervisor - Worker Pattern)
由一个主 Supervisor Agent 控制全局状态机 (State Machine)，将大目标解构成子 Task，分发给专门的 Worker Agent（如 PythonCoder, SearchAgent, ReviewerAgent）。

#### 1.2 链式管道架构 (Sequential Pipeline Pattern)
前一个 Agent 的 Structured Output 作为后一个 Agent 的 Input。
\`\`\`
[RequirementsAgent] ➔ [ArchitectAgent] ➔ [CoderAgent] ➔ [TesterAgent]
\`\`\`

#### 1.3 辩论与共识网格 (Peer Debate Mesh)
两个观点相反的 Agent (Pro vs Con) 针对某一方案展开多轮 Debating，最后由 Judge Agent 总结产出高可靠性决策。

---

### 2. JSON Schema Function Calling 标准定义

\`\`\`json
{
  "name": "execute_sql_query",
  "description": "在只读生产数据库中执行 SQL 查询并返回 JSON 结果",
  "parameters": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "标准 PostgreSQL SQL 语句" },
      "timeout_ms": { "type": "integer", "default": 5000 }
    },
    "required": ["query"]
  }
}
\`\`\`
      `,
      tags: ['Multi-Agent', 'Function Calling', 'ReAct 循环', 'Agent 拓扑'],
      readTime: '15 min',
      stats: { views: 4200, stars: 530 }
    },
    /* --- 4. RAG 防幻觉 深度文档 --- */
    {
      id: 'node-rag-advanced',
      title: '🛡️ 企业级 RAG 检索防幻觉与 Hybrid Search 架构',
      category: 'rag_guard',
      orbitRadius: 38,
      orbitSpeed: 0.002,
      size: 2.6,
      color: '#10b981',
      emissive: '#059669',
      position: { x: -28, y: -8, z: 10 },
      summary: 'Dense + Sparse 混合检索、RRF 重排算法、Parent-Child 嵌套切片与 Self-RAG 校验机制。',
      content: `
# 🛡️ 企业级 RAG 检索防幻觉与 Hybrid Search 架构

企业私有知识库落地的最大痛点在于**检索不到位导致的模型“胡言乱语” (Hallucination)**。

---

### 1. 混合检索 (Hybrid Search) 算法原理

单纯的向量检索 (Dense Retrieval) 缺乏对产品型号、人名、代码专有名词的精确匹配能力；BM25 (Sparse Retrieval) 缺乏语义联想。

**RRF (Reciprocal Rank Fusion) 融合公式**：
$$RRF\\_Score(d \\in D) = \\sum_{m \\in M} \\frac{1}{k + r_m(d)}$$
其中 $r_m(d)$ 为文档 $d$ 在检索系统 $m$ 中的排名，常数 $k=60$。

---

### 2. 两阶段重排 (Two-Stage Reranking)
1. **粗检 (First Stage)**：利用 Vector DB + BM25 快速取出 Top 50 ~ Top 100 候选 Chunk。
2. **精排 (Second Stage)**：使用 Cross-Encoder 模型 (如 BGE-Reranker-Large) 计算 Query-Chunk 交互注意力分，截取 Top 5 喂给 LLM。

---

### 3. Parent-Child 嵌套切片策略
- **Child Chunk (小切片, 128 tokens)**：专门用于向量嵌入与高精匹配。
- **Parent Chunk (大地块, 512 tokens)**：匹配到 Child 时，自动调取包含上下文的 Parent 块传递给 LLM 提示词。
      `,
      tags: ['RAG 防幻觉', 'Hybrid Search', 'Reranking', 'Vector DB'],
      readTime: '14 min',
      stats: { views: 5600, stars: 680 }
    },
    {
      id: 'node-portfolio-commercial',
      title: '💼 虞兮叹 · AI 标注与商业项目 20+ 交付作品集',
      category: 'personal',
      orbitRadius: 70,
      orbitSpeed: 0.0005,
      size: 3.0,
      color: '#06b6d4',
      emissive: '#0284c7',
      position: { x: 25, y: -25, z: -35 },
      summary: '展示虞兮叹团队承接的全量 20 张 AI 数据标注、质检评测与算法商业交付成果图（1.png ~ 20.png）。',
      content: `
# 💼 虞兮叹 · AI 标注与商业项目 20+ 交付作品集

本专区展示了团队在 AI 标注工程、质量检测、规则设计与模型评测领域的 **20 张商业项目交付成果作品**。

---

### 📸 20+ 商业标注与交付项目作品墙 (点击任意图片全屏放大)

<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap:10px; margin:20px 0;">
  <div onclick="window.UIModule.openLightbox('assets/portfolio/1.png', '商业标注交付作品 01')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/1.png" alt="作品 01" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/2.png', '商业标注交付作品 02')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/2.png" alt="作品 02" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/3.png', '商业标注交付作品 03')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/3.png" alt="作品 03" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/4.png', '商业标注交付作品 04')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/4.png" alt="作品 04" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/5.png', '商业标注交付作品 05')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/5.png" alt="作品 05" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/6.png', '商业标注交付作品 06')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/6.png" alt="作品 06" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/7.png', '商业标注交付作品 07')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/7.png" alt="作品 07" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/8.png', '商业标注交付作品 08')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/8.png" alt="作品 08" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/9.png', '商业标注交付作品 09')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/9.png" alt="作品 09" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/10.png', '商业标注交付作品 10')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/10.png" alt="作品 10" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/11.png', '商业标注交付作品 11')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/11.png" alt="作品 11" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/12.png', '商业标注交付作品 12')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/12.png" alt="作品 12" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/13.png', '商业标注交付作品 13')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/13.png" alt="作品 13" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/14.png', '商业标注交付作品 14')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/14.png" alt="作品 14" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/15.png', '商业标注交付作品 15')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/15.png" alt="作品 15" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/16.png', '商业标注交付作品 16')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/16.png" alt="作品 16" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/17.png', '商业标注交付作品 17')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/17.png" alt="作品 17" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/18.png', '商业标注交付作品 18')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/18.png" alt="作品 18" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/19.png', '商业标注交付作品 19')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/19.png" alt="作品 19" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/portfolio/20.png', '商业标注交付作品 20')" style="cursor:pointer; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15);"><img src="assets/portfolio/20.png" alt="作品 20" style="width:100%; height:100px; object-fit:cover; display:block;" /></div>
</div>
      `,
      tags: ['标注作品集', 'AI 项目交付', '商业案例', '标注质检'],
      readTime: '4 min',
      stats: { views: 7600, stars: 850 }
    },
    {
      id: 'node-gallery',
      title: '📸 虞兮叹 · 骑行摄影与风光纪实',
      category: 'personal',
      orbitRadius: 80,
      orbitSpeed: 0.0004,
      size: 2.8,
      color: '#f43f5e',
      emissive: '#e11d48',
      position: { x: -20, y: -22, z: -28 },
      summary: '展示虞兮叹的骑行纪实视频与个人风光剪影大图。',
      content: `
# 📸 虞兮叹 · 骑行摄影与风光纪实

“向往自由，放荡不羁。骑车去远方，用镜头记录沿途的风与光。”

---

### 🎥 骑行纪实视频 (点击播放)

<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap:12px; margin: 16px 0;">
  <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.12); border-radius:12px; overflow:hidden;">
    <video controls preload="metadata" poster="assets/media/铁骑四人组.png" style="width:100%; height:130px; object-fit:cover; display:block;">
      <source src="assets/media/南奥铁骑.mp4" type="video/mp4">
    </video>
    <div style="padding:6px 10px; font-size:0.78rem; font-weight:600; color:#fff; background:rgba(0,0,0,0.6);">🚴 南奥铁骑</div>
  </div>
  
  <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.12); border-radius:12px; overflow:hidden;">
    <video controls preload="metadata" poster="assets/media/平谭路拍.jpg" style="width:100%; height:130px; object-fit:cover; display:block;">
      <source src="assets/media/走走看看.mp4" type="video/mp4">
    </video>
    <div style="padding:6px 10px; font-size:0.78rem; font-weight:600; color:#fff; background:rgba(0,0,0,0.6);">🌍 走走看看</div>
  </div>
</div>

---

### 📸 个人骑行摄影与风光剪影 (点击放大全屏查看)

<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap:8px; margin:16px 0;">
  <div onclick="window.UIModule.openLightbox('assets/media/avatar.jpg', '虞兮叹 · 形象照')" style="cursor:pointer; border-radius:6px; overflow:hidden;"><img src="assets/media/avatar.jpg" alt="形象照" style="width:100%; height:90px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/media/p1.jpg', '作品摄影 P1')" style="cursor:pointer; border-radius:6px; overflow:hidden;"><img src="assets/media/p1.jpg" alt="P1" style="width:100%; height:90px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/media/p2.jpg', '作品摄影 P2')" style="cursor:pointer; border-radius:6px; overflow:hidden;"><img src="assets/media/p2.jpg" alt="P2" style="width:100%; height:90px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/media/七年路.jpg', '七年路')" style="cursor:pointer; border-radius:6px; overflow:hidden;"><img src="assets/media/七年路.jpg" alt="七年路" style="width:100%; height:90px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/media/过去的梦.jpg', '过去的梦')" style="cursor:pointer; border-radius:6px; overflow:hidden;"><img src="assets/media/过去的梦.jpg" alt="过去的梦" style="width:100%; height:90px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/media/平谭路拍.jpg', '平谭路拍')" style="cursor:pointer; border-radius:6px; overflow:hidden;"><img src="assets/media/平谭路拍.jpg" alt="平谭" style="width:100%; height:90px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/media/向往.jpg', '向往')" style="cursor:pointer; border-radius:6px; overflow:hidden;"><img src="assets/media/向往.jpg" alt="向往" style="width:100%; height:90px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/media/吾爱健康.jpg', '吾爱健康')" style="cursor:pointer; border-radius:6px; overflow:hidden;"><img src="assets/media/吾爱健康.jpg" alt="吾爱健康" style="width:100%; height:90px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/media/平心静气.jpg', '平心静气')" style="cursor:pointer; border-radius:6px; overflow:hidden;"><img src="assets/media/平心静气.jpg" alt="平心静气" style="width:100%; height:90px; object-fit:cover; display:block;" /></div>
  <div onclick="window.UIModule.openLightbox('assets/media/挑战.jpg', '挑战')" style="cursor:pointer; border-radius:6px; overflow:hidden;"><img src="assets/media/挑战.jpg" alt="挑战" style="width:100%; height:90px; object-fit:cover; display:block;" /></div>
</div>
      `,
      tags: ['骑行视频', '摄影大图', '风光记录'],
      readTime: '3 min',
      stats: { views: 8200, stars: 940 }
    }
  ],

  // 连线拓扑图
  links: [
    { source: 'node-bio', target: 'node-trainer-stage1' },
    { source: 'node-trainer-stage1', target: 'node-trainer-stage2' },
    { source: 'node-trainer-stage2', target: 'node-trainer-stage3' },
    { source: 'node-trainer-stage3', target: 'node-trainer-stage4' },
    { source: 'node-bio', target: 'node-agent-multi' },
    { source: 'node-bio', target: 'node-rag-advanced' },
    { source: 'node-bio', target: 'node-gallery' },
    { source: 'node-agent-multi', target: 'node-llm-interview-2026' },
    { source: 'node-rag-advanced', target: 'node-trainer-stage4' }
  ],

  // 每日 AI 行业脉冲 (Daily AI News Stream)
    dailyPulse: [    {
      id: 'pulse-auto-1786927929-1',
      title: "OpenAI 领袖 Sam Altman 宣布新一代 GPT-5 基础设施部署完成",
      category: "OpenAI 突破",
      date: "2026-08-17",
      aiSummary: "1. 新算力集群推理延迟大幅降低 65%\\n2. 引入全模态视觉与长思考链 (Chain-of-Thought) 原生支持\\n3. 全面支持 Agent 级自主任务拆解",
      personalInsight: "意味着 Agent 落地中的推理耗时瓶颈将被突破，非常有利于长流程自动化项目的商业推广。",
      status: "approved",
      relatedPlanetId: "node-agent-multi",
      impactScore: "9.9 / 10"
    },
    {
      id: 'pulse-auto-1786927929-2',
      title: "DeepSeek 发布最新模型微调指南：支持零损失 4-bit 量化对齐",
      category: "模型开源",
      date: "2026-08-17",
      aiSummary: "1. 极大降低开源大模型 SFT 与 DPO 微调门槛\\n2. 单张 RTX 4090 显卡即可运行百亿参数模型训练\\n3. 官方提供全套自动评测 Benchmark",
      personalInsight: "为我们的 AI 训练师体系提供了极佳的低成本实操练习基座。",
      status: "approved",
      relatedPlanetId: "node-trainer-stage2",
      impactScore: "9.6 / 10"
    },
    {
      id: 'pulse-auto-1786841636-1',
      title: "OpenAI 领袖 Sam Altman 宣布新一代 GPT-5 基础设施部署完成",
      category: "OpenAI 突破",
      date: "2026-08-16",
      aiSummary: "1. 新算力集群推理延迟大幅降低 65%\\n2. 引入全模态视觉与长思考链 (Chain-of-Thought) 原生支持\\n3. 全面支持 Agent 级自主任务拆解",
      personalInsight: "意味着 Agent 落地中的推理耗时瓶颈将被突破，非常有利于长流程自动化项目的商业推广。",
      status: "approved",
      relatedPlanetId: "node-agent-multi",
      impactScore: "9.9 / 10"
    },
    {
      id: 'pulse-auto-1786841636-2',
      title: "DeepSeek 发布最新模型微调指南：支持零损失 4-bit 量化对齐",
      category: "模型开源",
      date: "2026-08-16",
      aiSummary: "1. 极大降低开源大模型 SFT 与 DPO 微调门槛\\n2. 单张 RTX 4090 显卡即可运行百亿参数模型训练\\n3. 官方提供全套自动评测 Benchmark",
      personalInsight: "为我们的 AI 训练师体系提供了极佳的低成本实操练习基座。",
      status: "approved",
      relatedPlanetId: "node-trainer-stage2",
      impactScore: "9.6 / 10"
    },
    {
      id: 'pulse-auto-1786755061-1',
      title: "OpenAI 领袖 Sam Altman 宣布新一代 GPT-5 基础设施部署完成",
      category: "OpenAI 突破",
      date: "2026-08-15",
      aiSummary: "1. 新算力集群推理延迟大幅降低 65%\\n2. 引入全模态视觉与长思考链 (Chain-of-Thought) 原生支持\\n3. 全面支持 Agent 级自主任务拆解",
      personalInsight: "意味着 Agent 落地中的推理耗时瓶颈将被突破，非常有利于长流程自动化项目的商业推广。",
      status: "approved",
      relatedPlanetId: "node-agent-multi",
      impactScore: "9.9 / 10"
    },
    {
      id: 'pulse-auto-1786755061-2',
      title: "DeepSeek 发布最新模型微调指南：支持零损失 4-bit 量化对齐",
      category: "模型开源",
      date: "2026-08-15",
      aiSummary: "1. 极大降低开源大模型 SFT 与 DPO 微调门槛\\n2. 单张 RTX 4090 显卡即可运行百亿参数模型训练\\n3. 官方提供全套自动评测 Benchmark",
      personalInsight: "为我们的 AI 训练师体系提供了极佳的低成本实操练习基座。",
      status: "approved",
      relatedPlanetId: "node-trainer-stage2",
      impactScore: "9.6 / 10"
    },
    {
      id: 'pulse-auto-1786670375-1',
      title: "OpenAI 领袖 Sam Altman 宣布新一代 GPT-5 基础设施部署完成",
      category: "OpenAI 突破",
      date: "2026-08-14",
      aiSummary: "1. 新算力集群推理延迟大幅降低 65%\\n2. 引入全模态视觉与长思考链 (Chain-of-Thought) 原生支持\\n3. 全面支持 Agent 级自主任务拆解",
      personalInsight: "意味着 Agent 落地中的推理耗时瓶颈将被突破，非常有利于长流程自动化项目的商业推广。",
      status: "approved",
      relatedPlanetId: "node-agent-multi",
      impactScore: "9.9 / 10"
    },
    {
      id: 'pulse-auto-1786670375-2',
      title: "DeepSeek 发布最新模型微调指南：支持零损失 4-bit 量化对齐",
      category: "模型开源",
      date: "2026-08-14",
      aiSummary: "1. 极大降低开源大模型 SFT 与 DPO 微调门槛\\n2. 单张 RTX 4090 显卡即可运行百亿参数模型训练\\n3. 官方提供全套自动评测 Benchmark",
      personalInsight: "为我们的 AI 训练师体系提供了极佳的低成本实操练习基座。",
      status: "approved",
      relatedPlanetId: "node-trainer-stage2",
      impactScore: "9.6 / 10"
    },
    {
      id: 'pulse-auto-1786584016-1',
      title: "OpenAI 领袖 Sam Altman 宣布新一代 GPT-5 基础设施部署完成",
      category: "OpenAI 突破",
      date: "2026-08-13",
      aiSummary: "1. 新算力集群推理延迟大幅降低 65%\\n2. 引入全模态视觉与长思考链 (Chain-of-Thought) 原生支持\\n3. 全面支持 Agent 级自主任务拆解",
      personalInsight: "意味着 Agent 落地中的推理耗时瓶颈将被突破，非常有利于长流程自动化项目的商业推广。",
      status: "approved",
      relatedPlanetId: "node-agent-multi",
      impactScore: "9.9 / 10"
    },
    {
      id: 'pulse-auto-1786584016-2',
      title: "DeepSeek 发布最新模型微调指南：支持零损失 4-bit 量化对齐",
      category: "模型开源",
      date: "2026-08-13",
      aiSummary: "1. 极大降低开源大模型 SFT 与 DPO 微调门槛\\n2. 单张 RTX 4090 显卡即可运行百亿参数模型训练\\n3. 官方提供全套自动评测 Benchmark",
      personalInsight: "为我们的 AI 训练师体系提供了极佳的低成本实操练习基座。",
      status: "approved",
      relatedPlanetId: "node-trainer-stage2",
      impactScore: "9.6 / 10"
    },
    {
      id: 'pulse-auto-1786497476-1',
      title: "OpenAI 领袖 Sam Altman 宣布新一代 GPT-5 基础设施部署完成",
      category: "OpenAI 突破",
      date: "2026-08-12",
      aiSummary: "1. 新算力集群推理延迟大幅降低 65%\\n2. 引入全模态视觉与长思考链 (Chain-of-Thought) 原生支持\\n3. 全面支持 Agent 级自主任务拆解",
      personalInsight: "意味着 Agent 落地中的推理耗时瓶颈将被突破，非常有利于长流程自动化项目的商业推广。",
      status: "approved",
      relatedPlanetId: "node-agent-multi",
      impactScore: "9.9 / 10"
    },
    {
      id: 'pulse-auto-1786497476-2',
      title: "DeepSeek 发布最新模型微调指南：支持零损失 4-bit 量化对齐",
      category: "模型开源",
      date: "2026-08-12",
      aiSummary: "1. 极大降低开源大模型 SFT 与 DPO 微调门槛\\n2. 单张 RTX 4090 显卡即可运行百亿参数模型训练\\n3. 官方提供全套自动评测 Benchmark",
      personalInsight: "为我们的 AI 训练师体系提供了极佳的低成本实操练习基座。",
      status: "approved",
      relatedPlanetId: "node-trainer-stage2",
      impactScore: "9.6 / 10"
    },
    {
      id: 'pulse-auto-1786410627-1',
      title: "OpenAI 领袖 Sam Altman 宣布新一代 GPT-5 基础设施部署完成",
      category: "OpenAI 突破",
      date: "2026-08-11",
      aiSummary: "1. 新算力集群推理延迟大幅降低 65%\\n2. 引入全模态视觉与长思考链 (Chain-of-Thought) 原生支持\\n3. 全面支持 Agent 级自主任务拆解",
      personalInsight: "意味着 Agent 落地中的推理耗时瓶颈将被突破，非常有利于长流程自动化项目的商业推广。",
      status: "approved",
      relatedPlanetId: "node-agent-multi",
      impactScore: "9.9 / 10"
    },
    {
      id: 'pulse-auto-1786410627-2',
      title: "DeepSeek 发布最新模型微调指南：支持零损失 4-bit 量化对齐",
      category: "模型开源",
      date: "2026-08-11",
      aiSummary: "1. 极大降低开源大模型 SFT 与 DPO 微调门槛\\n2. 单张 RTX 4090 显卡即可运行百亿参数模型训练\\n3. 官方提供全套自动评测 Benchmark",
      personalInsight: "为我们的 AI 训练师体系提供了极佳的低成本实操练习基座。",
      status: "approved",
      relatedPlanetId: "node-trainer-stage2",
      impactScore: "9.6 / 10"
    },
    {
      id: 'pulse-auto-1786324318-1',
      title: "OpenAI 领袖 Sam Altman 宣布新一代 GPT-5 基础设施部署完成",
      category: "OpenAI 突破",
      date: "2026-08-10",
      aiSummary: "1. 新算力集群推理延迟大幅降低 65%\\n2. 引入全模态视觉与长思考链 (Chain-of-Thought) 原生支持\\n3. 全面支持 Agent 级自主任务拆解",
      personalInsight: "意味着 Agent 落地中的推理耗时瓶颈将被突破，非常有利于长流程自动化项目的商业推广。",
      status: "approved",
      relatedPlanetId: "node-agent-multi",
      impactScore: "9.9 / 10"
    },
    {
      id: 'pulse-auto-1786324318-2',
      title: "DeepSeek 发布最新模型微调指南：支持零损失 4-bit 量化对齐",
      category: "模型开源",
      date: "2026-08-10",
      aiSummary: "1. 极大降低开源大模型 SFT 与 DPO 微调门槛\\n2. 单张 RTX 4090 显卡即可运行百亿参数模型训练\\n3. 官方提供全套自动评测 Benchmark",
      personalInsight: "为我们的 AI 训练师体系提供了极佳的低成本实操练习基座。",
      status: "approved",
      relatedPlanetId: "node-trainer-stage2",
      impactScore: "9.6 / 10"
    },
    {
      id: 'pulse-auto-1786264830-1',
      title: "OpenAI 领袖 Sam Altman 宣布新一代 GPT-5 基础设施部署完成",
      category: "OpenAI 突破",
      date: "2026-08-09",
      aiSummary: "1. 新算力集群推理延迟大幅降低 65%\\n2. 引入全模态视觉与长思考链 (Chain-of-Thought) 原生支持\\n3. 全面支持 Agent 级自主任务拆解",
      personalInsight: "意味着 Agent 落地中的推理耗时瓶颈将被突破，非常有利于长流程自动化项目的商业推广。",
      status: "approved",
      relatedPlanetId: "node-agent-multi",
      impactScore: "9.9 / 10"
    },
    {
      id: 'pulse-auto-1786264830-2',
      title: "DeepSeek 发布最新模型微调指南：支持零损失 4-bit 量化对齐",
      category: "模型开源",
      date: "2026-08-09",
      aiSummary: "1. 极大降低开源大模型 SFT 与 DPO 微调门槛\\n2. 单张 RTX 4090 显卡即可运行百亿参数模型训练\\n3. 官方提供全套自动评测 Benchmark",
      personalInsight: "为我们的 AI 训练师体系提供了极佳的低成本实操练习基座。",
      status: "approved",
      relatedPlanetId: "node-trainer-stage2",
      impactScore: "9.6 / 10"
    },
    {
      id: 'pulse-auto-1786075018-1',
      title: "OpenAI 领袖 Sam Altman 宣布新一代 GPT-5 基础设施部署完成",
      category: "OpenAI 突破",
      date: "2026-08-07",
      aiSummary: "1. 新算力集群推理延迟大幅降低 65%\\n2. 引入全模态视觉与长思考链 (Chain-of-Thought) 原生支持\\n3. 全面支持 Agent 级自主任务拆解",
      personalInsight: "意味着 Agent 落地中的推理耗时瓶颈将被突破，非常有利于长流程自动化项目的商业推广。",
      status: "approved",
      relatedPlanetId: "node-agent-multi",
      impactScore: "9.9 / 10"
    },
    {
      id: 'pulse-auto-1786075018-2',
      title: "DeepSeek 发布最新模型微调指南：支持零损失 4-bit 量化对齐",
      category: "模型开源",
      date: "2026-08-07",
      aiSummary: "1. 极大降低开源大模型 SFT 与 DPO 微调门槛\\n2. 单张 RTX 4090 显卡即可运行百亿参数模型训练\\n3. 官方提供全套自动评测 Benchmark",
      personalInsight: "为我们的 AI 训练师体系提供了极佳的低成本实操练习基座。",
      status: "approved",
      relatedPlanetId: "node-trainer-stage2",
      impactScore: "9.6 / 10"
    },

    {
      id: 'pulse-01',
      title: 'OpenAI 突破性 Agent 工具发布：支持全自动化 Web 操作',
      category: 'Agent 前沿',
      date: '2026-08-07',
      aiSummary: '1. 新接口提升多步长流程 Web 自动化成功率 50%\n2. 内置视觉定位与虚拟沙箱环境\n3. 推荐与 Multi-Agent 状态机相结合',
      personalInsight: '意味着 AI 训练师的标注任务正从传统文本分类向“复杂 Step-by-Step 动作 Trajectory”转变。',
      status: 'approved',
      relatedPlanetId: 'node-agent-multi',
      impactScore: '9.8 / 10'
    },
    {
      id: 'pulse-02',
      title: 'DeepSeek 开源新一代 DPO 对齐架构：大幅降低微调对齐显存',
      category: '模型微调',
      date: '2026-08-06',
      aiSummary: '1. 引入全新梯度衰减对齐 Loss\n2. 在代码与数学 Benchmark 表现超越传统 PPO\n3. 全面兼容 HuggingFace TRL 库',
      personalInsight: '为 AI 训练师提供了免训练显式 Reward Model 的高效率偏好对齐手段。',
      status: 'approved',
      relatedPlanetId: 'node-trainer-stage3',
      impactScore: '9.5 / 10'
    }
  ],

  // 个人 AI 咨询分身预置 Prompt
  aiPersona: {
    name: '虞兮叹 AI 咨询分身',
    avatar: '🤖',
    welcomeMessage: '你好！我是虞兮叹的数字 AI 分身。欢迎探讨 AI 训练师体系、RAG 降本防幻觉、Multi-Agent 范式与 1v1 咨询！',
    quickQuestions: [
      '👉 怎么零基础学习 AI 训练师全套体系？',
      '👉 怎么解决企业 RAG 知识库检索不准的问题？',
      '👉 1v1 咨询是怎么收费与安排流程的？'
    ]
  }
};
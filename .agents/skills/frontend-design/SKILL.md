---
name: frontend-design
description: Guidelines and rules for high-end UI design, Anti-AI-Slop aesthetics, OKLCH colors, and modern frontend design systems.
---

# 🎨 Frontend Design & Anti-AI-Slop Aesthetic Skill

This skill enforces high-end visual design standards for web applications, preventing generic AI templates ("AI-Slop") and ensuring production-grade aesthetic quality.

## 核心原则 (Core Principles)

### 1. 🚫 拒绝平庸模板 (Anti-AI-Slop)
- 严禁使用纯原色 (纯红 `#FF0000`、纯蓝 `#0000FF`、纯白背景 `#FFFFFF` 配合纯黑文字)。
- 使用具深度感的暗黑夜空色系 (`#03040a`, `#090d16`) 搭配霓虹渐变 (`#38bdf8`, `#c084fc`, `#fbbf24`)。
- 拒绝粗糙平淡的列表，采用苹果 / Vercel 级别的 **Bento Grid (便当盒网格)** 布局。

### 2. 💎 材质与质感 (Materials & Texture)
- **Glassmorphism (磨砂玻璃)**：`background: rgba(10, 14, 26, 0.72); backdrop-filter: blur(28px); border: 1px solid rgba(255, 255, 255, 0.12);`
- **霓虹边框与发光 (Glow & Outlines)**：给核心卡片与按钮挂载 `box-shadow: 0 0 35px rgba(56, 189, 248, 0.25);`
- **悬浮与交互 (Hover Dynamics)**：卡片 Hover 时向上平移 4px - 6px，伴随边框光晕加强。

### 3. 📐 视觉阶梯与对齐 (Visual Hierarchy)
- **主次分明**：首屏 H1 采用大字号 (2.5rem - 3.5rem) 搭配文字发光渐变。
- **徽章与标签**：所有状态与分类采用圆角 Badge (`border-radius: 9999px`) 搭配小图标与轻度玻璃背景。

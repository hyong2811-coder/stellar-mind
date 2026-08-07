---
name: better-ui-effects
description: Glassmorphism, neon glows, micro-interactions, starburst particle sparks, and smooth CSS cubic-bezier dynamics.
---

# ✨ Better UI Effects & Micro-Interactions Skill

This skill provides guidelines for implementing premium visual effects, glassmorphism, glowing accents, and high-fps micro-interactions.

## 核心特效指引 (Core Effect Rules)

### 1. 🌌 背景极光光晕 (Aurora Orbs)
- 使用 3 个固定位置的极光光晕球：
  ```css
  .aurora-glow {
    position: fixed;
    border-radius: 50%;
    filter: blur(140px);
    pointer-events: none;
    opacity: 0.45;
    animation: auroraPulse 12s ease-in-out infinite alternate;
  }
  ```
- 颜色推荐：极光紫 (`#c084fc`)、天青蓝 (`#38bdf8`)、琥珀金 (`#fbbf24`)。

### 2. ⚡ 微交互与平滑过渡 (Micro-Interactions)
- 所有按钮、卡片、Pills 均采用贝塞尔曲线过渡：
  `transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);`
- 点击 feedback：高光微扩并伴随 Toast 提示。

### 3. 🖼️ 全屏 Lightbox 与图片视界
- 所有静态摄影照片与设计作品均支持点击唤起 `openLightbox(src, title)` 全屏高清视界。
- Lightbox 背景使用 `rgba(3, 4, 10, 0.95)` 搭配 30px `backdrop-filter` 模糊。

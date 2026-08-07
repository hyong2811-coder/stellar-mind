---
name: typography-master
description: Advanced typography hierarchy, Google Fonts pairing, letter-spacing scales, line-height rhythms, and gradient text rendering.
---

# ✍️ Typography & Font Aesthetics Skill

This skill defines font pairing, scale systems, and text rendering rules for production web applications.

## 字体系统 (Font Systems)

### 1. 字体搭配 (Font Pairing)
- **大标题 / Hero / 品牌**: `'Outfit', 'Noto Serif SC', sans-serif;` (兼具现代几何线条与东方人文质感)
- **正文 / 描述 / UI 文本**: `'Inter', -apple-system, sans-serif;` (清晰易读)
- **代码 / 数据 / 标签 / 时间**: `'JetBrains Mono', monospace;` (极客代码质感)

### 2. 字阶与字重 (Font Scale & Weight)
- **Hero 姓名主标题**: 3.5rem (900 Weight, 0.15em letter-spacing)
- **Section 模块标题**: 2.2rem (900 Weight)
- **卡片标题**: 1.2rem (800 Weight)
- **正文行高**: `line-height: 1.7 ~ 1.8;`

### 3. 文字渐变与阴影 (Gradient Text & Shadows)
- 主标题使用剪切渐变：
  ```css
  background: linear-gradient(135deg, #ffffff 0%, #38bdf8 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ```
- 辅以柔和发光阴影：`text-shadow: 0 10px 40px rgba(56, 189, 248, 0.4);`

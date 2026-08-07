---
name: webgl-3d-scene
description: Three.js WebGL 3D scene architecture, starburst particle explosions, constellation link topologies, cinematic FOV fly-through camera lerps, and 60fps performance optimization.
---

# 🛸 WebGL 3D Scene & Constellation Graph Skill

This skill defines performance and rendering standards for Three.js WebGL 3D starfields, dynamic particle topologies, and cinematic camera systems.

## 核心 3D 渲染规则 (Core 3D Rules)

### 1. 🌌 星云微粒与连线拓扑 (Starfield & Constellations)
- **星云微粒**：创建 3,500+ 颗 `THREE.Points` 星芒粒子，色彩随机分发为天青蓝、霓虹紫、金色与纯白。
- **星座引力连线**：节点之间使用 `THREE.Line` 建立拓扑网格，透明度保持在 0.25 ~ 0.45，形成星图感。

### 2. 🚀 电影级星际穿梭 (Cinematic Fly-through & FOV Warp)
- 点击星点或触发穿梭时：
  1. **FOV 曲速张力**：`camera.fov` 从 60° 动态拓展至 74°，模拟星际飞船加速感，到达前平滑恢复至 60°。
  2. **星芒火花爆发 (Starburst Sparks)**：以目标节点坐标为中心，喷射 80+ 颗 `AdditiveBlending` 闪烁火花，带空气阻力衰减。
  3. **镜头 Smoothening**：使用 2 阶段 Cubic Lerp 追踪镜头。

### 3. ⚡ 3D 舞台与性能规范 (Performance)
- 将 3D WebGL Canvas 放置于专用舞台框中 (`.cosmos-stage-wrapper`)，或支持全屏穿梭模式。
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` 避免 4K 屏幕过度渲染导致卡顿。
- 使用 HTML 2D 坐标投影 (`tempV.project(camera)`) 精准贴合 3D 节点浮空标签。

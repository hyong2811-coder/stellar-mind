/**
 * STELLAR MIND - Main Application Entrypoint
 * 初始化 3D Cosmos Engine, UI 模块, Pulse 模块, AI Persona 模块
 */

function startStellarMind() {
  console.log('🌌 Initializing STELLAR MIND 3D System...');

  try {
    // 1. Initialize 3D Three.js Cosmos Engine
    if (window.CosmosEngine) {
      window.CosmosEngine.init('cosmos-canvas-container');
    }

    // 2. Initialize UI Module
    if (window.UIModule) {
      window.UIModule.init();
    }

    // 3. Initialize Industry Pulse Module
    if (window.PulseModule) {
      window.PulseModule.init();
    }

    // 4. Initialize AI Persona Module
    if (window.AIConsultantModule) {
      window.AIConsultantModule.init();
    }

    console.log('🚀 STELLAR MIND Engine Ready!');
  } catch (err) {
    console.error('❌ Initialization error:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startStellarMind);
} else {
  startStellarMind();
}

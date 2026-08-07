/**
 * STELLAR MIND - 3D Cosmos Engine (Three.js)
 * 渲染 3D 星云、旋转星球节点、引力连线、镜头平滑穿梭与 Raycast 交互
 */

window.CosmosEngine = (function() {
  let scene, camera, renderer, controls;
  let planetsGroup, linksGroup, starfield;
  let planetMeshes = [];
  let linkLines = [];
  let labelElements = [];

  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
  let hoveredNode = null;
  let selectedNode = null;

  // Camera Target Interpolation for Smooth Fly-to
  let targetCamPos = null;
  let targetLookAt = null;
  let isFlying = false;

  const defaultCamPos = new THREE.Vector3(0, 25, 75);
  const defaultLookAt = new THREE.Vector3(0, 0, 0);

  function init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.clientWidth || window.innerWidth || 1280;
    const height = container.clientHeight || window.innerHeight || 720;

    // 1. Scene Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040508, 0.008);

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.copy(defaultCamPos);
    camera.lookAt(defaultLookAt);

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 200;
    controls.minDistance = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLightCenter = new THREE.PointLight(0x38bdf8, 4, 120);
    pointLightCenter.position.set(0, 0, 0);
    scene.add(pointLightCenter);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 3, 140);
    pointLightPurple.position.set(30, 20, -20);
    scene.add(pointLightPurple);

    // 6. Build Cosmos Components
    createStarfield();
    buildConstellation();

    // 7. Event Listeners (Global window fallback to ensure clicks register)
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', onClick);

    // Force first resize calculation
    onWindowResize();

    // 8. Start Render Loop
    animate();
  }

  // Create Ambient 3D Starfield Particles
  function createStarfield() {
    const starCount = 3500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 80 + Math.random() * 250;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Cyberpunk Color Palette Tint (Cyan / Neon Purple / Golden / Pure White)
      const colorChoice = Math.random();
      if (colorChoice > 0.65) {
        colors[i * 3] = 0.22; colors[i * 3 + 1] = 0.74; colors[i * 3 + 2] = 0.97; // Cyan
      } else if (colorChoice > 0.35) {
        colors[i * 3] = 0.75; colors[i * 3 + 1] = 0.52; colors[i * 3 + 2] = 0.98; // Purple
      } else if (colorChoice > 0.15) {
        colors[i * 3] = 0.98; colors[i * 3 + 1] = 0.75; colors[i * 3 + 2] = 0.14; // Gold
      } else {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 1.0;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    starfield = new THREE.Points(geometry, material);
    scene.add(starfield);
  }

  // Build Planets and Connecting Constellation Lines
  function buildConstellation() {
    planetsGroup = new THREE.Group();
    linksGroup = new THREE.Group();
    scene.add(planetsGroup);
    scene.add(linksGroup);

    const nodesData = window.STELLAR_DATA.nodes;

    // Create Sparkling Point Star Meshes (星星点点节点)
    nodesData.forEach(data => {
      // Small glowing point star core
      const starRadius = data.size * 0.45;
      const sphereGeo = new THREE.SphereGeometry(starRadius, 16, 16);
      
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.color),
        transparent: true,
        opacity: 0.95
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(data.position.x, data.position.y, data.position.z);
      mesh.userData = data;

      // Outer Glowing Star Aura Halo (星芒星晕)
      const haloGeo = new THREE.RingGeometry(starRadius * 1.2, starRadius * 2.2, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      mesh.add(haloMesh);

      // Central Star Gold Pulse Flare (node-bio)
      if (data.id === 'node-bio') {
        const flareGeo = new THREE.RingGeometry(starRadius * 2.0, starRadius * 3.5, 24);
        const flareMat = new THREE.MeshBasicMaterial({
          color: 0xfbbf24,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.35
        });
        const flareMesh = new THREE.Mesh(flareGeo, flareMat);
        flareMesh.rotation.x = Math.PI / 4;
        mesh.add(flareMesh);
      }

      planetsGroup.add(mesh);
      planetMeshes.push(mesh);

      // Create 3D HTML Label element
      createLabelForNode(mesh);
    });

    // Create Connecting Constellation Lines
    rebuildLinks();
  }

  function rebuildLinks() {
    // Clear existing
    while(linksGroup.children.length > 0){ 
      linksGroup.remove(linksGroup.children[0]); 
    }

    const linksData = window.STELLAR_DATA.links;
    linksData.forEach(link => {
      const sourceMesh = planetMeshes.find(m => m.userData.id === link.source);
      const targetMesh = planetMeshes.find(m => m.userData.id === link.target);

      if (sourceMesh && targetMesh) {
        const points = [sourceMesh.position, targetMesh.position];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.45,
          linewidth: 1.5
        });
        const line = new THREE.Line(lineGeo, lineMat);
        linksGroup.add(line);
      }
    });
  }

  // Create floating HTML Labels attached to 3D Planets
  function createLabelForNode(mesh) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'planet-label interactive';
    labelDiv.innerHTML = `
      <div class="planet-label-badge" style="border-color: ${mesh.userData.color}">
        <span class="planet-dot" style="background: ${mesh.userData.color}"></span>
        ${mesh.userData.title}
      </div>
    `;
    labelDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      flyToPlanet(mesh);
    });
    const container = document.getElementById('cosmos-canvas-container');
    if (container) {
      container.appendChild(labelDiv);
    } else {
      document.body.appendChild(labelDiv);
    }
    labelElements.push({ element: labelDiv, mesh: mesh });
  }

  // Update HTML Labels 2D Screen Positions
  function updateLabels() {
    const tempV = new THREE.Vector3();
    const container = document.getElementById('cosmos-canvas-container');
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;

    labelElements.forEach(item => {
      item.mesh.getWorldPosition(tempV);
      tempV.project(camera);

      // Check if behind camera
      if (tempV.z > 1) {
        item.element.style.display = 'none';
        return;
      }

      const x = (tempV.x *  .5 + .5) * width;
      const y = (tempV.y * -.5 + .5) * height;

      item.element.style.display = 'block';
      item.element.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
    });
  }

  // Pointer Move (Raycast Hover)
  function onPointerMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planetMeshes);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      if (hoveredNode !== hitMesh) {
        if (hoveredNode) resetMeshHighlight(hoveredNode);
        hoveredNode = hitMesh;
        highlightMesh(hoveredNode);
        document.body.style.cursor = 'pointer';
      }
    } else {
      if (hoveredNode) {
        resetMeshHighlight(hoveredNode);
        hoveredNode = null;
        document.body.style.cursor = 'default';
      }
    }
  }

  function highlightMesh(mesh) {
    mesh.scale.set(1.25, 1.25, 1.25);
    mesh.material.emissiveIntensity = 1.0;
  }

  function resetMeshHighlight(mesh) {
    if (mesh !== selectedNode) {
      mesh.scale.set(1, 1, 1);
      mesh.material.emissiveIntensity = 0.6;
    }
  }

  // Pointer Click
  function onClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planetMeshes);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object;
      flyToPlanet(clickedMesh);
    }
  }

  let burstGroup = new THREE.Group();

  // Create Starburst Explosion Sparks when clicking a star node
  function triggerStarburst(position, colorHex = '#38bdf8') {
    if (!scene) return;
    
    // Clear old bursts
    while (burstGroup.children.length > 0) {
      burstGroup.remove(burstGroup.children[0]);
    }
    if (!scene.children.includes(burstGroup)) {
      scene.add(burstGroup);
    }

    const sparkCount = 80;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkCount * 3);
    const velocities = [];

    for (let i = 0; i < sparkCount; i++) {
      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;

      const pSpeed = 0.8 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      velocities.push(new THREE.Vector3(
        pSpeed * Math.sin(phi) * Math.cos(theta),
        pSpeed * Math.sin(phi) * Math.sin(theta),
        pSpeed * Math.cos(phi)
      ));
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 1.6,
      color: new THREE.Color(colorHex),
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending
    });

    const sparkSystem = new THREE.Points(geometry, material);
    sparkSystem.userData = { velocities: velocities, age: 0, maxAge: 40 };
    burstGroup.add(sparkSystem);
  }

  // Update Starburst Sparks animation
  function updateStarbursts() {
    burstGroup.children.forEach(sparks => {
      const positions = sparks.geometry.attributes.position.array;
      const vels = sparks.userData.velocities;
      sparks.userData.age += 1;

      for (let i = 0; i < vels.length; i++) {
        positions[i * 3] += vels[i].x;
        positions[i * 3 + 1] += vels[i].y;
        positions[i * 3 + 2] += vels[i].z;
        vels[i].multiplyScalar(0.96); // Drag resistance
      }
      sparks.geometry.attributes.position.needsUpdate = true;
      sparks.material.opacity = 1 - (sparks.userData.age / sparks.userData.maxAge);
    });
  }

  // Cinematic Camera Fly-To Hyper-Drive Animation
  function flyToPlanet(mesh) {
    selectedNode = mesh;
    controls.autoRotate = false; // Pause background auto rotate

    const nodePos = mesh.position.clone();
    
    // Trigger Starburst Sparks Explosion
    triggerStarburst(nodePos, mesh.userData.color || '#38bdf8');

    // Offset camera slightly back and up from planet for cinematic Framing
    targetCamPos = new THREE.Vector3(
      nodePos.x + (nodePos.x > 0 ? 12 : -12),
      nodePos.y + 6,
      nodePos.z + 18
    );
    targetLookAt = nodePos.clone();
    isFlying = true;

    // Toast Notification for Cinematic Flight
    if (window.UIModule && window.UIModule.showToast) {
      window.UIModule.showToast(`🚀 电影级星际航行：正在穿梭至 [${mesh.userData.title}]...`);
    }

    // Trigger UI Modal
    if (window.UIModule) {
      window.UIModule.openPlanetModal(mesh.userData);
    }
  }

  function resetCamera() {
    targetCamPos = defaultCamPos.clone();
    targetLookAt = defaultLookAt.clone();
    isFlying = true;
    controls.autoRotate = true;
    if (selectedNode) {
      resetMeshHighlight(selectedNode);
      selectedNode = null;
    }
    if (window.UIModule) {
      window.UIModule.closePlanetModal();
      window.UIModule.showToast('🌌 已重置 3D 星空主视角');
    }
  }

  // Filter Planets by Category or Search Query
  function filterNodes(categoryId, searchQuery = '') {
    const query = searchQuery.toLowerCase().trim();

    planetMeshes.forEach(mesh => {
      const data = mesh.userData;
      const matchCat = categoryId === 'all' || data.category === categoryId;
      const matchSearch = !query || 
        data.title.toLowerCase().includes(query) || 
        data.summary.toLowerCase().includes(query) ||
        data.tags.some(t => t.toLowerCase().includes(query));

      const isVisible = matchCat && matchSearch;
      
      const labelObj = labelElements.find(l => l.mesh === mesh);

      if (isVisible) {
        mesh.visible = true;
        mesh.material.opacity = 1.0;
        if (labelObj) labelObj.element.style.opacity = '1';
      } else {
        mesh.visible = false;
        if (labelObj) labelObj.element.style.opacity = '0.15';
      }
    });
  }

  // Render Loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate Starfield Background slowly
    if (starfield) starfield.rotation.y += 0.0003;

    // Orbit Rotation for Planets & Halo Rings
    planetMeshes.forEach(mesh => {
      mesh.rotation.y += 0.008;
    });

    // Update Starburst Sparks
    updateStarbursts();

    // Cinematic Hyper-Drive Camera Lerp with Dynamic FOV Warp Effect
    if (isFlying && targetCamPos && targetLookAt) {
      camera.position.lerp(targetCamPos, 0.08);
      controls.target.lerp(targetLookAt, 0.08);

      const dist = camera.position.distanceTo(targetCamPos);
      
      // Dynamic FOV Warp Effect during flight
      if (dist > 10) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, 74, 0.1);
      } else {
        camera.fov = THREE.MathUtils.lerp(camera.fov, 60, 0.1);
      }
      camera.updateProjectionMatrix();

      if (dist < 0.3) {
        isFlying = false;
        camera.fov = 60;
        camera.updateProjectionMatrix();
      }
    }

    controls.update();
    updateLabels();
    renderer.render(scene, camera);
  }

  function flyToPlanetById(nodeId) {
    const targetMesh = planetMeshes.find(m => m.userData.id === nodeId);
    if (targetMesh) {
      flyToPlanet(targetMesh);
    }
  }

  function onWindowResize() {
    if (!renderer || !camera) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  return {
    init,
    resetCamera,
    flyToPlanet,
    flyToPlanetById,
    filterNodes,
    getPlanetMeshes: () => planetMeshes
  };
})();

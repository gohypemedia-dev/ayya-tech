import * as THREE from "three";

export interface WarpFieldOptions {
  count: number;
  speed: number;
  starSize: number;
  hue: number;
  saturation: number;
  brightness: number;
  fov: number;
  color: string;
  depth: number;
  interactive: boolean;
}

export const WARP_FIELD_DEFAULTS: WarpFieldOptions = {
  count: 180,
  speed: 0.75,
  starSize: 2.8,
  hue: 0,
  saturation: 1.2,
  brightness: 1.1,
  fov: 60,
  color: "#10b981",
  depth: 900,
  interactive: true,
};

export interface WarpFieldRenderer {
  render: () => void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
}

// Generate textures for 3D Keycaps with tech symbols (e.g., 'A', '7', ']', '{', 'x', '6', '9', '+', 'C', '</>', 'AI', '0')
function createKeycapTextures(): THREE.CanvasTexture[] {
  const symbols = ["A", "7", "]", "{", "x", "6", "9", "+", "C", "</>", "AI", "0", "1", "TS", "K8s"];
  const textures: THREE.CanvasTexture[] = [];

  symbols.forEach((symbol) => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Dark emerald keycap top face
      ctx.fillStyle = "#155e4b";
      ctx.fillRect(0, 0, 128, 128);

      // Inset bevel border
      ctx.strokeStyle = "rgba(110, 231, 183, 0.4)";
      ctx.lineWidth = 4;
      ctx.strokeRect(8, 8, 112, 112);

      // Symbol text
      ctx.fillStyle = "#a7f3d0";
      ctx.font = "bold 52px monospace, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(symbol, 64, 64);
    }

    const texture = new THREE.CanvasTexture(canvas);
    textures.push(texture);
  });

  return textures;
}

export function createWarpFieldRenderer(
  canvas: HTMLCanvasElement,
  getOptions: () => WarpFieldOptions
): WarpFieldRenderer {
  const options = getOptions();

  // --- 1. Scene & Camera Setup ---
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#030706"); // Deep black-emerald space

  const camera = new THREE.PerspectiveCamera(
    options.fov,
    canvas.clientWidth / (canvas.clientHeight || 1),
    0.1,
    options.depth + 300
  );
  camera.position.z = 0;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: false,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight || 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- 2. Lighting ---
  const ambientLight = new THREE.AmbientLight(0x10b981, 1.2);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xa7f3d0, 1.8);
  dirLight.position.set(200, 300, 100);
  scene.add(dirLight);

  // --- 3. Create 3D Flying Keycaps ---
  const keycapCount = options.count;
  const keycapGroup = new THREE.Group();
  scene.add(keycapGroup);

  const keycapTextures = createKeycapTextures();
  const baseBoxGeo = new THREE.BoxGeometry(18, 18, 14);

  // Array storing keycap transform data & velocity
  const keycapsData: {
    mesh: THREE.Mesh;
    speed: number;
    rotSpeedX: number;
    rotSpeedY: number;
    rotSpeedZ: number;
    radius: number;
    angle: number;
  }[] = [];

  // Keycap side material (dark emerald green)
  const sideMaterial = new THREE.MeshStandardMaterial({
    color: 0x0f382c,
    roughness: 0.3,
    metalness: 0.2,
  });

  for (let i = 0; i < keycapCount; i++) {
    const texIndex = Math.floor(Math.random() * keycapTextures.length);
    const topMaterial = new THREE.MeshStandardMaterial({
      map: keycapTextures[texIndex],
      roughness: 0.2,
      metalness: 0.1,
    });

    // Box materials array: [right, left, top, bottom, front, back]
    const materials = [
      sideMaterial,
      sideMaterial,
      topMaterial, // Top face has symbol
      sideMaterial,
      sideMaterial,
      sideMaterial,
    ];

    const mesh = new THREE.Mesh(baseBoxGeo, materials);

    const radius = 60 + Math.random() * 480;
    const angle = Math.random() * Math.PI * 2;
    const z = -Math.random() * options.depth;

    mesh.position.x = Math.cos(angle) * radius;
    mesh.position.y = Math.sin(angle) * radius;
    mesh.position.z = z;

    mesh.rotation.x = Math.random() * Math.PI * 2;
    mesh.rotation.y = Math.random() * Math.PI * 2;
    mesh.rotation.z = Math.random() * Math.PI * 2;

    const scale = 0.6 + Math.random() * 0.9;
    mesh.scale.set(scale, scale, scale);

    keycapGroup.add(mesh);

    keycapsData.push({
      mesh,
      speed: 0.8 + Math.random() * 1.5,
      rotSpeedX: (Math.random() - 0.5) * 0.45,
      rotSpeedY: (Math.random() - 0.5) * 0.45,
      rotSpeedZ: (Math.random() - 0.5) * 0.45,
      radius,
      angle,
    });
  }

  // --- 4. Create Radial Warp Speed Streaks (Speed Lines) ---
  const lineCount = 300;
  const linePositions = new Float32Array(lineCount * 6); // 2 vertices per line (start & end)
  const lineVelocities = new Float32Array(lineCount);

  for (let i = 0; i < lineCount; i++) {
    const radius = 40 + Math.random() * 500;
    const angle = Math.random() * Math.PI * 2;
    const z = -Math.random() * options.depth;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    // Start point
    linePositions[i * 6] = x;
    linePositions[i * 6 + 1] = y;
    linePositions[i * 6 + 2] = z;

    // End streak point (elongated along Z)
    linePositions[i * 6 + 3] = x;
    linePositions[i * 6 + 4] = y;
    linePositions[i * 6 + 5] = z - 40;

    lineVelocities[i] = 1.0 + Math.random() * 2.0;
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x10b981,
    transparent: true,
    opacity: 0.6,
    linewidth: 1.5,
  });

  const speedLines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(speedLines);

  // --- 5. Glowing Emerald Ambient Orbs ---
  const orbCount = 40;
  const orbPositions = new Float32Array(orbCount * 3);
  for (let i = 0; i < orbCount; i++) {
    const radius = 20 + Math.random() * 450;
    const angle = Math.random() * Math.PI * 2;
    orbPositions[i * 3] = Math.cos(angle) * radius;
    orbPositions[i * 3 + 1] = Math.sin(angle) * radius;
    orbPositions[i * 3 + 2] = -Math.random() * options.depth;
  }

  const orbGeo = new THREE.BufferGeometry();
  orbGeo.setAttribute("position", new THREE.BufferAttribute(orbPositions, 3));

  const orbCanvas = document.createElement("canvas");
  orbCanvas.width = 64;
  orbCanvas.height = 64;
  const oCtx = orbCanvas.getContext("2d");
  if (oCtx) {
    const grad = oCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(52, 211, 153, 1)");
    grad.addColorStop(0.4, "rgba(16, 185, 129, 0.6)");
    grad.addColorStop(1, "rgba(5, 150, 105, 0)");
    oCtx.fillStyle = grad;
    oCtx.beginPath();
    oCtx.arc(32, 32, 32, 0, Math.PI * 2);
    oCtx.fill();
  }
  const orbTexture = new THREE.CanvasTexture(orbCanvas);

  const orbMaterial = new THREE.PointsMaterial({
    size: 24,
    map: orbTexture,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const orbPoints = new THREE.Points(orbGeo, orbMaterial);
  scene.add(orbPoints);

  // --- 6. Interactive Cursor Tracking ---
  let targetCamX = 0;
  let targetCamY = 0;

  const onPointerMove = (e: MouseEvent) => {
    if (!options.interactive) return;
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;

    targetCamX = normX * 80;
    targetCamY = normY * 50;
  };

  window.addEventListener("mousemove", onPointerMove);

  // --- 7. Animation Loop ---
  let clock = new THREE.Clock();

  const render = () => {
    const delta = clock.getDelta();
    const opts = getOptions();

    // Damped camera movement
    camera.position.x += (targetCamX - camera.position.x) * 0.06;
    camera.position.y += (targetCamY - camera.position.y) * 0.06;
    camera.lookAt(0, 0, -opts.depth);

    // 1. Update Keycaps Motion & Rotation
    for (let i = 0; i < keycapsData.length; i++) {
      const data = keycapsData[i];
      const mesh = data.mesh;

      mesh.position.z += opts.speed * data.speed * 45 * delta;
      mesh.rotation.x += data.rotSpeedX * delta;
      mesh.rotation.y += data.rotSpeedY * delta;
      mesh.rotation.z += data.rotSpeedZ * delta;

      // Reset past camera
      if (mesh.position.z > 60) {
        mesh.position.z = -opts.depth;
        const radius = 60 + Math.random() * 480;
        const angle = Math.random() * Math.PI * 2;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.y = Math.sin(angle) * radius;
      }
    }

    // 2. Update Speed Lines Motion
    const linePos = lineGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < lineCount; i++) {
      const speed = opts.speed * lineVelocities[i] * 55 * delta;
      linePos[i * 6 + 2] += speed;
      linePos[i * 6 + 5] += speed;

      if (linePos[i * 6 + 2] > 60) {
        const radius = 40 + Math.random() * 500;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        linePos[i * 6] = x;
        linePos[i * 6 + 1] = y;
        linePos[i * 6 + 2] = -opts.depth;

        linePos[i * 6 + 3] = x;
        linePos[i * 6 + 4] = y;
        linePos[i * 6 + 5] = -opts.depth - 40;
      }
    }
    lineGeometry.attributes.position.needsUpdate = true;

    // 3. Update Ambient Glow Orbs Motion
    const orbPos = orbGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < orbCount; i++) {
      orbPos[i * 3 + 2] += opts.speed * 30 * delta;
      if (orbPos[i * 3 + 2] > 60) {
        orbPos[i * 3 + 2] = -opts.depth;
      }
    }
    orbGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  };

  const resize = (width: number, height: number) => {
    if (!renderer || !camera) return;
    camera.aspect = width / (height || 1);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const dispose = () => {
    window.removeEventListener("mousemove", onPointerMove);
    baseBoxGeo.dispose();
    sideMaterial.dispose();
    keycapTextures.forEach((t) => t.dispose());
    lineGeometry.dispose();
    lineMaterial.dispose();
    orbGeo.dispose();
    orbMaterial.dispose();
    orbTexture.dispose();
    renderer.dispose();
  };

  return {
    render,
    resize,
    dispose,
  };
}

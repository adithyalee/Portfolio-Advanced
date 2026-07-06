# 🚀 Interactive 3D WebGL Portfolio (Bruno Simon Class)

An immersive, driveable 3D world built with pure code. Features zero build steps and zero static asset files—all models, textures, physics environments, and sound effects are generated programmatically at runtime.

## 🕹 Interactive Features
- **Driveable Hover-Ship**: Pilot the ship using WASD or arrows (touch joystick on mobile) across a procedural, infinite neon plane.
- **Interactive Physics Engine**: Powered by `cannon-es`. Smash the "ADITHYA" block structure, navigate jump ramps, and knock down the skills cube pyramid.
- **Dynamic Teleportation**: Walk or drive into specific sectors to open context panels displaying Experience, Projects, and Education.

## 🛠 Tech Stack & Engine Mechanics
- **3D Graphics Engine**: Three.js (via CDN import maps)
- **Physics Engine**: cannon-es
- **Audio Synthesizer**: WebAudio API (synthesizes ship hums and collision thumps using oscillators dynamically—no static audio assets)
- **Shaders (GLSL)**: Custom fragment shaders for a reactive grid floor, UnrealBloom neon glow, chromatic aberration, vignette, and grain post-processing.
- **Adaptive Performance**: Sample-driven FPS throttling that dynamically adjusts resolution scaling and bloom settings to sustain a solid 60 FPS on low-power mobile devices.

## 🎮 Controls
- **Drive**: `W` / `A` / `S` / `D` or Arrow Keys
- **Boost**: `Shift`
- **Reset Vehicle**: `R`
- **Navigation Panel**: Click buttons to instantly teleport to sectors.

## 📥 Run Locally
Simply open `index.html` directly in the browser, or run a simple local web server:
```bash
npx serve .
```

## 🚀 Deployment
Deploy instantly to Vercel:
```bash
npx vercel --prod
```

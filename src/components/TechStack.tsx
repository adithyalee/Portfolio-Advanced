import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import "./styles/TechStack.css";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const SKILLS: { name: string; icon: string }[] = [
  { name: "TypeScript", icon: "/images/typescript.webp" },
  { name: "JavaScript", icon: `${CDN}/javascript/javascript-original.svg` },
  { name: "Python", icon: "/images/python.webp" },
  { name: "Java", icon: "/images/java.webp" },
  { name: "React", icon: `${CDN}/react/react-original.svg` },
  { name: "Next.js", icon: "/images/next2.webp" },
  { name: "Node.js", icon: "/images/node2.webp" },
  { name: "Tailwind", icon: `${CDN}/tailwindcss/tailwindcss-original.svg` },
  { name: "PostgreSQL", icon: "/images/postgresql.webp" },
  { name: "MongoDB", icon: `${CDN}/mongodb/mongodb-original.svg` },
  { name: "Docker", icon: "/images/docker.webp" },
  { name: "Jenkins", icon: "/images/jenkins.webp" },
  { name: "Git", icon: `${CDN}/git/git-original.svg` },
  { name: "GitHub", icon: `${CDN}/github/github-original.svg` },
  { name: "Express", icon: `${CDN}/express/express-original.svg` },
  { name: "NestJS", icon: `${CDN}/nestjs/nestjs-original.svg` },
  { name: "Angular", icon: `${CDN}/angularjs/angularjs-original.svg` },
  { name: "HTML5", icon: `${CDN}/html5/html5-original.svg` },
  { name: "CSS3", icon: `${CDN}/css3/css3-original.svg` },
  { name: "AWS", icon: `${CDN}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  { name: "Azure", icon: `${CDN}/azure/azure-original.svg` },
];

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const fallbackMaterial = new THREE.MeshPhysicalMaterial({
  color: "#ffffff",
  metalness: 0.1,
  roughness: 0.9,
});

function createTextureWithLogo(
  name: string,
  iconUrl: string,
  onDone: (tex: THREE.CanvasTexture) => void
) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const draw = (img: HTMLImageElement | null) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    const logoSize = 100;
    const logoY = 180;
    if (img && img.complete && img.naturalWidth) {
      ctx.drawImage(img, (size - logoSize) / 2, logoY, logoSize, logoSize);
    }

    ctx.fillStyle = "#1a1f2e";
    ctx.font = "bold 36px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, size / 2, 320);
  };

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    draw(img);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    onDone(tex);
  };
  img.onerror = () => {
    draw(null);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    onDone(tex);
  };
  img.src = iconUrl;
}

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3(), isActive }: { vec?: THREE.Vector3; isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null);
  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });
  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const spheres = [...Array(SKILLS.length)].map((_, i) => ({
  scale: [0.7, 1, 0.8, 1, 1][i % 5],
}));

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [materials, setMaterials] = useState<THREE.MeshPhysicalMaterial[]>([]);

  useEffect(() => {
    const mats: THREE.MeshPhysicalMaterial[] = [];
    let done = 0;

    SKILLS.forEach(({ name, icon }) => {
      createTextureWithLogo(name, icon, (tex) => {
        mats.push(
          new THREE.MeshPhysicalMaterial({
            map: tex,
            color: "#ffffff",
            metalness: 0.1,
            roughness: 0.9,
          })
        );
        done++;
        if (done === SKILLS.length) setMaterials([...mats]);
      });
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const work = document.getElementById("work");
      if (!work) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = work.getBoundingClientRect().top + scrollY;
      setIsActive(scrollY > threshold - 200);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      (elem as HTMLAnchorElement).addEventListener("click", () => {
        const id = setInterval(handleScroll, 10);
        setTimeout(() => clearInterval(id), 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allMaterials =
    materials.length > 0 ? materials : Array(SKILLS.length).fill(fallbackMaterial);

  return (
    <div className="techstack">
      <h2>My Techstack</h2>
      <Canvas
        shadows
        gl={{ alpha: false, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.5;
          state.gl.setClearColor(0x0a0e17);
        }}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={allMaterials[i] || fallbackMaterial}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;

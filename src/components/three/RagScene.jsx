import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// A 3D picture of how LearnMate works:
// document pages fly into a knowledge core (ingestion), the core is wrapped
// in a cloud of embedding vectors, and retrieval beams pulse out to the
// vectors that best match a question.

const VIOLET = "#a78bfa";
const AMBER = "#f5c451";
const CORAL = "#f97366";

// Seeded random so the cloud looks the same on every render
const rng = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const EmbeddingCloud = ({ count = 700 }) => {
  const ref = useRef();
  const { positions, colors } = useMemo(() => {
    const rand = rng(42);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color(VIOLET), new THREE.Color(AMBER), new THREE.Color("#ffffff")];
    for (let i = 0; i < count; i++) {
      // points on a thick spherical shell
      const r = 1.7 + rand() * 1.1;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[i % 7 === 0 ? 1 : i % 5 === 0 ? 2 : 0];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.06;
      ref.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  );
};

// Retrieval beams: lines from the core to a handful of vectors, pulsing in turn
const RetrievalBeams = ({ count = 7 }) => {
  const group = useRef();
  const beams = useMemo(() => {
    const rand = rng(7);
    return Array.from({ length: count }, (_, i) => {
      const r = 1.9 + rand() * 0.8;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const end = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), end]);
      return { geometry, end, offset: i / count };
    });
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.06;
    group.current.children.forEach((child, i) => {
      const phase = (t * 0.35 + beams[Math.floor(i / 2)].offset) % 1;
      const glow = Math.max(0, Math.sin(phase * Math.PI)) ** 3;
      if (child.material) child.material.opacity = 0.08 + glow * 0.85;
      if (child.isMesh) child.scale.setScalar(0.6 + glow * 1.4);
    });
  });

  return (
    <group ref={group}>
      {beams.map((b, i) => (
        <React.Fragment key={i}>
          <line geometry={b.geometry}>
            <lineBasicMaterial color={CORAL} transparent opacity={0.2} />
          </line>
          <mesh position={b.end}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color={CORAL} transparent opacity={0.6} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
};

// Document pages that drift in from the edge and get absorbed by the core
const DocumentPage = ({ index, total }) => {
  const ref = useRef();
  const start = useMemo(() => {
    const angle = (index / total) * Math.PI * 2;
    return { angle, height: ((index % 3) - 1) * 0.9 };
  }, [index, total]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * 0.18 + index / total;
    const p = t % 1; // 0 -> far away, 1 -> absorbed
    const radius = 4.2 - p * 3.9;
    const angle = start.angle + p * 1.6;
    ref.current.position.set(Math.cos(angle) * radius, start.height * (1 - p), Math.sin(angle) * radius);
    ref.current.rotation.set(p * 2, angle + p * 3, p);
    const s = p < 0.85 ? 1 : 1 - (p - 0.85) / 0.15;
    ref.current.scale.setScalar(Math.max(s, 0.001));
    ref.current.children[0].material.opacity = Math.min(1, p * 4) * 0.9;
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.42, 0.56, 0.015]} />
        <meshStandardMaterial color="#f8f5ec" emissive="#f5c451" emissiveIntensity={0.15} transparent />
      </mesh>
      {[0.16, 0.08, 0, -0.08, -0.16].map((y, i) => (
        <mesh key={i} position={[i === 0 ? -0.04 : 0, y, 0.01]}>
          <planeGeometry args={[i === 0 ? 0.2 : 0.3, 0.025]} />
          <meshBasicMaterial color={i === 0 ? CORAL : "#9ca3af"} />
        </mesh>
      ))}
    </group>
  );
};

const KnowledgeCore = () => {
  const ref = useRef();
  const shell = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.4;
      ref.current.rotation.x = t * 0.2;
      ref.current.scale.setScalar(0.62 + Math.sin(t * 2) * 0.03);
    }
    if (shell.current) {
      shell.current.rotation.y = -t * 0.25;
      shell.current.rotation.z = t * 0.1;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={CORAL} emissive={CORAL} emissiveIntensity={0.9} roughness={0.25} metalness={0.4} flatShading />
      </mesh>
      <mesh ref={shell} scale={1.05}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color={AMBER} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.45, 0.008, 8, 120]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.6, 0]}>
        <torusGeometry args={[1.25, 0.006, 8, 120]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

const PointerTilt = ({ children }) => {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += (state.pointer.x * 0.5 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-state.pointer.y * 0.3 - group.current.rotation.x) * 0.04;
  });
  return <group ref={group}>{children}</group>;
};

const RagScene = ({ active = true }) => {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 6.2], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={2} color={AMBER} />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color={VIOLET} />
      <PointerTilt>
        <KnowledgeCore />
        <EmbeddingCloud />
        <RetrievalBeams />
        {Array.from({ length: 6 }, (_, i) => (
          <DocumentPage key={i} index={i} total={6} />
        ))}
      </PointerTilt>
      <Sparkles count={40} scale={7} size={2} speed={0.3} color={AMBER} opacity={0.6} />
    </Canvas>
  );
};

export default RagScene;

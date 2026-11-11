import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";

// Slow-drifting distorted core - the "signature" 3D object behind the hero text
const DistortedCore = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.3;
      meshRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={2.1} position={[2.2, 0, -1]}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#7c3aed"
          attach="material"
          distort={0.45}
          speed={1.8}
          roughness={0.15}
          metalness={0.6}
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  );
};

// Two thin tilted rings orbiting the core
const OrbitRings = () => {
  const a = useRef();
  const b = useRef();
  useFrame((_, delta) => {
    if (a.current) a.current.rotation.z += delta * 0.15;
    if (b.current) b.current.rotation.z -= delta * 0.1;
  });
  return (
    <>
      <mesh ref={a} position={[2.2, 0, -1]} rotation={[Math.PI / 2.6, 0.3, 0]}>
        <torusGeometry args={[3.0, 0.01, 8, 160]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.35} />
      </mesh>
      <mesh ref={b} position={[2.2, 0, -1]} rotation={[Math.PI / 1.7, -0.5, 0]}>
        <torusGeometry args={[3.5, 0.008, 8, 160]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.25} />
      </mesh>
    </>
  );
};

// Small glossy solids floating around the core for depth
const SHAPES = [
  { pos: [5.2, 2.2, -1.5], geo: "octa", color: "#7c3aed", s: 0.3 },
  { pos: [5.0, -2.2, -0.8], geo: "torus", color: "#a78bfa", s: 0.26 },
  { pos: [-0.2, 3.0, -2.5], geo: "box", color: "#c4b5fd", s: 0.22 },
  { pos: [0.6, -3.1, -2], geo: "tetra", color: "#8b5cf6", s: 0.28 },
  { pos: [-5.6, 3.1, -3], geo: "octa", color: "#ddd6fe", s: 0.2 },
];

const FloatingShape = ({ pos, geo, color, s, i }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * (0.3 + i * 0.05);
      ref.current.rotation.y += delta * (0.2 + i * 0.04);
    }
  });
  return (
    <Float speed={1.2 + i * 0.2} floatIntensity={1.2} rotationIntensity={0.6}>
      <mesh ref={ref} position={pos} scale={s}>
        {geo === "octa" && <octahedronGeometry args={[1, 0]} />}
        {geo === "torus" && <torusGeometry args={[1, 0.38, 16, 40]} />}
        {geo === "box" && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {geo === "tetra" && <tetrahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.5} flatShading />
      </mesh>
    </Float>
  );
};

// Camera/scene drift that follows the pointer very softly, for parallax depth
const PointerRig = ({ children }) => {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const x = state.pointer.x * 0.4;
    const y = state.pointer.y * 0.25;
    group.current.rotation.y += (x - group.current.rotation.y) * 0.03;
    group.current.rotation.x += (-y - group.current.rotation.x) * 0.03;
  });

  return <group ref={group}>{children}</group>;
};

const HeroScene = () => {
  const shapes = useMemo(() => SHAPES, []);
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.9} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[-5, -2, 4]} intensity={0.6} color="#7c3aed" />
        <PointerRig>
          <DistortedCore />
          <OrbitRings />
          {shapes.map((s, i) => (
            <FloatingShape key={i} i={i} {...s} />
          ))}
        </PointerRig>
        <Sparkles count={60} scale={[12, 7, 4]} size={2.5} speed={0.35} color="#7c3aed" opacity={0.5} />
      </Canvas>
    </div>
  );
};

export default HeroScene;

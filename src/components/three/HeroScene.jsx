import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

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
      <mesh ref={meshRef} scale={2.1}>
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
          opacity={0.18}
        />
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
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.9} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#a78bfa" />
        {/* emerald fill light keeps the core in step with the page's palette */}
        <pointLight position={[-5, -2, 4]} intensity={0.6} color="#7c3aed" />
        <PointerRig>
          <DistortedCore />
        </PointerRig>
      </Canvas>
    </div>
  );
};

export default HeroScene;
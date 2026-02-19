
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface OrbProps {
  position: [number, number, number];
  color: string;
  label: string;
  onClick: () => void;
}

const NavOrb: React.FC<OrbProps> = ({ position, color, label, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} onClick={onClick}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={0.3}
            radius={1}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          color="#06b6d4"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2oWUg0M0zlS-pS61-v3u.woff"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

interface GrokNexusProps {
  onNavigate: (id: string) => void;
}

const GrokNexus: React.FC<GrokNexusProps> = ({ onNavigate }) => {
  return (
    <div className="h-full relative overflow-hidden bg-slate-950 rounded-2xl">
      <div className="absolute top-8 left-8 z-10 space-y-2 pointer-events-none">
        <h2 className="text-4xl font-black text-cyan-500 glow-text tracking-tighter">GROK NEXUS</h2>
        <p className="text-cyan-800 text-xs tracking-[0.4em] uppercase">Multi-Agent Orchestration Layer</p>
      </div>

      <div className="absolute bottom-8 left-8 z-10 max-w-md bg-slate-900/60 p-4 border border-cyan-500/20 backdrop-blur-md rounded">
        <div className="text-[10px] text-cyan-500 font-bold mb-2 uppercase tracking-widest">Global Status</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[8px] text-cyan-900 uppercase">Agents Online</div>
            <div className="text-xl font-bold text-cyan-400">1,248</div>
          </div>
          <div>
            <div className="text-[8px] text-cyan-900 uppercase">Mesh Latency</div>
            <div className="text-xl font-bold text-cyan-400">0.04ms</div>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={2} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <NavOrb 
          position={[-3, 2, 0]} 
          color="#06b6d4" 
          label="AI NEXUS" 
          onClick={() => onNavigate('tensorflow-playground')} 
        />
        <NavOrb 
          position={[3, 2, 0]} 
          color="#8b5cf6" 
          label="SOVEREIGN WALLET" 
          onClick={() => onNavigate('wallet-connector')} 
        />
        <NavOrb 
          position={[-3, -2, 0]} 
          color="#ec4899" 
          label="DEV TOOLS" 
          onClick={() => onNavigate('github-api')} 
        />
        <NavOrb 
          position={[3, -2, 0]} 
          color="#10b981" 
          label="AI DIRECTORY" 
          onClick={() => onNavigate('ai-tools-directory')} 
        />

        {/* Central Core */}
        <mesh>
          <icosahedronGeometry args={[1.5, 15]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            wireframe 
            transparent 
            opacity={0.1}
          />
        </mesh>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default GrokNexus;

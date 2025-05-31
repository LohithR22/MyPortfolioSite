
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CubeMeshProps {
  hover: boolean;
  color?: string;
}

function CubeMesh({ hover, color }: CubeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const [rotationSpeed] = useState(() => THREE.MathUtils.randFloat(0.035, 0.045)); // Increased from 0.015-0.025

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * rotationSpeed;
      meshRef.current.rotation.y = time * rotationSpeed * 1.2;
      meshRef.current.rotation.z = time * rotationSpeed * 0.8;
      meshRef.current.scale.setScalar(hover ? 1.3 : 1.1);
    }
    
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * rotationSpeed * 0.8; // Increased from 0.5
      wireframeRef.current.rotation.y = -time * rotationSpeed * 1.0; // Increased from 0.7
      wireframeRef.current.rotation.z = time * rotationSpeed * 0.6; // Increased from 0.3
      wireframeRef.current.scale.setScalar(hover ? 1.35 : 1.15);
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.015; // Increased from 0.005
      particlesRef.current.rotation.x = Math.sin(time * 0.01) * 0.15; // Increased from 0.003 and 0.1
    }
  });

  // Create particles around the cube
  const particleCount = 150;
  const particlePositions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const radius = 3 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return (
    <group>
      {/* Main cube with glass-like material */}
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshPhysicalMaterial
          color={color || "#ff4757"}
          metalness={0.1}
          roughness={0.1}
          transmission={0.9}
          transparent={true}
          opacity={0.8}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#ff4757"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Wireframe cube overlay */}
      <mesh ref={wireframeRef}>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshBasicMaterial
          color="#5dade2"
          wireframe={true}
          transparent={true}
          opacity={0.6}
        />
      </mesh>
      
      {/* Particle system */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.03}
          transparent={true}
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>
      
      {/* Inner rotating core */}
      <mesh>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          color="#3742fa"
          metalness={0.8}
          roughness={0.2}
          emissive="#3742fa"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

interface AnimatedCubeProps {
  className?: string;
}

export const AnimatedCube = ({ className = "" }: AnimatedCubeProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`w-full h-full min-h-[300px] ${className}`}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.8}
          castShadow
        />
        <directionalLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#5dade2"
        />
        <pointLight position={[5, 5, 5]} intensity={0.4} color="#ff4757" />
        <CubeMesh hover={hover} color="#ff4757" />
      </Canvas>
    </div>
  );
};

export default AnimatedCube;

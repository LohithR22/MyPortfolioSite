
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

interface BrainMeshProps {
  mousePosition: { x: number; y: number };
}

function BrainMesh({ mousePosition }: BrainMeshProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  
  const brainRef = useRef<THREE.Group>(null);
  const spheres = useRef<THREE.Mesh[]>([]);
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (brainRef.current) {
      // Much more subtle mouse response
      brainRef.current.rotation.y = mousePosition.x * 0.05;
      brainRef.current.rotation.x = mousePosition.y * 0.03;
      
      // Gentle breathing effect
      const scale = 1 + Math.sin(time * 1.5) * 0.05;
      brainRef.current.scale.setScalar(scale);
    }
    
    // Slower neural connection animation
    spheres.current.forEach((sphere, index) => {
      if (sphere) {
        sphere.rotation.y = time * (0.2 + index * 0.05);
        sphere.rotation.x = time * (0.15 + index * 0.02);
      }
    });
  });

  // Create neural network nodes
  const neuralNodes = [];
  for (let i = 0; i < 12; i++) {
    const radius = 1.0 + Math.random() * 0.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    neuralNodes.push({
      position: [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ],
      scale: 0.06 + Math.random() * 0.08
    });
  }

  return (
    <group ref={brainRef} position={[0, 0, 0]}>
      {/* Main brain core - bright and visible */}
      <mesh>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshPhongMaterial
          color={isDark ? "#60a5fa" : "#e74c3c"}
          shininess={100}
          transparent={false}
          opacity={1}
          emissive={isDark ? "#1e40af" : "#b91c1c"}
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Neural network nodes */}
      {neuralNodes.map((node, index) => (
        <mesh
          key={index}
          position={node.position as [number, number, number]}
          scale={node.scale}
          ref={(ref) => {
            if (ref) spheres.current[index] = ref;
          }}
        >
          <sphereGeometry args={[1, 6, 6]} />
          <meshPhongMaterial
            color={isDark ? "#93c5fd" : "#f87171"}
            emissive={isDark ? "#3b82f6" : "#dc2626"}
            emissiveIntensity={0.6}
            shininess={50}
          />
        </mesh>
      ))}
      
      {/* Connecting particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={60}
            array={new Float32Array(180).map(() => (Math.random() - 0.5) * 2.5)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={isDark ? "#60a5fa" : "#e74c3c"}
          size={0.04}
          transparent={true}
          opacity={0.9}
        />
      </points>
    </group>
  );
}

interface AIBrainProps {
  className?: string;
}

export const AIBrain = ({ className = "" }: AIBrainProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side
    setIsClient(true);
    
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Don't render on server side
  if (!isClient) {
    return (
      <div className={`w-full h-full bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-lg ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative ${className}`} style={{ minHeight: '200px' }}>
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-3, -3, -3]} intensity={0.6} color="#60a5fa" />
        <BrainMesh mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default AIBrain;

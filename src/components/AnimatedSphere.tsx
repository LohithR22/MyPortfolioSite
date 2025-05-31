
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

function DistortedSphere() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      sphereRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
    }
  });

  return (
    <mesh ref={sphereRef} scale={1.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color={isDark ? "#457b9d" : "#e63946"}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

interface AnimatedSphereProps {
  className?: string;
}

export const AnimatedSphere = ({ className = "" }: AnimatedSphereProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.5} position={[10, 10, 5]} />
        <DistortedSphere />
      </Canvas>
    </div>
  );
};

export default AnimatedSphere;

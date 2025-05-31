
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

interface TechOrbitProps {
  interests: string[];
}

function TechOrbit({ interests }: TechOrbitProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  
  const groupRef = useRef<THREE.Group>(null);
  const orbitRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
    }
    
    // Animate individual tech interests
    orbitRefs.current.forEach((mesh, index) => {
      if (mesh) {
        const speed = 0.5 + index * 0.1;
        const radiusX = 3 + index * 0.5;
        const radiusZ = 2 + index * 0.3;
        const height = Math.sin(time * speed + index) * 0.5;
        
        mesh.position.x = Math.cos(time * speed + index * 2) * radiusX;
        mesh.position.z = Math.sin(time * speed + index * 2) * radiusZ;
        mesh.position.y = height;
        
        // Rotate individual elements
        mesh.rotation.x = time * (0.5 + index * 0.1);
        mesh.rotation.y = time * (0.3 + index * 0.05);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {interests.map((interest, index) => (
        <mesh
          key={index}
          ref={(ref) => {
            if (ref) orbitRefs.current[index] = ref;
          }}
        >
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial
            color={isDark ? "#60a5fa" : "#e74c3c"}
            emissive={isDark ? "#1e40af" : "#dc2626"}
            emissiveIntensity={0.3}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      ))}
      
      {/* Orbit paths visualization */}
      {interests.map((_, index) => (
        <mesh key={`orbit-${index}`} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3 + index * 0.5 - 0.02, 3 + index * 0.5 + 0.02, 64]} />
          <meshBasicMaterial
            color={isDark ? "#374151" : "#9ca3af"}
            transparent={true}
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

interface OrbitingTechInterestsProps {
  className?: string;
  interests?: string[];
}

export const OrbitingTechInterests = ({ 
  className = "", 
  interests = ["AI", "React", "3D", "Web", "ML", "UI"] 
}: OrbitingTechInterestsProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#60a5fa" />
        <TechOrbit interests={interests} />
      </Canvas>
    </div>
  );
};

export default OrbitingTechInterests;

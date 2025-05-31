import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

interface CubeMeshProps {
  hover: boolean;
}

function CubeMesh({ hover }: CubeMeshProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const cubeRef = useRef<THREE.Group>(null);
  const imageRef = useRef<THREE.Mesh>(null);

  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("/profile.jpg", (loaded) => setTexture(loaded));
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (cubeRef.current) {
      // Gentle floating animation
      cubeRef.current.position.y = Math.sin(time * 0.8) * 0.2;
      cubeRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      cubeRef.current.rotation.y = time * 0.3;
      cubeRef.current.rotation.z = Math.cos(time * 0.7) * 0.05;

      // Scale on hover
      const targetScale = hover ? 1.1 : 1;
      cubeRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }

    if (imageRef.current) {
      // Counter-rotate the image to keep it facing forward
      imageRef.current.rotation.y = -time * 0.3;
    }
  });

  return (
    <group ref={cubeRef}>
      {/* Glass cube */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial
          color={isDark ? "#1a365d" : "#ffffff"}
          metalness={0.1}
          roughness={0.05}
          transmission={0.9}
          transparent={true}
          opacity={0.3}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
        />
      </mesh>

      {/* Profile image inside */}
      <mesh ref={imageRef} position={[0, 0, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        {texture && (
          <meshStandardMaterial
            map={texture}
            transparent={true}
            opacity={1}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>

      {/* Glowing edges */}
      <mesh>
        <boxGeometry args={[2.1, 2.1, 2.1]} />
        <meshBasicMaterial
          color={isDark ? "#60a5fa" : "#e74c3c"}
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

interface GlassCubeProps {
  className?: string;
}

export const GlassCube = ({ className = "" }: GlassCubeProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`w-full h-full ${className}`}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={1} /> {/* Increased from 0.4 */}
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2} // Increased from 0.8
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#60a5fa" />
        <CubeMesh hover={hover} />
      </Canvas>
    </div>
  );
};

export default GlassCube;

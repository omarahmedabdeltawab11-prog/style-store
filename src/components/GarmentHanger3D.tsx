import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function buildShirtShape() {
  const shape = new THREE.Shape();
  // neckline (crew neck curve)
  shape.moveTo(-0.26, 1.12);
  shape.quadraticCurveTo(0, 0.92, 0.26, 1.12);
  // right shoulder
  shape.quadraticCurveTo(0.42, 1.08, 0.58, 1.0);
  // shoulder to sleeve cap
  shape.quadraticCurveTo(0.9, 0.9, 1.08, 0.66);
  // sleeve cap rounding
  shape.quadraticCurveTo(1.22, 0.46, 1.08, 0.3);
  // sleeve underside back toward the body (armpit)
  shape.quadraticCurveTo(0.92, 0.42, 0.78, 0.22);
  // down the right side to the hem
  shape.quadraticCurveTo(0.72, -0.5, 0.72, -1.05);
  // rounded bottom-right corner
  shape.quadraticCurveTo(0.72, -1.25, 0.52, -1.25);
  // hem across the bottom
  shape.lineTo(-0.52, -1.25);
  // rounded bottom-left corner
  shape.quadraticCurveTo(-0.72, -1.25, -0.72, -1.05);
  // up the left side
  shape.quadraticCurveTo(-0.72, -0.5, -0.78, 0.22);
  // left armpit
  shape.quadraticCurveTo(-0.92, 0.42, -1.08, 0.3);
  // left sleeve cap
  shape.quadraticCurveTo(-1.22, 0.46, -1.08, 0.66);
  // sleeve to shoulder
  shape.quadraticCurveTo(-0.9, 0.9, -0.58, 1.0);
  // shoulder to neckline
  shape.quadraticCurveTo(-0.42, 1.08, -0.26, 1.12);
  shape.closePath();
  return shape;
}

const extrudeSettings: THREE.ExtrudeGeometryOptions = {
  depth: 0.22,
  curveSegments: 16,
  bevelEnabled: true,
  bevelThickness: 0.035,
  bevelSize: 0.035,
  bevelSegments: 3,
};

interface ShirtMeshProps {
  color: string;
  accent: string;
}

function ShirtMesh({ color, accent }: ShirtMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rotY = useRef(0.5);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartRot = useRef(0);

  const geometry = useMemo(() => {
    const shape = buildShirtShape();
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!dragging && groupRef.current) {
      rotY.current += delta * 0.35;
      groupRef.current.rotation.y = rotY.current;
    }
  });

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - dragStartX.current;
      rotY.current = dragStartRot.current + dx * 0.012;
      if (groupRef.current) groupRef.current.rotation.y = rotY.current;
    };
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);

  return (
    <group
      ref={groupRef}
      scale={0.46}
      position={[0, -0.08, 0]}
      onPointerDown={(e) => {
        e.stopPropagation();
        setDragging(true);
        dragStartX.current = e.clientX;
        dragStartRot.current = rotY.current;
      }}
    >
      <mesh geometry={geometry}>
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.98, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.016, 8, 32, Math.PI]} />
        <meshStandardMaterial color={accent} roughness={0.5} />
      </mesh>
    </group>
  );
}

interface GarmentHanger3DProps {
  color: string;
  accent: string;
  className?: string;
}

export default function GarmentHanger3D({ color, accent, className }: GarmentHanger3DProps) {
  return (
    <div className={className} style={{ touchAction: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 3.1], fov: 28 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 4]} intensity={0.9} />
        <directionalLight position={[-2, -1.5, -3]} intensity={0.35} />
        <ShirtMesh color={color} accent={accent} />
      </Canvas>
    </div>
  );
}

import * as THREE from 'three';
import React, { useRef, useState, useMemo, createRef, Suspense, Component } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, useSphericalJoint, CuboidCollider, BallCollider } from '@react-three/rapier';
import { Html } from '@react-three/drei';
import TeamLanyardCard from './TeamLanyard';

// --- STABILITY: Error Boundary ---
interface EBProps { children: React.ReactNode; }
interface EBState { hasError: boolean; }

class ErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>3D Interaction unavailable.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const SEGMENTS = 10;
const SEGMENT_LENGTH = 0.4;

function LanyardChain({ props2D }: { props2D: any }) {
  const fixedRef = useRef<any>(null);
  const cardRef = useRef<any>(null);
  const [links] = useState(() => Array(SEGMENTS).fill(null).map(() => createRef<any>()));
  const [dragged, setDragged] = useState(false);
  const [flipped, setFlipped] = useState(false);
  
  const lineRef = useRef<any>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(Array(SEGMENTS + 2).fill(null).map(() => new THREE.Vector3())), []);
  
  const { camera, size } = useThree();
  const vec = new THREE.Vector3();
  const dir = new THREE.Vector3();

  // --- JOINTS: Precise Anchor Alignment (Crucial for stability) ---
  useSphericalJoint(fixedRef, links[0], [[0, 0, 0], [0, SEGMENT_LENGTH / 2, 0]]);
  for (let i = 0; i < SEGMENTS - 1; i++) {
     // eslint-disable-next-line react-hooks/rules-of-hooks
     useSphericalJoint(links[i], links[i + 1], [[0, -SEGMENT_LENGTH / 2, 0], [0, SEGMENT_LENGTH / 2, 0]]);
  }
  useSphericalJoint(links[SEGMENTS - 1], cardRef, [[0, -SEGMENT_LENGTH / 2, 0], [0, 1.4, 0]]);

  useFrame((state) => {
    // --- EXACT MOTION LOGIC ---
    if (fixedRef.current) {
      // Sensitivity tuned to match ReactBits scale (constrained range)
      const targetX = (state.pointer.x * size.width) / 400; 
      const currentPos = fixedRef.current.translation();
      fixedRef.current.setNextKinematicTranslation({
        x: THREE.MathUtils.lerp(currentPos.x, targetX, 0.1),
        y: 4,
        z: 0
      });
    }

    if (fixedRef.current && cardRef.current && lineRef.current) {
      const p1 = fixedRef.current.translation();
      const p2 = cardRef.current.translation();
      
      curve.points[0].copy(p1);
      for (let i = 0; i < SEGMENTS; i++) {
        if (links[i].current) {
          curve.points[i + 1].copy(links[i].current.translation());
        }
      }
      curve.points[SEGMENTS + 1].set(p2.x, p2.y + 1.2, p2.z);
      
      const points = curve.getPoints(SEGMENTS * 3);
      lineRef.current.geometry.setFromPoints(points);
    }

    if (dragged && cardRef.current) {
       vec.set(state.pointer.x, state.pointer.y, 0.5);
       vec.unproject(camera);
       dir.copy(vec).sub(camera.position).normalize();
       const dist = -camera.position.z / dir.z;
       vec.copy(camera.position).add(dir.multiplyScalar(dist));
       (cardRef.current as any).setNextKinematicTranslation({ x: vec.x, y: vec.y, z: vec.z });
    }
  });

  return (
    <>
      <RigidBody ref={fixedRef} type="kinematicPosition" position={[0, 4, 0]} />

      {links.map((ref, i) => (
        <RigidBody 
          key={i} 
          ref={ref} 
          position={[0, 4 - (i + 1) * SEGMENT_LENGTH, 0]} 
          colliders={false}
          linearDamping={4.0}
          angularDamping={4.0}
          mass={0.02}
        >
          <BallCollider args={[0.04]} />
        </RigidBody>
      ))}

      <RigidBody 
        ref={cardRef} 
        position={[0, 4 - SEGMENTS * SEGMENT_LENGTH - 1.4, 0]}
        type={dragged ? "kinematicPosition" : "dynamic"}
        linearDamping={1.5}
        angularDamping={1.5}
        mass={2.5}
        colliders={false}
      >
        <CuboidCollider args={[0.8, 1.2, 0.05]} />
        
        <mesh
          onPointerDown={(e) => { 
            e.stopPropagation(); 
            (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId); 
            setDragged(true); 
          }}
          onPointerUp={(e) => { 
            e.stopPropagation(); 
            (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId); 
            setDragged(false); 
          }}
          onClick={() => setFlipped(!flipped)}
          visible={false}
        >
          <boxGeometry args={[1.6, 2.4, 0.1]} />
          <meshBasicMaterial />
        </mesh>

        <Html transform distanceFactor={5} position={[0, 0, 0.01]} style={{ pointerEvents: 'none' }}>
           <div style={{ pointerEvents: 'auto' }}>
            <TeamLanyardCard {...props2D} forceFlip={flipped} />
           </div>
        </Html>
      </RigidBody>

      <line ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color={props2D.color || "white"} transparent opacity={0.6} linewidth={2} />
      </line>
    </>
  );
}

export default function PhysicsLanyard(props: any) {
  return (
    <div style={{ width: '100%', height: '600px', cursor: 'grab', position: 'relative' }}>
      <ErrorBoundary>
        <Canvas camera={{ position: [0, 0, 10], fov: 30 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Physics gravity={[0, -10, 0]}>
              <LanyardChain props2D={props} />
            </Physics>
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

import React, { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Center, useGLTF } from '@react-three/drei';
import { resolveSlotColor, getFabricMaterialProps } from '../../utils/materialMapper3d';

export function GlbGarmentLoader({ modelUrl, colors, fabricId }) {
  const { scene } = useGLTF(modelUrl);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const fabric = useMemo(() => getFabricMaterialProps(fabricId), [fabricId]);

  const normalizedScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return 2.05 / maxDim;
  }, [clonedScene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const matName = child.material.name || '';
          const targetColor = resolveSlotColor(matName, colors);
          child.material = child.material.clone();
          child.material.side = THREE.DoubleSide;
          if (targetColor) {
            child.material.color.set(targetColor);
            child.material.roughness = fabric.roughness;
            child.material.metalness = fabric.metalness;
          }
          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, colors, fabric]);

  return (
    <group position={[0, -0.1, 0]}>
      {/* Bục gỗ gụ sơn son thếp vàng bảo tàng dưới chân model .glb */}
      <mesh position={[0, -1.18, 0]} receiveShadow>
        <cylinderGeometry args={[0.92, 1.02, 0.12, 64]} />
        <meshStandardMaterial color="#3B2112" roughness={0.38} metalness={0.18} />
      </mesh>
      <mesh position={[0, -1.11, 0]}>
        <cylinderGeometry args={[0.88, 0.9, 0.025, 64]} />
        <meshStandardMaterial color="#C9A227" roughness={0.28} metalness={0.82} />
      </mesh>

      <Center top position={[0, -1.09, 0]}>
        <primitive object={clonedScene} scale={normalizedScale} />
      </Center>
    </group>
  );
}

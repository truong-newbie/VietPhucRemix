import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { resolveSlotColor, getFabricMaterialProps } from '../../utils/materialMapper3d';

export function GlbGarmentLoader({ modelUrl, colors, fabricId }) {
  const { scene } = useGLTF(modelUrl);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const fabric = useMemo(() => getFabricMaterialProps(fabricId), [fabricId]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        const matName = child.material.name || '';
        const targetColor = resolveSlotColor(matName, colors);
        if (targetColor) {
          child.material = child.material.clone();
          child.material.color.set(targetColor);
          child.material.roughness = fabric.roughness;
          child.material.metalness = fabric.metalness;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, colors, fabric]);

  return <primitive object={clonedScene} position={[0, -1.05, 0]} scale={1.15} />;
}

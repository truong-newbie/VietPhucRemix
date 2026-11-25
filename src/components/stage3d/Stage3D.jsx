import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { RotateCcw, Box } from 'lucide-react';
import { ProceduralGarment3D } from './ProceduralGarment3D';
import { GlbGarmentLoader } from './GlbGarmentLoader';
import { FABRIC_PRESETS } from '../../utils/materialMapper3d';

export default function Stage3D({
  garment,
  outerColor,
  innerColor,
  bottomColor,
  beltColor,
  headAccessory
}) {
  const [fabricId, setFabricId] = useState('lua');
  const [readyModels, setReadyModels] = useState([]);
  const controlsRef = useRef(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;
    fetch(`${base}models/manifest.json`)
      .then((r) => (r.ok ? r.json() : { readyModels: [] }))
      .then((data) => {
        if (Array.isArray(data?.readyModels)) {
          setReadyModels(data.readyModels);
        }
      })
      .catch(() => setReadyModels([]));
  }, []);

  const colors = {
    outerHex: outerColor?.hex || '#8B1A1A',
    bottomHex: bottomColor?.hex || '#F5F5F0',
    beltHex: beltColor?.hex || '#C9A227',
    innerHex: innerColor?.hex || '#F5F5F0'
  };

  const hasGlb = garment?.id && readyModels.includes(garment.id);
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const modelUrl = `${base}models/${garment?.id}.glb`;

  return (
    <div className="relative w-full aspect-[3/4] max-h-[620px] rounded-2xl bg-gradient-to-b from-[#FAF7F2] via-[#F2E9DA] to-[#E5D7C0] border border-[#E0D5C1] shadow-xl overflow-hidden flex flex-col">
      {/* Top 3D Controls Overlay */}
      <div className="p-3 flex flex-wrap items-center justify-between gap-2 z-10 bg-white/75 backdrop-blur-sm border-b border-[#E0D5C1]">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D2440]">
          <Box className="w-4 h-4 text-[#8B1A1A]" />
          <span>{hasGlb ? 'Model 3D (.glb)' : '3D Phác Khối 360°'}</span>
        </div>

        <div className="flex items-center gap-1">
          {Object.values(FABRIC_PRESETS).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFabricId(f.id)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                fabricId === f.id
                  ? 'bg-[#8B1A1A] text-white'
                  : 'bg-white text-[#664422] border border-[#DECDB8]'
              }`}
            >
              {f.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => controlsRef.current?.reset()}
            aria-label="Đặt lại góc xoay 3D"
            title="Đặt lại góc nhìn"
            className="p-1.5 rounded-lg bg-white border border-[#DECDB8] text-[#1D2440] hover:bg-[#FAF7F2]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Three.js Canvas */}
      <div className="flex-1 w-full min-h-0">
        <Canvas shadows camera={{ position: [0, 0.3, 3.2], fov: 42 }}>
          <ambientLight intensity={0.75} />
          <directionalLight position={[3, 5, 4]} intensity={1.2} castShadow />
          <directionalLight position={[-3, 2, -2]} intensity={0.45} color="#FFF3D6" />

          <Suspense fallback={null}>
            {hasGlb ? (
              <GlbGarmentLoader modelUrl={modelUrl} colors={colors} fabricId={fabricId} />
            ) : (
              <ProceduralGarment3D
                garmentId={garment?.id}
                colors={colors}
                headAccessoryId={headAccessory?.id}
                fabricId={fabricId}
              />
            )}
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={2.2}
            maxDistance={4.8}
            maxPolarAngle={Math.PI / 1.9}
          />
        </Canvas>
      </div>

      <div className="px-3 py-2 bg-white/85 border-t border-[#E0D5C1] text-[11px] text-[#664422] flex items-center justify-between">
        <span>Kéo để xoay 360° • Cuộn để phóng to</span>
        <span className="font-bold text-[#8B1A1A]">{garment?.name}</span>
      </div>
    </div>
  );
}

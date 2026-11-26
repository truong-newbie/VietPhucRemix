import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Sparkles } from '@react-three/drei';
import { RotateCcw, Box, Play, Pause, MapPin, X } from 'lucide-react';
import { HeritageDiorama3D } from './HeritageDiorama3D';
import { GlbGarmentLoader } from './GlbGarmentLoader';
import { FABRIC_PRESETS } from '../../utils/materialMapper3d';
import { getHotspotsForGarment } from '../../data/garmentHotspotsData';

export default function Stage3D({
  garment,
  outerColor,
  innerColor,
  bottomColor,
  beltColor,
  headAccessory
}) {
  const [fabricId, setFabricId] = useState('lua');
  const [autoRotate, setAutoRotate] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
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

  const hotspots = getHotspotsForGarment(garment?.id);
  const visibleHotspot =
    activeHotspot?.garmentId === garment?.id ? activeHotspot.hotspot : null;

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
    <div className="relative w-full aspect-[3/4] max-h-[620px] rounded-2xl bg-gradient-to-b from-[#FAF7F2] via-[#F2E9DA] to-[#E5D7C0] border border-border-subtle shadow-xl overflow-hidden flex flex-col">
      {/* Top 3D Controls Overlay */}
      <div className="p-3 flex flex-wrap items-center justify-between gap-2 z-10 bg-white/80 backdrop-blur-sm border-b border-border-subtle">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D2440]">
          <Box className="w-4 h-4 text-[#8B1A1A]" />
          <span>{hasGlb ? 'Model 3D (.glb)' : 'Bảo Tàng 2.5D • Giải Phẫu Di Sản'}</span>
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          {Object.values(FABRIC_PRESETS).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFabricId(f.id)}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                fabricId === f.id
                  ? 'bg-[#8B1A1A] text-white'
                  : 'bg-white text-[#664422] border border-border-warm'
              }`}
            >
              {f.label}
            </button>
          ))}
          {!hasGlb && (
            <button
              type="button"
              onClick={() => setShowHotspots((v) => !v)}
              aria-label="Bật/tắt điểm chạm giải phẫu cổ phục"
              title="Hiện/ẩn điểm chạm giải phẫu"
              className={`px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 border transition ${
                showHotspots
                  ? 'bg-[#FAF3DD] text-[#8B1A1A] border-[#C9A227]'
                  : 'bg-white text-[#664422] border-border-warm'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>Chú giải</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setAutoRotate((v) => !v)}
            aria-label={autoRotate ? 'Tạm dừng tự xoay' : 'Bật tự xoay 360 độ'}
            title={autoRotate ? 'Tạm dừng tự xoay' : 'Bật tự xoay 360°'}
            className={`p-1.5 rounded-lg border transition ${
              autoRotate
                ? 'bg-[#1D2440] text-white border-[#1D2440]'
                : 'bg-white text-[#1D2440] border-border-warm hover:bg-surface-subtle'
            }`}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => controlsRef.current?.reset()}
            aria-label="Đặt lại góc xoay 3D"
            title="Đặt lại góc nhìn"
            className="p-1.5 rounded-lg bg-white border border-border-warm text-[#1D2440] hover:bg-surface-subtle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Three.js Canvas */}
      <div className="relative flex-1 w-full min-h-0">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.1, 3.2], fov: 40 }}>
          <hemisphereLight args={['#FFF6E5', '#8C7458', 0.72]} />
          <ambientLight intensity={0.48} />
          <directionalLight position={[2.8, 4.5, 4]} intensity={1.35} castShadow />
          <directionalLight position={[-3.2, 2.2, -2.2]} intensity={0.55} color="#FFE4B8" />

          <Sparkles count={24} scale={[2.6, 2.8, 1.5]} size={1.8} speed={0.25} color="#C9A227" />

          <Suspense fallback={null}>
            {hasGlb ? (
              <GlbGarmentLoader modelUrl={modelUrl} colors={colors} fabricId={fabricId} />
            ) : (
              <HeritageDiorama3D
                garmentId={garment?.id}
                colors={colors}
                headAccessoryId={headAccessory?.id}
                fabricId={fabricId}
                hotspots={hotspots}
                showHotspots={showHotspots}
                activeHotspotId={visibleHotspot?.id}
                onSelectHotspot={(hs) =>
                  setActiveHotspot(hs ? { garmentId: garment?.id, hotspot: hs } : null)
                }
              />
            )}
          </Suspense>

          <ContactShadows
            position={[0, -1.36, 0]}
            opacity={0.42}
            scale={4}
            blur={2.2}
            far={2.5}
          />

          <OrbitControls
            ref={controlsRef}
            autoRotate={autoRotate}
            autoRotateSpeed={0.9}
            enableDamping
            dampingFactor={0.05}
            enablePan={false}
            minDistance={2.1}
            maxDistance={4.6}
            maxPolarAngle={Math.PI / 1.9}
          />
        </Canvas>

        {/* Thẻ Giải phẫu chi tiết khi người dùng bấm vào Hotspot */}
        {visibleHotspot && (
          <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/95 backdrop-blur-md rounded-xl border border-[#C9A227] shadow-lg p-3 text-xs animate-fadeIn">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#8B1A1A] block">
                  Giải phẫu Di sản • {garment?.name}
                </span>
                <h5 className="font-bold text-sm text-[#1D2440]">{visibleHotspot.title}</h5>
              </div>
              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                aria-label="Đóng chú giải"
                className="p-1 rounded-lg text-[#574C43] hover:bg-surface-muted"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[#2C241D] mt-1 leading-relaxed">{visibleHotspot.detail}</p>
            <p className="text-[11px] text-[#664422] font-semibold mt-1">
              Nguồn: {visibleHotspot.source}
            </p>
          </div>
        )}
      </div>

      <div className="px-3 py-2 bg-white/85 border-t border-border-subtle text-[11px] text-[#664422] flex items-center justify-between gap-2">
        <span>Kéo để xoay nghiêng • Bấm điểm sáng để xem cấu trúc</span>
        <span className="font-bold text-[#8B1A1A] whitespace-nowrap">{garment?.name}</span>
      </div>
    </div>
  );
}

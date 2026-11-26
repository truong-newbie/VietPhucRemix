import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { getFabricMaterialProps } from '../../utils/materialMapper3d';
import { createDioramaTextures } from '../../utils/garmentTexture25D';

/**
 * Sân khấu Trưng bày Bảo tàng 2.5D Đa lớp + Điểm chạm Giải phẫu Di sản
 * (Dùng khi chưa có file .glb thật cho dòng cổ phục hiện tại)
 */
export function HeritageDiorama3D({
  garmentId,
  colors,
  headAccessoryId,
  fabricId,
  hotspots = [],
  showHotspots = true,
  activeHotspotId = null,
  onSelectHotspot
}) {
  const fabric = useMemo(() => getFabricMaterialProps(fabricId), [fabricId]);

  const textures = useMemo(
    () =>
      createDioramaTextures({
        garmentId,
        outerHex: colors.outerHex,
        innerHex: colors.innerHex,
        bottomHex: colors.bottomHex,
        beltHex: colors.beltHex,
        headAccessoryId,
        fabricId
      }),
    [
      garmentId,
      colors.outerHex,
      colors.innerHex,
      colors.bottomHex,
      colors.beltHex,
      headAccessoryId,
      fabricId
    ]
  );

  return (
    <group position={[0, -0.06, 0]}>
      {/* Bục gỗ gụ sơn son thếp vàng bảo tàng */}
      <mesh position={[0, -1.24, 0]} receiveShadow>
        <cylinderGeometry args={[0.96, 1.06, 0.12, 64]} />
        <meshStandardMaterial color="#3B2112" roughness={0.38} metalness={0.18} />
      </mesh>
      <mesh position={[0, -1.17, 0]}>
        <cylinderGeometry args={[0.92, 0.94, 0.025, 64]} />
        <meshStandardMaterial color="#C9A227" roughness={0.28} metalness={0.82} />
      </mesh>

      {/* Vòng hào quang di sản phía sau */}
      <mesh position={[0, 0.16, -0.22]}>
        <torusGeometry args={[0.92, 0.015, 16, 96]} />
        <meshStandardMaterial color="#C9A227" roughness={0.3} metalness={0.78} />
      </mesh>

      {/* Khung bình phong Trúc Chỉ / Gấm nền phía sau tạo chiều sâu 2.5D */}
      <group position={[0, 0.02, -0.14]}>
        {/* Mặt trước bình phong */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[1.56, 2.24, 0.035]} />
          <meshStandardMaterial color="#FAF3E5" roughness={0.82} metalness={0.04} />
        </mesh>
        {/* Viền khung gỗ gụ & đồng hai bên bình phong */}
        <mesh position={[-0.79, 0, 0]}>
          <boxGeometry args={[0.04, 2.3, 0.055]} />
          <meshStandardMaterial color="#5A331C" roughness={0.42} metalness={0.2} />
        </mesh>
        <mesh position={[0.79, 0, 0]}>
          <boxGeometry args={[0.04, 2.3, 0.055]} />
          <meshStandardMaterial color="#5A331C" roughness={0.42} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.13, 0]}>
          <boxGeometry args={[1.64, 0.045, 0.058]} />
          <meshStandardMaterial color="#C9A227" roughness={0.3} metalness={0.76} />
        </mesh>
        <mesh position={[0, -1.13, 0]}>
          <boxGeometry args={[1.64, 0.045, 0.058]} />
          <meshStandardMaterial color="#C9A227" roughness={0.3} metalness={0.76} />
        </mesh>

        {/* Mặt sau bình phong có dấu ấn Việt Phục Remix khi xoay 360° */}
        {textures.backPlaqueMap && (
          <mesh position={[0, 0, -0.02]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.54, 2.2]} />
            <meshStandardMaterial map={textures.backPlaqueMap} roughness={0.5} metalness={0.18} />
          </mesh>
        )}
      </group>

      {/* Lớp 1 (Chính): Trang phục Việt phục với vật liệu phản sáng thực tế */}
      {textures.mainMap && (
        <mesh position={[0, -0.01, -0.02]} castShadow>
          <planeGeometry args={[1.65, 2.2]} />
          <meshPhysicalMaterial
            map={textures.mainMap}
            bumpMap={textures.bumpMap}
            bumpScale={fabricId === 'gam' ? 0.022 : fabricId === 'dui' ? 0.015 : 0.005}
            transparent
            alphaTest={0.05}
            roughness={fabric.roughness}
            metalness={fabric.metalness}
            sheen={fabricId === 'lua' ? 0.85 : fabricId === 'gam' ? 0.45 : 0.05}
            sheenRoughness={0.35}
            sheenColor="#FFF4DF"
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Lớp 2 (Nổi phía trước): Cổ áo, khuy đồng, đai lụa, mũ nón tạo parallax 3D rõ nét */}
      {textures.accentMap && (
        <mesh position={[0, -0.01, 0.045]}>
          <planeGeometry args={[1.65, 2.2]} />
          <meshStandardMaterial
            map={textures.accentMap}
            transparent
            alphaTest={0.05}
            roughness={0.36}
            metalness={0.22}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Điểm chạm Giải phẫu Di sản (Interactive Hotspots) */}
      {showHotspots &&
        hotspots.map((hs) => {
          const isActive = activeHotspotId === hs.id;
          return (
            <group key={hs.id} position={hs.position}>
              <Html center distanceFactor={3.8} zIndexRange={[20, 0]}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectHotspot?.(isActive ? null : hs);
                  }}
                  className={`group flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-bold shadow-md transition-all whitespace-nowrap cursor-pointer border ${
                    isActive
                      ? 'bg-[#8B1A1A] text-white border-[#F9D423] scale-110'
                      : 'bg-white/95 text-[#1D2440] border-[#C9A227] hover:bg-[#8B1A1A] hover:text-white'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-[#F9D423]' : 'bg-[#8B1A1A] group-hover:bg-[#F9D423]'
                    }`}
                  />
                  <span>{hs.label}</span>
                </button>
              </Html>
            </group>
          );
        })}
    </group>
  );
}

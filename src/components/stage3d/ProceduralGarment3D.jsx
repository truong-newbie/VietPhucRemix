import React, { useMemo } from 'react';
import { getFabricMaterialProps } from '../../utils/materialMapper3d';

// Mô hình 3D tham số (Procedural Mannequin) khắc họa đặc trưng 7 dòng cổ phục khi chưa có file .glb
export function ProceduralGarment3D({
  garmentId,
  colors,
  headAccessoryId,
  fabricId
}) {
  const fabric = useMemo(() => getFabricMaterialProps(fabricId), [fabricId]);
  const { outerHex, bottomHex, beltHex, innerHex } = colors;

  const isAoTac = garmentId === 'ao-tac';
  const isNhatBinh = garmentId === 'nhat-binh';
  const isTuThan = garmentId === 'tu-than';
  const isBaBa = garmentId === 'ao-ba-ba';
  const isGiaoLinh = garmentId === 'giao-linh';

  const sleeveRadiusTop = isAoTac || isNhatBinh ? 0.14 : 0.1;
  const sleeveRadiusBottom = isAoTac ? 0.28 : isNhatBinh || isGiaoLinh ? 0.22 : 0.11;
  const coatHeight = isBaBa ? 0.72 : 1.18;
  const coatY = isBaBa ? 0.32 : 0.08;

  return (
    <group position={[0, -0.15, 0]}>
      {/* Bục gỗ trưng bày di sản */}
      <mesh position={[0, -1.18, 0]} receiveShadow>
        <cylinderGeometry args={[0.92, 1.0, 0.12, 48]} />
        <meshStandardMaterial color="#5C3A21" roughness={0.65} metalness={0.1} />
      </mesh>
      <mesh position={[0, -1.11, 0]}>
        <cylinderGeometry args={[0.88, 0.88, 0.02, 48]} />
        <meshStandardMaterial color="#C9A227" roughness={0.35} metalness={0.6} />
      </mesh>

      {/* Đầu & Cổ ma-nơ-canh cách điệu */}
      <mesh position={[0, 1.08, 0]} castShadow>
        <sphereGeometry args={[0.17, 32, 32]} />
        <meshStandardMaterial color="#F5DBC8" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.87, 0]}>
        <cylinderGeometry args={[0.075, 0.085, 0.16, 24]} />
        <meshStandardMaterial color="#F5DBC8" roughness={0.6} />
      </mesh>
      {/* Tóc */}
      <mesh position={[0, 1.13, -0.02]}>
        <sphereGeometry args={[0.175, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#221F1F" roughness={0.75} />
      </mesh>

      {/* Phụ kiện đầu 3D */}
      {headAccessoryId === 'khan-van' && (
        <mesh position={[0, 1.17, 0]} rotation={[0.15, 0, 0]}>
          <torusGeometry args={[0.17, 0.045, 16, 36]} />
          <meshStandardMaterial color={outerHex} roughness={fabric.roughness} metalness={fabric.metalness} />
        </mesh>
      )}
      {headAccessoryId === 'non-quai-thao' && (
        <group position={[0, 1.24, 0]}>
          <mesh>
            <cylinderGeometry args={[0.48, 0.48, 0.03, 36]} />
            <meshStandardMaterial color="#E8D5B5" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.02, 0]}>
            <cylinderGeometry args={[0.46, 0.46, 0.04, 36, 1, true]} />
            <meshStandardMaterial color="#C9A227" roughness={0.6} />
          </mesh>
        </group>
      )}
      {headAccessoryId === 'non-la-sen' && (
        <mesh position={[0, 1.28, 0]}>
          <coneGeometry args={[0.42, 0.24, 36]} />
          <meshStandardMaterial color="#EFE5CD" roughness={0.75} />
        </mesh>
      )}
      {headAccessoryId === 'tram-cai-sen' && (
        <mesh position={[0.15, 1.2, -0.06]} rotation={[0, 0, -0.45]}>
          <cylinderGeometry args={[0.012, 0.012, 0.28, 12]} />
          <meshStandardMaterial color="#C9A227" roughness={0.25} metalness={0.85} />
        </mesh>
      )}

      {/* Phần dưới: Váy lĩnh hoặc Quần suông 2 ống */}
      {isTuThan ? (
        <mesh position={[0, -0.52, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.44, 1.1, 32]} />
          <meshStandardMaterial color={bottomHex} roughness={fabric.roughness} metalness={fabric.metalness} />
        </mesh>
      ) : (
        <group>
          <mesh position={[-0.13, -0.56, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.16, 1.05, 24]} />
            <meshStandardMaterial color={bottomHex} roughness={fabric.roughness} metalness={fabric.metalness} />
          </mesh>
          <mesh position={[0.13, -0.56, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.16, 1.05, 24]} />
            <meshStandardMaterial color={bottomHex} roughness={fabric.roughness} metalness={fabric.metalness} />
          </mesh>
        </group>
      )}

      {/* Thân áo chính */}
      <mesh position={[0, coatY, 0]} castShadow>
        <cylinderGeometry
          args={[isNhatBinh ? 0.26 : 0.23, isBaBa ? 0.28 : 0.38, coatHeight, 32]}
        />
        <meshStandardMaterial color={outerHex} roughness={fabric.roughness} metalness={fabric.metalness} />
      </mesh>

      {/* Cổ áo / Nẹp đặc trưng */}
      {isGiaoLinh ? (
        <mesh position={[0, 0.66, 0.18]} rotation={[0.15, 0, 0.35]}>
          <boxGeometry args={[0.07, 0.34, 0.08]} />
          <meshStandardMaterial color={innerHex} roughness={0.5} />
        </mesh>
      ) : isNhatBinh ? (
        <mesh position={[0, 0.52, 0.21]}>
          <boxGeometry args={[0.24, 0.42, 0.06]} />
          <meshStandardMaterial color="#C9A227" roughness={0.35} metalness={0.5} />
        </mesh>
      ) : (
        <mesh position={[0, 0.77, 0]}>
          <cylinderGeometry args={[0.11, 0.12, 0.1, 24]} />
          <meshStandardMaterial color={outerHex} roughness={fabric.roughness} metalness={fabric.metalness} />
        </mesh>
      )}

      {/* Lớp cổ lót trong */}
      <mesh position={[0, 0.81, 0]}>
        <cylinderGeometry args={[0.105, 0.105, 0.04, 24]} />
        <meshStandardMaterial color={innerHex} roughness={0.5} />
      </mesh>

      {/* Thắt lưng / Khăn bao */}
      {(isTuThan || isGiaoLinh) && (
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.27, 0.27, 0.1, 28]} />
          <meshStandardMaterial color={beltHex} roughness={0.45} />
        </mesh>
      )}

      {/* Tay áo trái & phải */}
      <mesh position={[-0.36, 0.44, 0]} rotation={[0, 0, 0.45]} castShadow>
        <cylinderGeometry args={[sleeveRadiusTop, sleeveRadiusBottom, 0.66, 20]} />
        <meshStandardMaterial color={outerHex} roughness={fabric.roughness} metalness={fabric.metalness} />
      </mesh>
      <mesh position={[0.36, 0.44, 0]} rotation={[0, 0, -0.45]} castShadow>
        <cylinderGeometry args={[sleeveRadiusTop, sleeveRadiusBottom, 0.66, 20]} />
        <meshStandardMaterial color={outerHex} roughness={fabric.roughness} metalness={fabric.metalness} />
      </mesh>
    </group>
  );
}

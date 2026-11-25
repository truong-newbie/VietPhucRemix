// Ánh xạ chuẩn 4 khe vật liệu cho model 3D .glb và chất liệu vải (Lụa / Gấm / Đũi)

export const FABRIC_PRESETS = {
  lua: { id: 'lua', label: 'Lụa tơ tằm', roughness: 0.32, metalness: 0.08 },
  gam: { id: 'gam', label: 'Gấm ánh kim', roughness: 0.42, metalness: 0.25 },
  dui: { id: 'dui', label: 'Đũi mộc lì', roughness: 0.85, metalness: 0.02 }
};

export function resolveSlotColor(materialName = '', colors = {}) {
  const name = String(materialName).toLowerCase();
  if (name.includes('outer') || name.includes('ao_chinh') || name.includes('coat')) {
    return colors.outerHex || '#8B1A1A';
  }
  if (name.includes('bottom') || name.includes('quan') || name.includes('vay') || name.includes('skirt')) {
    return colors.bottomHex || '#F5F5F0';
  }
  if (name.includes('belt') || name.includes('that_lung') || name.includes('dai')) {
    return colors.beltHex || '#C9A227';
  }
  if (name.includes('trim') || name.includes('vien') || name.includes('inner') || name.includes('co_ao')) {
    return colors.innerHex || '#F5F5F0';
  }
  return null;
}

export function getFabricMaterialProps(fabricId = 'lua') {
  return FABRIC_PRESETS[fabricId] || FABRIC_PRESETS.lua;
}

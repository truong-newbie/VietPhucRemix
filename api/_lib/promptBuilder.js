// Xây dựng prompt mô tả giải phẫu 7 dòng Việt phục chuẩn xác cho AI Virtual Try-On

const ANATOMY_MAP = {
  'ngu-than':
    'Vietnamese Ao Ngu Than (five-panel tunic) with standing mandarin collar (lap linh), 5 buttons fastening down the right side under the arm, long straight sleeves (tay chen), worn over wide silk trousers.',
  'ao-tac':
    'Vietnamese Ao Tac ceremonial robe with standing mandarin collar, 5 buttons to the right underarm, and very wide long draped ceremonial sleeves (tay thung), worn over wide silk trousers.',
  'tu-than':
    'Northern Vietnamese Ao Tu Than four-panel tunic with front panels tied at the waist, layered over a diamond-shaped Yem Dao bodice, colorful silk sash, and long flowing dark skirt (vay linh).',
  'nhat-binh':
    'Nguyen Dynasty Imperial Ao Nhat Binh robe featuring a signature wide rectangular embroidered collar border down the center chest, wide sleeves with five-color (Ngu Sac) cuff bands, and wave-pattern hem.',
  'ao-dai':
    'Traditional Vietnamese Ao Dai with fitted bodice, standing 3cm collar, high side slits from the waist into two long flowing front and back panels over loose silk trousers.',
  'ao-ba-ba':
    'Southern Vietnamese Ao Ba Ba collarless round-neck button-front tunic ending at the hip with side vents and two front patch pockets, worn with loose trousers.',
  'giao-linh':
    'Historical Vietnamese Giao Linh cross-collar robe (Y-shaped left-over-right ta kham lapel) with wide sleeves, fabric waist sash, and long flowing skirt/trousers.'
};

export function buildTryOnPrompt(outfitSpec = {}) {
  const garmentId = outfitSpec.garmentId || 'ngu-than';
  const anatomy = ANATOMY_MAP[garmentId] || ANATOMY_MAP['ngu-than'];
  const outerColor = outfitSpec.outerColorName || 'heritage crimson';
  const bottomColor = outfitSpec.bottomColorName || 'ivory white';
  const head = outfitSpec.headAccessoryName ? `Headwear: ${outfitSpec.headAccessoryName}.` : '';
  const foot = outfitSpec.footAccessoryName ? `Footwear: ${outfitSpec.footAccessoryName}.` : '';

  return [
    'Photorealistic virtual try-on: Dress the person from the first photo in the exact traditional Vietnamese attire shown in the second reference image.',
    `Garment structure: ${anatomy}`,
    `Primary outer color: ${outerColor}. Lower garment color: ${bottomColor}. ${head} ${foot}`,
    'Strict preservation rules: Keep the person face, skin tone, hairstyle, pose, lighting, and background completely natural and unchanged.',
    'Do NOT alter the traditional Vietnamese collar or sleeve structure into Chinese Qipao or Hanfu.'
  ]
    .filter(Boolean)
    .join(' ');
}

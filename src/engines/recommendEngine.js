// Động cơ gợi ý 3 bộ phối chuẩn theo sự kiện (< 50ms, không luật Đỏ, đa dạng dòng áo/màu)
import { GARMENTS_DATA } from '../data/garmentsData';
import { EVENTS_DATA } from '../data/eventsData';
import { COLOR_PALETTE } from '../data/colorsData';
import { ACCESSORIES_DATA } from '../data/accessoriesData';
import { evaluateCultureGuard } from './cultureEngine';
import { calculateHarmonyScore } from './harmonyEngine';

const colorsMap = Object.fromEntries(COLOR_PALETTE.map((c) => [c.id, c]));
const garmentsMap = Object.fromEntries(GARMENTS_DATA.map((g) => [g.id, g]));
const headMap = Object.fromEntries(ACCESSORIES_DATA.head.map((a) => [a.id, a]));
const handMap = Object.fromEntries(ACCESSORIES_DATA.hand.map((a) => [a.id, a]));
const footMap = Object.fromEntries(ACCESSORIES_DATA.foot.map((a) => [a.id, a]));

export function recommendOutfits({
  eventId,
  gender = 'female',
  mode = 'genz',
  region = 'all',
  style = null
}) {
  const event = EVENTS_DATA.find((e) => e.id === eventId) || EVENTS_DATA[0];

  const candidateGarments = (event.recommendedGarments || ['ngu-than', 'ao-dai'])
    .map((id) => garmentsMap[id])
    .filter(Boolean)
    .filter((g) => {
      if (gender === 'male' && g.gender === 'female') return false;
      if (region && region !== 'all' && g.regions && !g.regions.includes('toan-quoc') && !g.regions.includes(region)) {
        return false;
      }
      return true;
    });

  const garmentsList = candidateGarments.length > 0 ? candidateGarments : [garmentsMap['ngu-than']];
  const outerColors = (event.recommendedColors || ['do-son', 'hoang-tho', 'lam-cham'])
    .map((id) => colorsMap[id])
    .filter(Boolean);
  const bottomColors = ['trang-su', 'den-tuyen']
    .map((id) => colorsMap[id])
    .filter(Boolean);

  const candidates = [];

  for (const garment of garmentsList) {
    const compatHeads = ACCESSORIES_DATA.head.filter(
      (a) => a.garmentCompatibility?.includes(garment.id) && (gender === 'female' || a.id !== 'tram-cai-sen')
    );
    const compatHands = ACCESSORIES_DATA.hand.filter((a) => a.garmentCompatibility?.includes(garment.id));
    const compatFoots = ACCESSORIES_DATA.foot.filter(
      (a) => a.garmentCompatibility?.includes(garment.id) && (gender === 'female' || a.id !== 'giay-bup-be')
    );

    const headPick = compatHeads[0] || headMap[garment.defaultAccessories?.head] || ACCESSORIES_DATA.head[0];
    const handPick =
      (mode === 'genz' ? compatHands.find((h) => h.modern) : compatHands.find((h) => !h.modern)) ||
      compatHands[0] ||
      handMap[garment.defaultAccessories?.hand] ||
      ACCESSORIES_DATA.hand[0];
    const footPick =
      (mode === 'genz' ? compatFoots.find((f) => f.modern) : compatFoots.find((f) => !f.modern)) ||
      compatFoots[0] ||
      footMap[garment.defaultAccessories?.foot] ||
      ACCESSORIES_DATA.foot[0];

    for (const outerColor of outerColors) {
      for (const bottomColor of bottomColors) {
        if (candidates.length >= 1500) break;
        const beltColor = colorsMap[garment.defaultColors?.belt === '#8B1A1A' ? 'do-son' : 'hoang-tho'] || COLOR_PALETTE[1];

        const cultureState = {
          eventId: event.id,
          garmentId: garment.id,
          outerColorId: outerColor.id,
          bottomColorId: bottomColor.id,
          beltColorId: beltColor.id,
          headAccessoryId: headPick.id,
          handAccessoryId: handPick.id,
          footAccessoryId: footPick.id,
          bottomLength: 'long',
          gender
        };

        const culture = evaluateCultureGuard(cultureState, colorsMap);
        if (culture.status === 'red') continue;

        const harmony = calculateHarmonyScore({
          garment,
          event,
          outerColor,
          bottomColor,
          beltColor,
          headAccessory: headPick,
          handAccessory: handPick,
          footAccessory: footPick,
          style
        });

        const penalty = culture.status === 'yellow' ? 10 : 0;

        candidates.push({
          rankScore: harmony.score - penalty,
          harmonyScore: harmony.score,
          cultureStatus: culture.status,
          garmentName: garment.name,
          outerColorName: outerColor.name,
          outerHex: outerColor.hex,
          bottomHex: bottomColor.hex,
          outfit: {
            eventId: event.id,
            garmentId: garment.id,
            outerColorId: outerColor.id,
            bottomColorId: bottomColor.id,
            beltColorId: beltColor.id,
            headId: headPick.id,
            handId: handPick.id,
            footId: footPick.id,
            bottomLength: 'long',
            gender
          }
        });
      }
    }
  }

  candidates.sort((a, b) => b.rankScore - a.rankScore);

  const picked = [];
  const seenKeys = new Set();

  // Pass 1: ưu tiên đa dạng dòng áo hoặc màu áo
  for (const item of candidates) {
    const sig = `${item.outfit.garmentId}:${item.outfit.outerColorId}`;
    if (seenKeys.has(sig)) continue;
    const sameGarment = picked.some((p) => p.outfit.garmentId === item.outfit.garmentId);
    const sameColor = picked.some((p) => p.outfit.outerColorId === item.outfit.outerColorId);
    if (picked.length === 0 || (!sameGarment && !sameColor)) {
      picked.push(item);
      seenKeys.add(sig);
    }
    if (picked.length >= 3) break;
  }

  // Pass 2: bổ sung đủ 3 gợi ý nếu danh sách dòng áo ít (ví dụ sự kiện chuyên biệt 1 dòng áo)
  if (picked.length < 3) {
    for (const item of candidates) {
      const sig = `${item.outfit.garmentId}:${item.outfit.outerColorId}`;
      if (seenKeys.has(sig)) continue;
      picked.push(item);
      seenKeys.add(sig);
      if (picked.length >= 3) break;
    }
  }

  return picked;
}

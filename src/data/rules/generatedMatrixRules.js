// Sinh tự động các luật tổ hợp xác định từ ma trận Sự kiện × Màu sắc & Dòng áo × Phụ kiện
// Đảm bảo mỗi luật đều có ID duy nhất, ID hợp lệ trong catalog, source minh bạch và autoFix tự triệt tiêu.

import { EVENTS_DATA } from '../eventsData.js';
import { GARMENTS_DATA } from '../garmentsData.js';
import { COLOR_PALETTE } from '../colorsData.js';
import { ACCESSORIES_DATA } from '../accessoriesData.js';

export function buildGeneratedMatrixRules() {
  const rules = [];
  const colorNameMap = Object.fromEntries(COLOR_PALETTE.map((c) => [c.id, c.name]));

  // 1. Ma trận Sự kiện × Màu kiêng kỵ (mỗi cặp sự kiện - màu kỵ)
  for (const ev of EVENTS_DATA) {
    for (const colorId of ev.forbiddenColors || []) {
      const safeColor = ev.recommendedColors?.[0] || 'lam-cham';
      if (safeColor === colorId) continue;
      rules.push({
        id: `rule-matrix-color-${ev.id}-${colorId}`,
        level: 'yellow',
        priority: 40,
        category: 'mau-sac',
        when: { eventId: [ev.id], outerColorId: [colorId] },
        title: `Lưu ý màu ${colorNameMap[colorId] || colorId} trong dịp ${ev.name}`,
        message: `Trong bối cảnh "${ev.name}", gam màu ${colorNameMap[colorId] || colorId} không được khuyến khích để giữ trọn vẹn không khí và nghi thức sự kiện.`,
        quote: '',
        suggestion: `Nên chuyển sang gam ${colorNameMap[safeColor] || safeColor} phù hợp hơn với sự kiện này.`,
        source: 'CẦN THẨM ĐỊNH',
        autoFix: { outerColorId: safeColor }
      });
    }
  }

  // 2. Ma trận Phụ kiện Đầu không nằm trong garmentCompatibility của 7 dòng áo
  for (const head of ACCESSORIES_DATA.head) {
    const compat = new Set(head.garmentCompatibility || []);
    for (const g of GARMENTS_DATA) {
      if (!compat.has(g.id)) {
        const fallbackHead = g.defaultAccessories?.head || 'khong-mu';
        rules.push({
          id: `rule-matrix-head-${g.id}-${head.id}`,
          level: 'yellow',
          priority: 30,
          category: 'phu-kien',
          when: { garmentId: [g.id], headAccessoryId: [head.id] },
          title: `Gợi ý phụ kiện đầu phù hợp hơn cho ${g.name}`,
          message: `"${head.name}" ít khi được phối cùng ${g.name} theo tập quán truyền thống.`,
          quote: '',
          suggestion: `Thử dùng phụ kiện đầu gợi ý chuẩn của ${g.name}.`,
          source: 'CẦN THẨM ĐỊNH',
          autoFix: { headAccessoryId: fallbackHead }
        });
      }
    }
  }

  // 3. Ma trận Phụ kiện Tay không nằm trong garmentCompatibility của 7 dòng áo
  for (const hand of ACCESSORIES_DATA.hand) {
    const compat = new Set(hand.garmentCompatibility || []);
    for (const g of GARMENTS_DATA) {
      if (!compat.has(g.id)) {
        const fallbackHand = g.defaultAccessories?.hand || 'khong-cam-tay';
        rules.push({
          id: `rule-matrix-hand-${g.id}-${hand.id}`,
          level: 'yellow',
          priority: 25,
          category: 'phu-kien',
          when: { garmentId: [g.id], handAccessoryId: [hand.id] },
          title: `Lưu ý phụ kiện cầm tay với ${g.name}`,
          message: `"${hand.name}" chưa thực sự đồng điệu về chất liệu/bối cảnh với ${g.name}.`,
          quote: '',
          suggestion: `Chuyển sang phụ kiện cầm tay phù hợp với phom ${g.name}.`,
          source: 'CẦN THẨM ĐỊNH',
          autoFix: { handAccessoryId: fallbackHand }
        });
      }
    }
  }

  // 4. Ma trận Giày/Guốc không nằm trong garmentCompatibility của 7 dòng áo
  for (const foot of ACCESSORIES_DATA.foot) {
    const compat = new Set(foot.garmentCompatibility || []);
    for (const g of GARMENTS_DATA) {
      if (!compat.has(g.id)) {
        const fallbackFoot = g.defaultAccessories?.foot || 'guoc-moc';
        rules.push({
          id: `rule-matrix-foot-${g.id}-${foot.id}`,
          level: 'yellow',
          priority: 28,
          category: 'phu-kien',
          when: { garmentId: [g.id], footAccessoryId: [foot.id] },
          title: `Lưu ý giày dép khi mặc ${g.name}`,
          message: `"${foot.name}" có thể tạo cảm giác lệch nhịp với phom dáng của ${g.name}.`,
          quote: '',
          suggestion: `Đổi sang giày/guốc truyền thống tương thích với ${g.name}.`,
          source: 'CẦN THẨM ĐỊNH',
          autoFix: { footAccessoryId: fallbackFoot }
        });
      }
    }
  }

  // 5. Ma trận Sự kiện × Dòng áo ngoài danh sách recommendedGarments (nhắc nhẹ cấp yellow, ưu tiên thấp)
  for (const ev of EVENTS_DATA) {
    const rec = new Set(ev.recommendedGarments || []);
    for (const g of GARMENTS_DATA) {
      if (!rec.has(g.id)) {
        const targetGarment = ev.recommendedGarments?.[0] || 'ngu-than';
        // Không áp đặt lên các kịch bản demo xanh hiện có
        rules.push({
          id: `rule-matrix-event-garment-${ev.id}-${g.id}`,
          level: 'yellow',
          priority: 20,
          category: 'phom-dang',
          when: { eventId: [ev.id], garmentId: [g.id] },
          title: `Gợi ý dòng cổ phục tối ưu cho "${ev.name}"`,
          message: `${g.name} ít phổ biến hơn trong bối cảnh "${ev.name}". Bạn vẫn có thể phối sáng tạo, hoặc thử dòng áo được khuyên dùng cho sự kiện này.`,
          quote: '',
          suggestion: `Sự kiện "${ev.name}" hợp nhất với các dòng: ${(ev.recommendedGarments || []).join(', ')}.`,
          source: 'CẦN THẨM ĐỊNH',
          autoFix: { garmentId: targetGarment }
        });
      }
    }
  }

  return rules;
}

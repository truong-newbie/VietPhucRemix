// Thuật toán chấm điểm Hài hòa Văn hóa & Thẩm mỹ Ngũ Sắc (Harmony Score 0 - 100)
import { ELEMENT_RELATIONS } from '../data/colorsData';

export function calculateHarmonyScore({
  garment,
  event,
  outerColor,
  bottomColor,
  beltColor,
  headAccessory,
  footAccessory
}) {
  let score = 50; // Base score
  const explanations = [];

  // 1. Phân tích Ngũ Hành tương sinh giữa Áo Chính (Outer) và Quần/Váy (Bottom)
  if (outerColor && bottomColor) {
    const elOuter = outerColor.element;
    const elBottom = bottomColor.element;

    if (elOuter === elBottom) {
      score += 18;
      explanations.push(`Đồng khí tương cầu: Cả áo và quần đều mang hành ${elOuter}, tạo cảm giác trang nhã, thống nhất.`);
    } else if (ELEMENT_RELATIONS.generating[elOuter] === elBottom || ELEMENT_RELATIONS.generating[elBottom] === elOuter) {
      score += 25;
      explanations.push(`Ngũ Hành tương sinh cát tường (${elOuter} sinh ${ELEMENT_RELATIONS.generating[elOuter] || elBottom}), trường khí hanh thông, mang lại tài lộc.`);
    } else if (ELEMENT_RELATIONS.overcoming[elOuter] === elBottom || ELEMENT_RELATIONS.overcoming[elBottom] === elOuter) {
      // Kiểm tra xem thắt lưng có đóng vai trò hòa giải không
      const elBelt = beltColor ? beltColor.element : null;
      if (elBelt && (ELEMENT_RELATIONS.generating[elOuter] === elBelt || ELEMENT_RELATIONS.generating[elBelt] === elBottom)) {
        score += 10;
        explanations.push(`Thắt lưng hành ${elBelt} đã khéo léo hòa giải thế xung khắc giữa ${elOuter} và ${elBottom}.`);
      } else {
        score -= 15;
        explanations.push(`Thế tương khắc giữa hành ${elOuter} và ${elBottom} dễ gây cảm giác căng thẳng thị giác.`);
      }
    } else {
      score += 12;
      explanations.push(`Màu sắc cân bằng, không phạm ngũ hành tương khắc.`);
    }
  }

  // 2. Độ phù hợp với Bối cảnh / Sự kiện
  if (event && outerColor) {
    if (event.recommendedColors.includes(outerColor.id)) {
      score += 15;
      explanations.push(`Sắc ${outerColor.name} rất hòa hợp với không khí trang trọng của ${event.name}.`);
    } else if (event.forbiddenColors.includes(outerColor.id)) {
      score -= 25;
      explanations.push(`Sắc ${outerColor.name} kiêng kỵ trong dịp ${event.name}.`);
    } else {
      score += 8;
    }
  }

  // 3. Sự tương thích giữa Trang phục và Phụ kiện
  if (headAccessory && garment) {
    if (headAccessory.garmentCompatibility && headAccessory.garmentCompatibility.includes(garment.id)) {
      score += 8;
      explanations.push(`Phụ kiện ${headAccessory.name} tôn lên trọn vẹn nét đẹp của ${garment.name}.`);
    } else if (headAccessory.id !== 'khong-mu') {
      score -= 10;
      explanations.push(`Phụ kiện ${headAccessory.name} ít khi phối cùng ${garment.name} theo truyền thống.`);
    }
  }

  // Giới hạn điểm số từ 15 đến 99
  const finalScore = Math.min(99, Math.max(20, score));

  let rating = 'Khá hài hòa';
  let badgeColor = 'text-amber-600 bg-amber-50 border-amber-200';
  if (finalScore >= 85) {
    rating = 'Tuyệt hảo di sản';
    badgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  } else if (finalScore < 60) {
    rating = 'Cần điều chỉnh';
    badgeColor = 'text-rose-700 bg-rose-50 border-rose-300';
  }

  return {
    score: finalScore,
    rating,
    badgeColor,
    explanations
  };
}


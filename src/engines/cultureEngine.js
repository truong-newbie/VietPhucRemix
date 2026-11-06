// Động cơ suy diễn Luật Văn hóa Culture Guard
import { CULTURE_RULES } from '../data/cultureRules';

export function evaluateCultureGuard(state, colorsMap) {
  // Tìm tất cả các luật khớp
  const matchedRules = [];

  for (const rule of CULTURE_RULES) {
    try {
      if (rule.check(state, colorsMap)) {
        matchedRules.push(rule);
      }
    } catch (e) {
      console.warn('Lỗi kiểm tra quy tắc văn hóa:', rule.id, e);
    }
  }

  // Phân loại ưu tiên: ĐỎ (Red) > VÀNG (Yellow) > XANH (Green)
  const redRule = matchedRules.find(r => r.level === 'red');
  if (redRule) {
    return {
      status: 'red',
      levelText: 'CẢNH BÁO SAI LỆCH VĂN HÓA',
      activeRule: redRule,
      allMatched: matchedRules
    };
  }

  const yellowRule = matchedRules.find(r => r.level === 'yellow');
  if (yellowRule) {
    return {
      status: 'yellow',
      levelText: 'LƯU Ý ĐỊNH HƯỚNG BẢN SẮC',
      activeRule: yellowRule,
      allMatched: matchedRules
    };
  }

  const greenRule = matchedRules.find(r => r.level === 'green');
  if (greenRule) {
    return {
      status: 'green',
      levelText: 'SÁNG TẠO HỢP CHUẨN DI SẢN',
      activeRule: greenRule,
      allMatched: matchedRules
    };
  }

  // Mặc định an toàn
  return {
    status: 'green',
    levelText: 'HỢP CHUẨN TRUYỀN THỐNG',
    activeRule: {
      id: 'default-safe',
      level: 'green',
      title: 'Bộ phối hài hòa, tôn trọng cấu trúc cổ truyền',
      message: 'Trang phục giữ được phong thái tao nhã của người Việt, màu sắc hài hòa và đúng chuẩn mực.',
      quote: '“Y phục xứng kỳ đức” — Trang phục biểu hiện tâm hồn và phẩm hạnh.',
      suggestion: 'Bạn có thể thử nghiệm thêm các phụ kiện như quạt lụa hoặc khăn vấn để tăng thêm phần thanh lịch.',
      autoFix: null
    },
    allMatched: []
  };
}


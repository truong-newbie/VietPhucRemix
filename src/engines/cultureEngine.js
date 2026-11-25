// Động cơ suy diễn Luật Văn hóa Culture Guard (khai báo, thuần túy)
import { CULTURE_RULES } from '../data/cultureRules';
import { matchRule } from './ruleMatcher';

const LEVEL_WEIGHT = { red: 3, yellow: 2, green: 1 };

export function sortMatchedRules(rules) {
  return [...rules].sort((a, b) => {
    const levelDiff = (LEVEL_WEIGHT[b.level] || 0) - (LEVEL_WEIGHT[a.level] || 0);
    if (levelDiff !== 0) return levelDiff;
    return (b.priority || 0) - (a.priority || 0);
  });
}

/**
 * Gộp bản vá autoFix từ các luật Đỏ & Vàng đang khớp (áp Vàng trước, Đỏ sau để ưu tiên xử lý triệt để lỗi nghiêm trọng).
 */
export function computeCombinedAutoFix(matchedRules = []) {
  const warnings = matchedRules.filter((r) => (r.level === 'red' || r.level === 'yellow') && r.autoFix);
  if (warnings.length === 0) return null;

  const sortedLowToHigh = [...warnings].sort((a, b) => {
    const levelDiff = (LEVEL_WEIGHT[a.level] || 0) - (LEVEL_WEIGHT[b.level] || 0);
    if (levelDiff !== 0) return levelDiff;
    return (a.priority || 0) - (b.priority || 0);
  });

  const combined = {};
  for (const r of sortedLowToHigh) {
    Object.assign(combined, r.autoFix);
  }
  return Object.keys(combined).length > 0 ? combined : null;
}

export function evaluateCultureGuard(state, colorsMap) {
  const matchedRules = [];

  for (const rule of CULTURE_RULES) {
    try {
      if (matchRule(rule, state, colorsMap)) {
        matchedRules.push(rule);
      }
    } catch (e) {
      console.warn('Lỗi kiểm tra quy tắc văn hóa:', rule.id, e);
    }
  }

  const sorted = sortMatchedRules(matchedRules);
  const topRule = sorted[0];

  if (topRule?.level === 'red') {
    return {
      status: 'red',
      levelText: 'CẢNH BÁO SAI LỆCH VĂN HÓA',
      activeRule: topRule,
      allMatched: sorted,
      combinedAutoFix: computeCombinedAutoFix(sorted)
    };
  }

  if (topRule?.level === 'yellow') {
    return {
      status: 'yellow',
      levelText: 'LƯU Ý ĐỊNH HƯỚNG BẢN SẮC',
      activeRule: topRule,
      allMatched: sorted,
      combinedAutoFix: computeCombinedAutoFix(sorted)
    };
  }

  if (topRule?.level === 'green') {
    return {
      status: 'green',
      levelText: 'SÁNG TẠO HỢP CHUẨN DI SẢN',
      activeRule: topRule,
      allMatched: sorted,
      combinedAutoFix: null
    };
  }

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
      source: 'CẦN THẨM ĐỊNH',
      autoFix: null
    },
    allMatched: [],
    combinedAutoFix: null
  };
}

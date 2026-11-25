// Bộ khớp luật khai báo Culture Guard & trình kiểm định tính toàn vẹn dữ liệu

export const VALID_RULE_LEVELS = ['red', 'yellow', 'green'];
export const VALID_RULE_CATEGORIES = [
  'ton-nghiem',
  'vung-mien',
  'mau-sac',
  'phom-dang',
  'phu-kien',
  'ngu-hanh',
  'dong-bo',
  'khen-ngoi'
];

function matchConditionMap(condMap, state, colorsMap = {}) {
  if (!condMap || typeof condMap !== 'object') return true;
  const outerEl = colorsMap[state.outerColorId]?.element;
  const bottomEl = colorsMap[state.bottomColorId]?.element;
  const beltEl = colorsMap[state.beltColorId]?.element;

  for (const [key, expected] of Object.entries(condMap)) {
    const list = Array.isArray(expected) ? expected : [expected];
    let actual;
    if (key === 'outerElement') actual = outerEl;
    else if (key === 'bottomElement') actual = bottomEl;
    else if (key === 'beltElement') actual = beltEl;
    else actual = state[key];

    if (!list.includes(actual)) {
      return false;
    }
  }
  return true;
}

/**
 * Kiểm tra xem một luật khai báo có khớp với trạng thái bộ phối hiện tại hay không.
 */
export function matchRule(rule, state, colorsMap = {}) {
  if (!rule || !state) return false;
  if (typeof rule.check === 'function') {
    return Boolean(rule.check(state, colorsMap));
  }

  if (rule.when && !matchConditionMap(rule.when, state, colorsMap)) {
    return false;
  }

  if (rule.whenNot && matchConditionMap(rule.whenNot, state, colorsMap)) {
    return false;
  }

  if (Array.isArray(rule.anyOf) && rule.anyOf.length > 0) {
    const anyMatched = rule.anyOf.some((subCond) =>
      matchConditionMap(subCond, state, colorsMap)
    );
    if (!anyMatched) return false;
  }

  return true;
}

/**
 * Kiểm định toàn bộ kho luật so với danh mục dữ liệu chuẩn.
 * Trả về mảng lỗi rỗng [] nếu hợp lệ 100%.
 */
export function validateRules(rules = [], catalog = {}) {
  const errors = [];
  const seenIds = new Set();

  const validSets = {
    eventId: new Set((catalog.events || []).map((x) => x.id)),
    garmentId: new Set((catalog.garments || []).map((x) => x.id)),
    outerColorId: new Set((catalog.colors || []).map((x) => x.id)),
    bottomColorId: new Set((catalog.colors || []).map((x) => x.id)),
    beltColorId: new Set((catalog.colors || []).map((x) => x.id)),
    headAccessoryId: new Set((catalog.head || []).map((x) => x.id)),
    handAccessoryId: new Set((catalog.hand || []).map((x) => x.id)),
    footAccessoryId: new Set((catalog.foot || []).map((x) => x.id)),
    bottomLength: new Set(['long', 'short']),
    gender: new Set(['male', 'female']),
    outerElement: new Set(['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ']),
    bottomElement: new Set(['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ']),
    beltElement: new Set(['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'])
  };

  const checkCondIds = (ruleId, condMap, location) => {
    if (!condMap || typeof condMap !== 'object') return;
    for (const [field, vals] of Object.entries(condMap)) {
      const allowed = validSets[field];
      if (!allowed) {
        errors.push(`[${ruleId}] Trường điều kiện không hợp lệ "${field}" tại ${location}`);
        continue;
      }
      const list = Array.isArray(vals) ? vals : [vals];
      for (const v of list) {
        if (!allowed.has(v)) {
          errors.push(`[${ruleId}] ID không tồn tại "${v}" cho trường "${field}" tại ${location}`);
        }
      }
    }
  };

  for (const rule of rules) {
    if (!rule.id || typeof rule.id !== 'string') {
      errors.push('Có luật thiếu id hợp lệ');
      continue;
    }
    if (seenIds.has(rule.id)) {
      errors.push(`[${rule.id}] Trùng lặp ID luật`);
    }
    seenIds.add(rule.id);

    if (!VALID_RULE_LEVELS.includes(rule.level)) {
      errors.push(`[${rule.id}] level không hợp lệ: ${rule.level}`);
    }
    if (!VALID_RULE_CATEGORIES.includes(rule.category)) {
      errors.push(`[${rule.id}] category không hợp lệ: ${rule.category}`);
    }
    if (!rule.source || typeof rule.source !== 'string') {
      errors.push(`[${rule.id}] Thiếu trường source`);
    }
    if (!rule.title || !rule.message) {
      errors.push(`[${rule.id}] Thiếu title hoặc message`);
    }

    checkCondIds(rule.id, rule.when, 'when');
    checkCondIds(rule.id, rule.whenNot, 'whenNot');
    if (Array.isArray(rule.anyOf)) {
      rule.anyOf.forEach((sub, idx) => checkCondIds(rule.id, sub, `anyOf[${idx}]`));
    }
    if (rule.autoFix) {
      checkCondIds(rule.id, rule.autoFix, 'autoFix');
    }
  }

  return errors;
}

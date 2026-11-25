// Tổng hợp toàn bộ kho luật Culture Guard khai báo (≥ 200 luật)
import { TON_NGHIEM_RULES } from './rules/tonNghiemRules.js';
import { VUNG_MIEN_RULES } from './rules/vungMienRules.js';
import { MAU_SAC_RULES } from './rules/mauSacRules.js';
import { PHOM_DANG_RULES } from './rules/phomDangRules.js';
import { PHU_KIEN_RULES } from './rules/phuKienRules.js';
import { NGU_HANH_RULES } from './rules/nguHanhRules.js';
import { DONG_BO_GIA_DINH_RULES } from './rules/dongBoGiaDinhRules.js';
import { KHEN_NGOI_RULES } from './rules/khenNgoiRules.js';
import { buildGeneratedMatrixRules } from './rules/generatedMatrixRules.js';

const GENERATED_RULES = buildGeneratedMatrixRules();

export const CULTURE_RULES = [
  ...TON_NGHIEM_RULES,
  ...VUNG_MIEN_RULES,
  ...MAU_SAC_RULES,
  ...PHOM_DANG_RULES,
  ...PHU_KIEN_RULES,
  ...NGU_HANH_RULES,
  ...DONG_BO_GIA_DINH_RULES,
  ...KHEN_NGOI_RULES,
  ...GENERATED_RULES
];

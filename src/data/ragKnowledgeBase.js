// Kho tri thức Structured RAG đã kiểm duyệt (tuyệt đối loại trừ các mục 'CẦN THẨM ĐỊNH')
import { GARMENTS_DATA } from './garmentsData.js';
import { CULTURE_RULES } from './cultureRules.js';
import { EVENTS_DATA } from './eventsData.js';

export function buildVerifiedKnowledgeBase() {
  const docs = [];

  // 1. Tư liệu 7 dòng cổ phục từ garmentsData.js
  for (const g of GARMENTS_DATA) {
    docs.push({
      id: `garment-${g.id}`,
      garmentId: g.id,
      title: g.cultureCard?.title || g.name,
      content: `${g.name} (${g.era}, ${g.region}). Phom dáng: ${g.silhouette}. Triết lý: ${g.philosophy}. Lịch sử: ${g.cultureCard?.history || ''}. Cấu tạo: ${g.cultureCard?.structure || ''}. Cách tân: ${g.cultureCard?.modernRemix || ''}`,
      source: `Hồ sơ di sản ${g.name} (Ngàn năm áo mũ & Bảo tàng Lịch sử Quốc gia)`
    });
  }

  // 2. Các luật Culture Guard đã có nguồn xác thực (bỏ qua 'CẦN THẨM ĐỊNH')
  for (const rule of CULTURE_RULES) {
    if (!rule.source || rule.source === 'CẦN THẨM ĐỊNH') continue;
    docs.push({
      id: `rule-${rule.id}`,
      garmentId: rule.when?.garmentId?.[0] || null,
      eventId: rule.when?.eventId?.[0] || null,
      title: rule.title,
      content: `${rule.message} ${rule.quote || ''} Gợi ý: ${rule.suggestion || ''}`.trim(),
      source: rule.source
    });
  }

  // 3. Quy tắc lễ nghi bối cảnh từ EVENTS_DATA
  for (const ev of EVENTS_DATA) {
    docs.push({
      id: `event-${ev.id}`,
      eventId: ev.id,
      title: `Nghi thức sự kiện: ${ev.name}`,
      content: `${ev.etiquette} Gợi ý trang phục: ${(ev.recommendedGarments || []).join(', ')}.`,
      source: 'Quy chuẩn bối cảnh văn hóa Việt Phục Remix'
    });
  }

  // 4. Tư liệu chuyên đề phân biệt Việt phục
  docs.push({
    id: 'topic-compare-hanfu',
    garmentId: 'ngu-than',
    title: 'Phân biệt Áo Ngũ Thân Việt Nam và Sườn Xám / Hán Phục',
    content:
      'Áo Ngũ Thân Việt Nam xuất phát từ sắc dụ 1744 của Võ Vương Nguyễn Phúc Khoát và chuẩn hóa triều Minh Mạng 1827, gồm 5 thân vải, cổ đứng lập lĩnh cài 5 khuy sang nách phải, thân áo buông suông xẻ tà hai bên hông mặc cùng quần lụa ống rộng. Khác hoàn toàn với Sườn Xám (xẻ đùi ôm sát) hay Hán Phục cổ chéo giao lĩnh nhiều lớp.',
    source: 'Ngàn năm áo mũ – Trần Quang Đức & Sắc dụ 1744'
  });

  docs.push({
    id: 'topic-ngu-hanh-color',
    title: 'Nguyên lý Ngũ Hành Ngũ Sắc trong phối màu Việt phục',
    content:
      'Ngũ hành gồm Kim (Trắng), Mộc (Xanh lục), Thủy (Lam/Đen), Hỏa (Đỏ/Tím/Hồng), Thổ (Vàng/Nâu). Tương sinh theo vòng tròn: Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, Thủy sinh Mộc. Khi áo và quần xung khắc (ví dụ Thủy khắc Hỏa), có thể dùng thắt lưng màu trung gian (hành Mộc) để hóa giải.',
    source: 'Triết lý Ngũ Sắc phương Đông & Harmony Score Engine'
  });

  return docs;
}

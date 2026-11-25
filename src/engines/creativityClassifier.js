// Phân loại 3 cấp độ sáng tạo dựa trên kết quả Culture Guard & tính chất cổ truyền của phụ kiện

export const CREATIVITY_LEVELS = {
  'truyen-thong': {
    id: 'truyen-thong',
    label: 'Truyền thống chuẩn mực',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    description: 'Giữ trọn phom dáng, sắc màu và phụ kiện cổ truyền chuẩn mực.'
  },
  'cach-tan': {
    id: 'cach-tan',
    label: 'Cách tân tôn trọng bản sắc',
    badgeClass: 'bg-sky-100 text-sky-900 border-sky-300',
    description: 'Kết hợp hài hòa nếp áo di sản với phụ kiện hiện đại hoặc phá cách có chừng mực.'
  },
  'sang-tao-tu-do': {
    id: 'sang-tao-tu-do',
    label: 'Sáng tạo tự do',
    badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
    description: 'Thử nghiệm phá bỏ quy phạm truyền thống — cần lưu ý bối cảnh sử dụng.'
  }
};

export function classifyCreativity(state, cultureResult, accessoriesMap = {}) {
  if (cultureResult?.status === 'red') {
    return CREATIVITY_LEVELS['sang-tao-tu-do'];
  }

  const headAcc = accessoriesMap.head?.[state.headAccessoryId || state.headId];
  const handAcc = accessoriesMap.hand?.[state.handAccessoryId || state.handId];
  const footAcc = accessoriesMap.foot?.[state.footAccessoryId || state.footId];

  const hasModernAccessory = Boolean(
    headAcc?.modern || handAcc?.modern || footAcc?.modern
  );

  if (hasModernAccessory || cultureResult?.status === 'yellow') {
    return CREATIVITY_LEVELS['cach-tan'];
  }

  return CREATIVITY_LEVELS['truyen-thong'];
}

// Tính gợi ý size Việt Phục (S/M/L/XL) theo chiều cao–cân nặng và ước tính giá sau giảm 10%

export function suggestGarmentSize(heightCm, weightKg) {
  const h = Number(heightCm);
  const w = Number(weightKg);
  if (!h || !w || h < 120 || h > 220 || w < 30 || w > 150) {
    return null;
  }

  if (h < 158 && w < 52) {
    return { size: 'S', note: 'Phom gọn gàng, phù hợp tà áo thanh mảnh.' };
  }
  if (h < 168 && w < 62) {
    return { size: 'M', note: 'Cỡ tiêu chuẩn phổ biến nhất cho cả Ngũ Thân & Nhật Bình.' };
  }
  if (h < 176 && w < 74) {
    return { size: 'L', note: 'Rộng vai thoải mái, rủ tà đẹp khi cử động.' };
  }
  return { size: 'XL', note: 'Phom đại lễ rộng thoáng, nên ghi chú số đo vòng ngực nếu may đo.' };
}

function formatVndShort(amount) {
  if (amount >= 1000000) {
    const m = amount / 1000000;
    return `${Number.isInteger(m) ? m : m.toFixed(2).replace(/\.?0+$/, '')}tr`;
  }
  return `${Math.round(amount / 1000)}k`;
}

// Chuyển đổi chuỗi giá kiểu "350.000đ - 600.000đ / ngày" hoặc "2.500.000đ" sang ước tính sau chiết khấu
export function estimateDiscountedPrice(priceText, discountPercent = 10) {
  if (!priceText || typeof priceText !== 'string') return '';
  const matches = priceText.match(/\d{1,3}(?:[.,]\d{3})+/g);
  if (!matches || matches.length === 0) return '';

  const factor = (100 - discountPercent) / 100;
  const values = matches
    .map((m) => Number(m.replace(/[.,]/g, '')))
    .filter((n) => Number.isFinite(n) && n > 0)
    .map((n) => Math.round((n * factor) / 1000) * 1000);

  if (values.length === 0) return '';
  if (values.length === 1) return `~${formatVndShort(values[0])}`;
  return `~${formatVndShort(values[0])} – ${formatVndShort(values[1])}`;
}

// Cấu hình các gói trả phí (Freemium + Credit + B2B) & VietQR chuẩn NAPAS

export const PRICING_PLANS = [
  {
    id: 'pro-single',
    name: 'Gói Cá Nhân (Pro)',
    badge: 'Phổ biến nhất',
    priceVnd: 29000,
    priceLabel: '29.000đ',
    periodLabel: 'mua 1 lần',
    credits: 10,
    removeWatermark: true,
    partnerDiscountPercent: 10,
    highlight: true,
    features: [
      '+10 lượt AI Thử Ảnh thật (OpenAI / Colab GPU)',
      'Xuất Lookbook HD 600×800 không watermark',
      'Lưu trữ tủ đồ & mã đặt thuê không giới hạn',
      'Giữ trọn mã ưu đãi 10% tại tiệm đối tác'
    ]
  },
  {
    id: 'pro-family',
    name: 'Gói Gia Đình & Sự Kiện',
    badge: 'Tiết kiệm 25%',
    priceVnd: 79000,
    priceLabel: '79.000đ',
    periodLabel: 'mua 1 lần',
    credits: 35,
    removeWatermark: true,
    partnerDiscountPercent: 15,
    highlight: false,
    features: [
      '+35 lượt AI Thử Ảnh cho cả gia đình 2–4 người',
      'Xuất Family Lookbook 900×800 không watermark',
      'Nâng cấp mã ưu đãi đối tác từ 10% lên 15%',
      'Ưu tiên hàng đợi xử lý AI giờ cao điểm'
    ]
  },
  {
    id: 'studio-b2b',
    name: 'Gói Tiệm Thuê / Studio (B2B)',
    badge: 'Dành cho đối tác',
    priceVnd: 499000,
    priceLabel: '499.000đ',
    periodLabel: '/ tháng',
    credits: 250,
    removeWatermark: true,
    partnerDiscountPercent: 15,
    isB2B: true,
    highlight: false,
    features: [
      '250 lượt thử đồ AI tại quầy mỗi tháng',
      'Gắn huy hiệu Đối tác Ưu tiên trong danh sách tiệm',
      'Tùy biến logo thương hiệu tiệm trên Lookbook',
      'Nhận đơn đặt thuê & link phối đồ trực tiếp từ khách'
    ]
  }
];

export function generatePaymentCode(date = new Date()) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VPRPAY${mm}${dd}${rand}`;
}

export function buildVietQrUrl({
  bankId = 'MB',
  accountNo = '0987654321',
  accountName = 'VIET PHUC REMIX DEMO',
  amount = 29000,
  addInfo = 'VPRPAY'
}) {
  const safeBank = encodeURIComponent(bankId || 'MB');
  const safeAcc = encodeURIComponent(accountNo || '0987654321');
  const params = new URLSearchParams({
    amount: String(Math.max(0, Number(amount) || 0)),
    addInfo: String(addInfo || 'VPRPAY').slice(0, 50),
    accountName: String(accountName || 'VIET PHUC REMIX')
  });
  return `https://img.vietqr.io/image/${safeBank}-${safeAcc}-compact2.png?${params.toString()}`;
}

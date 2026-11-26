import React, { useState } from 'react';
import { X, Crown, Check, QrCode, Copy, Sparkles, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRICING_PLANS, generatePaymentCode, buildVietQrUrl } from '../data/pricingData';

const BANK_ID = import.meta.env.VITE_VIETQR_BANK_ID || 'MB';
const ACCOUNT_NO = import.meta.env.VITE_VIETQR_ACCOUNT_NO || '0987654321';
const ACCOUNT_NAME = import.meta.env.VITE_VIETQR_ACCOUNT_NAME || 'VIET PHUC REMIX DEMO';

export function PricingModal({ isOpen, onClose, entitlements, onPurchaseDemo }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [orderCode, setOrderCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [justPaidOrder, setJustPaidOrder] = useState(null);

  if (!isOpen) return null;

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setOrderCode(generatePaymentCode());
    setJustPaidOrder(null);
  };

  const handleSimulatePayment = () => {
    if (!selectedPlan) return;
    const code = onPurchaseDemo(selectedPlan, orderCode);
    setJustPaidOrder({ code, plan: selectedPlan });
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#8B1A1A', '#C9A227', '#1F6F5C', '#F9D423']
    });
  };

  const handleCopyTransferNote = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(orderCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const qrUrl = selectedPlan
    ? buildVietQrUrl({
        bankId: BANK_ID,
        accountNo: ACCOUNT_NO,
        accountName: ACCOUNT_NAME,
        amount: selectedPlan.priceVnd,
        addInfo: orderCode
      })
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-surface-subtle rounded-3xl border-2 border-[#C9A227] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B1A1A] via-[#6B1212] to-[#1D2440] text-white p-5 flex items-center justify-between border-b-2 border-[#C9A227]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A227]/20 border border-[#F9D423] flex items-center justify-center">
              <Crown className="w-5 h-5 text-[#F9D423]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F9D423] block">
                Mô hình Freemium &amp; Credit • Thanh toán VietQR (Sandbox Demo)
              </span>
              <h3 className="font-bold text-lg sm:text-xl text-white">
                Nâng Cấp Việt Phục Remix Pro
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedPlan(null);
              setJustPaidOrder(null);
              onClose();
            }}
            aria-label="Đóng bảng giá"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Summary Strip */}
        <div className="bg-[#FAF3DD] px-5 py-2.5 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2 text-xs text-[#664422]">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              Trạng thái hiện tại:{' '}
              <strong className="text-[#8B1A1A]">
                {entitlements.isPro ? 'Thành viên PRO' : 'Gói Miễn Phí'}
              </strong>
            </span>
            <span>•</span>
            <span>
              Số dư AI Thử Ảnh: <strong className="text-[#1D2440]">{entitlements.credits} lượt</strong>
            </span>
            <span>•</span>
            <span>
              Lookbook:{' '}
              <strong className={entitlements.removeWatermark ? 'text-emerald-700' : 'text-[#574C43]'}>
                {entitlements.removeWatermark ? 'Không Watermark' : 'Có Watermark'}
              </strong>
            </span>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#C9A227] text-[#8B1A1A]">
            Ưu đãi đối tác: -{entitlements.partnerDiscountPercent}%
          </span>
        </div>

        <div className="p-5 overflow-y-auto space-y-5">
          {justPaidOrder ? (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-6 text-center space-y-3 max-w-lg mx-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-lg text-emerald-950">Kích hoạt gói thành công!</h4>
              <p className="text-xs text-emerald-900">
                Mã giao dịch: <strong className="font-mono bg-white px-2 py-0.5 rounded border">{justPaidOrder.code}</strong>
              </p>
              <p className="text-xs text-[#2C241D]">
                Đã cộng <strong>+{justPaidOrder.plan.credits} lượt AI Thử Ảnh</strong>, mở khóa{' '}
                <strong>Lookbook HD không watermark</strong> và ưu đãi đối tác{' '}
                <strong>-{justPaidOrder.plan.partnerDiscountPercent}%</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedPlan(null);
                  setJustPaidOrder(null);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#1D2440] text-white text-xs font-bold shadow"
              >
                Quay lại Studio trải nghiệm ngay
              </button>
            </div>
          ) : selectedPlan ? (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-border-warm p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlan(null)}
                  className="flex items-center gap-1 font-bold text-[#664422] hover:text-[#8B1A1A]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Chọn gói khác</span>
                </button>
                <span className="font-bold text-[#8B1A1A] text-sm">
                  {selectedPlan.name} — {selectedPlan.priceLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div className="bg-surface-subtle rounded-2xl p-4 border border-border-warm text-center space-y-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1D2440]">
                    <QrCode className="w-3.5 h-3.5 text-[#8B1A1A]" />
                    <span>Mã VietQR NAPAS 24/7</span>
                  </span>
                  <img
                    src={qrUrl}
                    alt={`Mã VietQR thanh toán ${selectedPlan.name}`}
                    className="w-52 h-auto mx-auto rounded-xl border border-border-warm bg-white p-1"
                  />
                  <p className="text-[11px] text-[#574C43]">
                    Ngân hàng <strong>{BANK_ID}</strong> • STK: <strong>{ACCOUNT_NO}</strong>
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#FAF3DD] rounded-xl p-3 border border-border-subtle space-y-1.5">
                    <p className="text-[11px] font-bold uppercase text-[#8B1A1A]">
                      Thông tin chuyển khoản
                    </p>
                    <p>
                      Số tiền: <strong className="text-sm text-[#1D2440]">{selectedPlan.priceLabel}</strong>
                    </p>
                    <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-border-warm">
                      <span className="font-mono font-bold text-[#8B1A1A]">{orderCode}</span>
                      <button
                        type="button"
                        onClick={handleCopyTransferNote}
                        className="flex items-center gap-1 text-[11px] font-bold text-[#1D2440] hover:text-[#8B1A1A]"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedCode ? 'Đã chép' : 'Chép mã'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-[11px] text-blue-950 space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                      <span>Chế độ Demo Ban Giám Khảo (Sandbox)</span>
                    </p>
                    <p>
                      Bản thương mại tự động đối soát qua Webhook SePay/PayOS trong 5 giây. Khi chấm thi, bấm nút bên dưới để giả lập thanh toán thành công mà không cần chuyển tiền thật.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    className="w-full min-h-[42px] py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#1F6F5C] to-[#1D2440] hover:brightness-110 transition flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-[#F9D423]" />
                    <span>Giả lập đã thanh toán (Demo BGK)</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PRICING_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-2xl p-4 flex flex-col justify-between space-y-4 border-2 transition ${
                      plan.highlight
                        ? 'bg-white border-[#8B1A1A] shadow-lg'
                        : 'bg-white border-border-warm shadow-xs'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            plan.highlight
                              ? 'bg-[#8B1A1A] text-white'
                              : 'bg-[#FAF3DD] text-[#664422] border border-[#E2D2B5]'
                          }`}
                        >
                          {plan.badge}
                        </span>
                        <span className="text-[11px] font-bold text-[#1F6F5C]">
                          +{plan.credits} lượt AI
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-base text-[#1D2440]">{plan.name}</h4>
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-2xl font-black text-[#8B1A1A]">{plan.priceLabel}</span>
                          <span className="text-[11px] text-[#574C43]">{plan.periodLabel}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 text-xs text-[#2C241D]">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-4 h-4 text-[#1F6F5C] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full min-h-[40px] py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
                        plan.highlight
                          ? 'bg-gradient-to-r from-[#8B1A1A] to-[#A62626] text-white hover:brightness-110'
                          : 'bg-[#1D2440] text-white hover:bg-[#2A345B]'
                      }`}
                    >
                      Chọn gói &amp; Mở mã VietQR
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-3.5 border border-border-warm text-xs text-[#574C43] flex flex-wrap items-center justify-between gap-2">
                <span>
                  <strong>Cam kết miễn phí 100%:</strong> Phối đồ 2D, 210 luật Culture Guard, Harmony Score, Bảo tàng 2.5D/3D, AI Stylist &amp; Chatbot RAG luôn miễn phí cho cộng đồng.
                </span>
                {entitlements.orders.length > 0 && (
                  <span className="text-[11px] font-bold text-[#1F6F5C]">
                    Lịch sử: {entitlements.orders.length} giao dịch đã kích hoạt
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

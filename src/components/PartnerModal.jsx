import React, { useState } from 'react';
import { X, Store, MapPin, Star, Phone, Tag, Check, ExternalLink } from 'lucide-react';
import { PARTNERS_DATA } from '../data/partnersData';

export function PartnerModal({ isOpen, onClose, selectedGarment }) {
  const [copiedId, setCopiedId] = useState(null);

  if (!isOpen) return null;

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl border-2 border-[#1F6F5C] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#1F6F5C] via-[#165B66] to-[#1D2440] text-white p-5 flex items-center justify-between border-b-2 border-[#C9A227]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-white">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F9D423] block">
                Mạng Lưới Đối Tác Khởi Nghiệp (B2B Marketplace)
              </span>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                Tiệm Thuê & Xưởng May Đo Cổ Phục Liên Kết
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-[#FAF3DD] px-5 py-3 border-b border-[#E8DFC8] flex items-center justify-between text-xs text-[#664422]">
          <span>
            💡 Đặt qua <strong>Việt Phục Remix</strong> để nhận chiết khấu độc quyền <strong>10%</strong> từ đối tác và tích lũy điểm bảo trợ di sản!
          </span>
          <span className="font-bold text-[#8B1A1A] hidden sm:inline">Hoa hồng B2B: 10% / đơn</span>
        </div>

        {/* Partner Cards Grid */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PARTNERS_DATA.map(partner => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl p-4 border border-[#DECDB8] shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF7F2] text-[#8C5E3B] border border-[#DECDB8]">
                        {partner.city}
                      </span>
                      <h4 className="font-bold text-base text-[#1D2440] mt-1">
                        {partner.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{partner.rating}</span>
                      <span className="text-[10px] text-gray-400 font-normal">({partner.reviewsCount})</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mt-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{partner.address}</span>
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-gray-100 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Giá thuê tham khảo:</span>
                      <span className="font-bold text-[#8B1A1A]">{partner.rentalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">May đo cao cấp:</span>
                      <span className="font-semibold text-gray-800">{partner.tailoringPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Voucher Code & Action */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#DECDB8] text-xs font-mono font-bold text-[#8B1A1A]">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{partner.voucherCode}</span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(partner.id, partner.voucherCode)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1F6F5C] hover:bg-[#165B66] text-white transition shadow-sm"
                  >
                    {copiedId === partner.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã lưu mã!</span>
                      </>
                    ) : (
                      <>
                        <span>Sao chép mã</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF3DD] p-4 border-t border-[#DECDB8] flex items-center justify-between text-xs text-gray-600">
          <span>Hệ thống đối tác mở rộng liên tục phục vụ sinh viên và gia đình toàn quốc.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { X, Store, MapPin, Star, Tag, Check, CalendarCheck } from 'lucide-react';
import { PARTNERS_DATA } from '../data/partnersData';
import { BookingForm } from './BookingForm';

export function PartnerModal({ isOpen, onClose, selectedGarment, shareUrl, onBooked }) {
  const [copiedId, setCopiedId] = useState(null);
  const [bookingPartner, setBookingPartner] = useState(null);

  if (!isOpen) return null;

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl border-2 border-[#1F6F5C] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-r from-[#1F6F5C] via-[#165B66] to-[#1D2440] text-white p-5 flex items-center justify-between border-b-2 border-[#C9A227]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-white">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F9D423] block">
                Mạng Lưới Đối Tác Khởi Nghiệp (B2B2C Marketplace)
              </span>
              <h3 className="font-bold text-lg sm:text-xl text-white">
                Tiệm Thuê &amp; Xưởng May Đo Cổ Phục Liên Kết
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              setBookingPartner(null);
              onClose();
            }}
            aria-label="Đóng danh sách đối tác"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#FAF3DD] px-5 py-3 border-b border-[#E8DFC8] flex flex-wrap items-center justify-between gap-2 text-xs text-[#664422]">
          <span>
            💡 Đặt qua <strong>Việt Phục Remix</strong> để nhận chiết khấu <strong>10%</strong> từ đối tác (dữ liệu đối tác minh họa luồng B2B2C).
          </span>
          <span className="font-bold text-[#8B1A1A]">Hoa hồng dự kiến: 10% / đơn</span>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          {bookingPartner ? (
            <BookingForm
              partner={bookingPartner}
              selectedGarment={selectedGarment}
              shareUrl={shareUrl}
              onBack={() => setBookingPartner(null)}
              onBooked={onBooked}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PARTNERS_DATA.map((partner) => {
                const matchesSelected =
                  selectedGarment?.id && partner.supportedGarments?.includes(selectedGarment.id);

                return (
                  <div
                    key={partner.id}
                    className={`bg-white rounded-2xl p-4 border shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3 ${
                      matchesSelected ? 'border-[#1F6F5C] ring-1 ring-[#1F6F5C]/30' : 'border-[#DECDB8]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF7F2] text-[#8C5E3B] border border-[#DECDB8]">
                              {partner.city}
                            </span>
                            {matchesSelected && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                Có sẵn {selectedGarment.name.split(' ')[1]}
                              </span>
                            )}
                            {partner.isDemoPartner && (
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                                Minh họa B2B2C
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-base text-[#1D2440] mt-1">{partner.name}</h4>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{partner.rating}</span>
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

                    <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyCode(partner.id, partner.voucherCode)}
                        className="flex items-center gap-1 bg-[#FAF7F2] px-2.5 py-1.5 rounded-lg border border-[#DECDB8] text-[11px] font-mono font-bold text-[#8B1A1A]"
                        title="Sao chép mã giảm giá"
                      >
                        {copiedId === partner.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Tag className="w-3.5 h-3.5" />}
                        <span>{copiedId === partner.id ? 'Đã chép mã!' : partner.voucherCode}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBookingPartner(partner)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1F6F5C] hover:bg-[#165B66] text-white transition shadow-sm"
                      >
                        <CalendarCheck className="w-3.5 h-3.5" />
                        <span>Đặt lịch ngay</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

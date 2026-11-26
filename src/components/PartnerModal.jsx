import React, { useState } from 'react';
import { X, Store, MapPin, Star, Tag, Check, CalendarCheck, History, Trash2, ExternalLink } from 'lucide-react';
import { PARTNERS_DATA } from '../data/partnersData';
import { BookingForm } from './BookingForm';
import { getLocalBookingHistory, removeLocalBooking } from '../services/bookingService';

export function PartnerModal({ isOpen, onClose, selectedGarment, shareUrl, onBooked, discountPercent = 10 }) {
  const [copiedId, setCopiedId] = useState(null);
  const [bookingPartner, setBookingPartner] = useState(null);
  const [activeTab, setActiveTab] = useState('partners'); // 'partners' | 'history'
  const [historyList, setHistoryList] = useState(() => getLocalBookingHistory());

  if (!isOpen) return null;

  const refreshHistory = () => setHistoryList(getLocalBookingHistory());

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-surface-subtle rounded-3xl border-2 border-[#1F6F5C] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
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

        <div className="bg-[#FAF3DD] px-5 py-3 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2 text-xs text-[#664422]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setBookingPartner(null);
                setActiveTab('partners');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeTab === 'partners'
                  ? 'bg-[#1F6F5C] text-white shadow-xs'
                  : 'bg-white text-[#664422] border border-border-warm hover:border-[#1F6F5C]'
              }`}
            >
              Tiệm đối tác ({PARTNERS_DATA.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setBookingPartner(null);
                refreshHistory();
                setActiveTab('history');
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition ${
                activeTab === 'history'
                  ? 'bg-[#8B1A1A] text-white shadow-xs'
                  : 'bg-white text-[#664422] border border-border-warm hover:border-[#8B1A1A]'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Đơn của tôi ({historyList.length})</span>
            </button>
          </div>
          <span className="font-bold text-[#8B1A1A]">Ưu đãi qua app: giảm {discountPercent}% / đơn</span>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          {bookingPartner ? (
            <BookingForm
              partner={bookingPartner}
              selectedGarment={selectedGarment}
              shareUrl={shareUrl}
              onBack={() => {
                setBookingPartner(null);
                refreshHistory();
              }}
              onBooked={(res) => {
                refreshHistory();
                if (onBooked) onBooked(res);
              }}
            />
          ) : activeTab === 'history' ? (
            historyList.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-border-warm space-y-2 text-xs text-[#574C43]">
                <History className="w-8 h-8 text-[#C9A227] mx-auto" />
                <p className="font-bold text-sm text-[#1D2440]">Chưa có đơn đặt thuê / may đo nào</p>
                <p>Chọn một tiệm đối tác và bấm “Đặt lịch ngay” để nhận mã đơn VPR và ưu đãi 10%.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {historyList.map((item) => (
                  <div
                    key={item.booking_code}
                    className="bg-white rounded-2xl p-4 border border-border-warm shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono font-bold text-[#8B1A1A] bg-[#FAF3DD] px-2 py-0.5 rounded border border-[#E2D2B5]">
                          {item.booking_code}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {item.service_type === 'may' ? 'Đặt may đo' : 'Thuê theo ngày'}
                        </span>
                        <span className="text-[11px] text-[#574C43]">Size {item.size}</span>
                      </div>
                      <p className="font-bold text-sm text-[#1D2440]">{item.partner_name}</p>
                      <p className="text-[11px] text-[#574C43]">
                        Khách: <strong>{item.customer_name}</strong> • Nhận đồ: <strong>{item.pickup_date}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopyCode(item.booking_code, item.booking_code)}
                        className="px-2.5 py-1.5 rounded-lg bg-surface-subtle border border-border-warm text-[11px] font-bold text-[#1D2440]"
                      >
                        {copiedId === item.booking_code ? 'Đã chép!' : 'Chép mã'}
                      </button>
                      {item.share_url && (
                        <a
                          href={item.share_url}
                          className="p-1.5 rounded-lg bg-[#1F6F5C]/10 text-[#1F6F5C] hover:bg-[#1F6F5C]/20"
                          title="Mở lại bộ phối đính kèm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setHistoryList(removeLocalBooking(item.booking_code))}
                        aria-label="Xóa đơn khỏi lịch sử máy"
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PARTNERS_DATA.map((partner) => {
                const matchesSelected =
                  selectedGarment?.id && partner.supportedGarments?.includes(selectedGarment.id);

                return (
                  <div
                    key={partner.id}
                    className={`bg-white rounded-2xl p-4 border shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3 ${
                      matchesSelected ? 'border-[#1F6F5C] ring-1 ring-[#1F6F5C]/30' : 'border-border-warm'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-surface-subtle text-[#8C5E3B] border border-border-warm">
                              {partner.city}
                            </span>
                            {matchesSelected && (
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                Có sẵn {selectedGarment.name.split(' ')[1]}
                              </span>
                            )}
                            {partner.isDemoPartner && (
                              <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
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
                        className="flex items-center gap-1 bg-surface-subtle px-2.5 py-1.5 rounded-lg border border-border-warm text-[11px] font-mono font-bold text-[#8B1A1A]"
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

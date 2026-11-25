import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { submitBooking } from '../services/bookingService';

export function BookingForm({ partner, selectedGarment, shareUrl, onBack, onBooked }) {
  const [serviceType, setServiceType] = useState('thue');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [size, setSize] = useState('M');
  const [note, setNote] = useState('');
  const [pdpConsent, setPdpConsent] = useState(false);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);
    try {
      const res = await submitBooking({
        partnerId: partner.id,
        partnerName: partner.name,
        serviceType,
        customerName,
        phone,
        pickupDate,
        size,
        note,
        shareUrl,
        garmentId: selectedGarment?.id || '',
        pdpConsent
      });

      if (!res.ok) {
        setErrors(res.errors || ['Không thể gửi đơn đặt lịch.']);
      } else {
        setReceipt(res);
        if (onBooked) onBooked(res);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
        <h4 className="font-bold text-base text-emerald-950">Đặt lịch thành công!</h4>
        <p className="text-xs text-emerald-800">
          Mã đơn của bạn:{' '}
          <strong className="font-mono text-sm bg-white px-2.5 py-1 rounded border border-emerald-300">
            {receipt.bookingCode}
          </strong>
        </p>
        <p className="text-[11px] text-gray-600">
          {receipt.storageMode === 'supabase'
            ? 'Đơn đã được ghi nhận lên hệ thống Supabase kèm link bộ phối.'
            : 'Chế độ Offline-First: đơn đã lưu cục bộ trên trình duyệt (sẵn sàng đồng bộ khi cấu hình Supabase).'}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1D2440] text-white"
        >
          Quay lại danh sách đối tác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 border border-[#DECDB8] space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 font-bold text-[#664422] hover:text-[#8B1A1A]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại</span>
        </button>
        <span className="font-bold text-[#1D2440]">{partner.name}</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setServiceType('thue')}
          className={`py-2 rounded-xl font-bold border ${
            serviceType === 'thue'
              ? 'bg-[#8B1A1A] text-white border-[#8B1A1A]'
              : 'bg-[#FAF7F2] text-gray-700 border-[#DECDB8]'
          }`}
        >
          Thuê theo ngày
        </button>
        <button
          type="button"
          onClick={() => setServiceType('may')}
          className={`py-2 rounded-xl font-bold border ${
            serviceType === 'may'
              ? 'bg-[#1D2440] text-white border-[#1D2440]'
              : 'bg-[#FAF7F2] text-gray-700 border-[#DECDB8]'
          }`}
        >
          Đặt may đo riêng
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="font-bold text-gray-700 block mb-1">Họ tên khách hàng *</label>
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nguyễn Minh Anh"
            className="w-full px-3 py-2 rounded-xl border border-[#DECDB8] bg-[#FAF7F2]"
          />
        </div>
        <div>
          <label className="font-bold text-gray-700 block mb-1">Số điện thoại (VN) *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0912345678"
            className="w-full px-3 py-2 rounded-xl border border-[#DECDB8] bg-[#FAF7F2]"
          />
        </div>
        <div>
          <label className="font-bold text-gray-700 block mb-1">Ngày nhận đồ *</label>
          <input
            type="date"
            required
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#DECDB8] bg-[#FAF7F2]"
          />
        </div>
        <div>
          <label className="font-bold text-gray-700 block mb-1">Kích cỡ dự kiến</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#DECDB8] bg-[#FAF7F2]"
          >
            <option value="S">Size S (42–48 kg)</option>
            <option value="M">Size M (49–56 kg)</option>
            <option value="L">Size L (57–65 kg)</option>
            <option value="XL">Size XL (66–75 kg)</option>
            <option value="MayDo">Đo trực tiếp tại tiệm</option>
          </select>
        </div>
      </div>

      <div>
        <label className="font-bold text-gray-700 block mb-1">Ghi chú thêm (màu sắc, phụ kiện đi kèm)</label>
        <textarea
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={`Đặt mẫu ${selectedGarment?.name || 'Việt phục'}...`}
          className="w-full px-3 py-2 rounded-xl border border-[#DECDB8] bg-[#FAF7F2]"
        />
      </div>

      <label className="flex items-start gap-2 bg-[#FAF3DD] p-2.5 rounded-xl border border-[#E8DFC8] cursor-pointer">
        <input
          type="checkbox"
          checked={pdpConsent}
          onChange={(e) => setPdpConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span className="text-[11px] text-[#664422]">
          Tôi đồng ý cho phép Việt Phục Remix và đối tác xử lý thông tin liên hệ để xác nhận lịch hẹn theo{' '}
          <strong>Nghị định 13/2023/NĐ-CP</strong> về bảo vệ dữ liệu cá nhân.
        </span>
      </label>

      {errors.length > 0 && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 space-y-1">
          {errors.map((err, i) => (
            <p key={i} className="flex items-center gap-1.5 text-[11px]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{err}</span>
            </p>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2.5 rounded-xl font-bold text-white bg-[#1F6F5C] hover:bg-[#165B66] disabled:opacity-50 flex items-center justify-center gap-1.5 transition"
      >
        <CalendarCheck className="w-4 h-4" />
        <span>{submitting ? 'Đang gửi đơn...' : 'Xác nhận Đặt lịch & Nhận mã đơn'}</span>
      </button>
    </form>
  );
}
